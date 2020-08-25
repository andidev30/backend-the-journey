const {
    users
} = require('../models');
const bycript = require('bcrypt')
const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');

exports.register = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
            phone,
            address
        } = req.body

        const schema = joi.object({
            fullname: joi.string().min(2).required(),
            email: joi.string().email().min(7).required(),
            password: joi.string().min(8).required(),
            phone: joi.string().min(11).required(),
            address: joi.string().min(4).required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

        const checkEmail = await users.findOne({
            where: {
                email
            }
        })

        if (checkEmail) return res.status(400).send({
            error: {
                message: "user already exist"
            }
        })

        const saltRound = 10
        const hashPassword = await bycript.hash(password, saltRound)

        const data = await users.create({
            fullname,
            email,
            password: hashPassword,
            phone,
            address,
            avatar: "default.png"
        })

        const token = jwt.sign({
            id: data.id
        }, process.env.HASHPASSWORD)

        res.status(200).send({
            message: "you have been registered",
            data: {
                email: data.email,
                token
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

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const schema = joi.object({
            email: joi.string().email().min(7).required(),
            password: joi.string().required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

        const checkEmail = await users.findOne({
            where: {
                email
            }
        })

        if (!checkEmail) return res.status(400).send({
            error: {
                message: "email and password don't match"
            }
        })

        const checkPassword = await bycript.compare(password, checkEmail.password)
        if (!checkPassword) return res.status(400).send({
            error: {
                message: "email and password don't match"
            }
        })

        const token = jwt.sign({
            id: checkEmail.id
        }, process.env.HASHPASSWORD)

        res.status(200).send({
            message: "login Success",
            data: {
                email,
                token
            }
        })
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                error
            }
        })
    }

}