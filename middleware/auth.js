import jwt from "jsonwebtoken"
// import dotenv from "dotenv"
// dotenv.config()

export const varifytoken = (req, res, next) => {
    try {
        let token = req.headers['authorization']

        if (!token) return res.status(400).json({ massage: "missing token" })

        if (token.includes('Bearer ')) {
            token = token.slice(7, token.length).trimLeft()
        }
        const varifygiventoken = jwt.verify(token, process.env.JWT_SECRET,)
        req.user = varifygiventoken
        next()


    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}