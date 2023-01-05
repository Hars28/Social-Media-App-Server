import Post from "../models/Post.js"
import User from "../models/User.js"



export const createPost = async (req, res) => {
    try {
        const { userId, picturePath, description } = req.body

        const user = await User.findById(userId)

        const newPost = await Post({
            userId,
            picturePath,
            description,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()
        res.status(201).json(newPost)
    }
    catch (e) {
        res.status(409).json({ massage: e.massage })
    }
}


export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        res.status(200).json(posts)
    }
    catch (e) {
        res.status(404).json({ message: e.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const posts = await Post.find({ userId })
        res.status(200).json(posts)

    }
    catch (e) {
        res.status(404).json({ message: e.message })
    }
}


// update posts 
export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)

        const isLiked = post.likes.get(userId)

        if (isLiked) post.likes.delete(userId)
        else post.likes.set(userId, true)

        const updatePost = await Post.findByIdAndUpdate(id, {
            likes: post.likes
        }, { new: true })

        res.status(200).json(updatePost)
    }
    catch (e) {
        res.status(404).json({ message: e.message })
    }
}