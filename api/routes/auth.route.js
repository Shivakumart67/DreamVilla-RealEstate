import express from 'express'
import { googleSignIn, signIn, signOut, signUp } from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/signup', signUp);
route.post('/signin', signIn);
route.get('/signout', signOut);
route.post('/google', googleSignIn)

export default route;