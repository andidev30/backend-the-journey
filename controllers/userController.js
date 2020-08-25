const {
    users
} = require('../models')

exports.read = async (req, res) => {
    try {
        const {
            id
        } = req.user

        const data = await users.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            message: "response success",
            data
        })
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message
            }
        })
    }
}

exports.changeAvatar = async (req, res) => {
    try {
        const {
            id
        } = req.user
        const image = "http://localhost:5000/" + req.file.path

        const result = await users.update({
            avatar: image
        }, {
            where: {
                id
            }
        })

        if (result) {
            const data = await users.findOne({
                where: {
                    id
                },
                attributes: ['avatar']
            })

            res.status(200).send({
                message: "data has been updated",
                data: data
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