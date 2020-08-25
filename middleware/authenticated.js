const jwt = require('jsonwebtoken')

exports.cekToken = async (req, res, next) => {
    let header, token

    if (!(header = req.header("Authorization")) ||
        !(token = header.replace("Bearer ", "")))
        return res.status(400).send({
            error: {
                message: "Acess Denied"
            }
        })

    try {
        const verified = await jwt.verify(token, process.env.HASHPASSWORD)
        req.user = verified
        next()
    } catch (err) {
        return res.status(400).send({
            error: {
                message: "Invalid Token"
            }
        })
    }
}