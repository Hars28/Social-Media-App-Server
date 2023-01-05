import express from 'express';
import { login } from "../controllers/auth.js"
import { refresh } from "../controllers/auth.js"
const router = express.Router()

router.post('/login', login)
router.get('/refresh', refresh)

export default router


