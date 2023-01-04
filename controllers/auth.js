import bcrypt from "bcrypt";
import User from "../models/User.js";
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const NewUser = await User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 500),
            impressions: Math.floor(Math.random() * 500),
        })
        console.log(NewUser)
        const addedUserDetails = await NewUser.save()
        res.status(201).json(addedUserDetails)

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// return user data without hashpassword for security purposes
const removehashpass = async (user) => {
    return new Promise((res, rej) => {
        try {
            let newobj = {}
            // 👉  here user._doc is going to used this is just because on getting user from mongdb database 
            // 👉 it return so many undeccerry things but the data stored inside _doc
            for (let key in user._doc) {
                if (key !== "password") {
                    newobj[key] = user[key]
                }
            }
            // promise resolved 
            res(newobj)
        }
        catch (e) {
            rej(e)
        }

    })
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        //validate user
        const user = await User.findOne({ email })

        if (!user) return res.status(404).json({ message: "User not found" })

        // validate password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(403).json({ message: "Invalid credentials" })

        res.status(200).json(await removehashpass(user))
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }

}
