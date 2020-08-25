const {
    journeys,
    users,
    bookmark
} = require('../models');
const joi = require('@hapi/joi');

exports.create = async (req, res) => {
    try {
        const userId = req.user.id
        const journeyId = req.body.journeyId

        const schema = joi.object({
            journeyId: joi.number().integer().min(2).required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

        const data = await bookmark.create({
            userId,
            journeyId
        })

        res.status(200).send({
            message: "data has been store",
            data: {
                id: data.id,
                userId,
                journeyId
            }
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