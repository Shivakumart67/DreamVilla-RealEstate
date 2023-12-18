import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../uitls/error.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(200).json('User Added Successfully')
    }
    catch (error) {
        next(error)
    }

}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "Email is not Registred"))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "Password Did Not Match"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY)
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

export const googleSignIn = async (req, res, next) => {
    const { username, email, photo } = req.body
    try {
        const userCheck = await User.findOne({ email })
        if (userCheck) {
            const token = await jwt.sign({ id: userCheck._id }, process.env.JWT_SECRET_KEY)
            const { password: pass, ...rest } = userCheck._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const now = new Date(), [d, m, y] = [now.getDate(), now.getMonth() + 1, now.getFullYear().toString().slice(-2)], [h, min] = [now.getHours(), now.getMinutes()].map(n => (n < 10 ? '0' : '') + n);
            const formattedDateTime = `${d}${m}${y}${h}${min}`;
            const updatedUserName = username.split(' ').join('').toLowerCase() + formattedDateTime
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ username: updatedUserName, email, password: hashedPassword, avatar: photo })
            await newUser.save();
            const { password: pass, ...rest } = newUser._doc
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
    } catch (error) {
        next(error)
    }
}   
