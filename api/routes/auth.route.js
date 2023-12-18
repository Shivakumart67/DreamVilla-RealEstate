import express from 'express'
import { googleSignIn, signIn, signUp } from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/signup', signUp);
route.post('/signin', signIn);
route.post('/google', googleSignIn)

export default route;