import express from 'express'
import { varifytoken } from '../middleware/auth.js'
import {
    getFeedPosts,
    getUserPosts,
    likePost
} from "../controllers/post.js"


const router = express.Router()



// read api
router.get('/', varifytoken, getFeedPosts)
router.get("/:userId/posts", varifytoken, getUserPosts)

// update like 
router.patch('/:id/', varifytoken, likePost)


export default router