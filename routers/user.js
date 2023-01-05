import express from 'express'
import { varifytoken } from '../middleware/auth.js'
import {
    getUserdataById,
    getfriendsdataUserById,
    addremovefriends
} from "../controllers/user.js"

const router = express.Router()
// get  userdata by id
router.get('/:id', varifytoken, getUserdataById)
router.get('/:id/:friendsId', varifytoken, getfriendsdataUserById)

// add or remove friends
router.patch('/:id/:friendsId', varifytoken, addremovefriends)


export default router