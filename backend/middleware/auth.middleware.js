let jwt = require('jsonwebtoken')

let authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        if(token.startsWith("Bearer")){
            token = token.split(" ")[1]
        }
        let payload = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload)
        req.userId = payload.id
        next()

    }
    catch (err) {
        console.log("Error ", err)
        res.status(401).send({
            message: "Verification failed"
        })
    }

}

module.exports = authMiddleware