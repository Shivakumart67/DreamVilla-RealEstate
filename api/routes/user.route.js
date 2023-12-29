import express from 'express'
import { test, updateProfile } from '../controllers/user.controller.js';
import { verifyUser } from '../uitls/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.post('/update/:id', verifyUser, updateProfile)

export default router;