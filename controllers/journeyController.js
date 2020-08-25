const {
    journeys,
    users
} = require('../models');
const joi = require('@hapi/joi');

exports.reads = async (req, res) => {
    try {
        const data = await journeys.findAll({
            include: {
                model: users,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            order: [
                ['id', 'DESC'],
            ],
            attributes: {
                exclude: ["userId", "updatedAt"],
            }
        });

        res.status(200).send({
            message: "response success",
            data,
        });
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message,
            },
        });
    }
}

exports.read = async (req, res) => {
    try {
        const {id} = req.params
        const data = await journeys.findOne({
            include: {
                model: users,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["userId", "updatedAt"],
            },
            where: {
              id,
            }
        });

        res.status(200).send({
            message: "response success",
            data,
        });
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message,
            },
        });
    }
}

exports.readByUser = async (req, res) => {
    try {
        const {id} = req.user
        const data = await journeys.findOne({
            include: {
                model: users,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["userId", "updatedAt"],
            },
            where: {
              id,
            }
        });

        res.status(200).send({
            message: "response success",
            data,
        });
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message,
            },
        });
    }
}

// exports.postImage = (req, res) => {
//     try {
//         res.send({
//             data: req.file
//         })
//     } catch (error) {
//         res.status(500).send({
//             error: {
//                 message: "Internal server error",
//                 log: error.message
//             }
//         })
//     }
// }

exports.create = async (req, res) => {
    try {
        const {
            id
        } = req.user
        const image = "http://localhost:5000/" + req.file.path


        // res.send({
        //     data: image
        // })

        const {
            title,
            description
        } = req.body

        const result = await journeys.create({
            userId: id,
            title,
            description,
            image: image
        })

        if (result) {
            res.status(200).send({
                message: "data has created",
                data: result
            })
        }
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message
            }
        })
    }
}