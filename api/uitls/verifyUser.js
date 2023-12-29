import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) {
        return next(errorHandler(201, 'User is Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(errorHandler(200, 'Please login from your account'))
        }

        req.user = user
        next()
    })

}