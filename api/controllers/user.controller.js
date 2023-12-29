import { errorHandler } from "../uitls/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req, res) => {
    res.json('Shiva')
}

export const updateProfile = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(400, "Your not the user please login"))
    try {

        if (req.body.password) {
            var hashedPassword = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                password: hashedPassword,
                avatar: req.body.avatar,
                email: req.body.email
            }
        }, { new: true })

        const { password: pass, ...rest } = updateUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(400, "User is no valid"))
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('User Deleted Sucessfully')
    } catch (error) {
        next(error)
    }

}