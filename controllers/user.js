import User from "../models/User.js"
export const getUserdataById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // const formated = user.map(({
        //     _id,
        //     fistName,
        //     lastName,
        //     email,
        //     picturePath,
        //     friends,
        //     location,
        //     occupation,
        //     impressions,
        //     viewedProfile
        // }) => {
        //     return {
        //         _id,
        //         fistName,
        //         lastName,
        //         email,
        //         picturePath,
        //         friends,
        //         location,
        //         occupation,
        //         impressions,
        //         viewedProfile
        //     }
        // })
        res.status(200).json(user)

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}


export const getfriendsdataUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(user.friends.map((id) => {
            return User.findById(id)
        }))
        const formatedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })
        res.status(200).json(formatedFriends)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}



export const addremovefriends = async (req, res) => {
    try {
        const { id, friendsId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendsId);

        if (user.friends.includes(friend._id)) {
            user.friends.splice(user.friends.indexOf(friend._id), 1);
            friend.friends.splice(friend.friends.indexOf(user._id), 1);
        } else {
            user.friends.unshift(friend._id);
            friend.friends.unshift(user._id);
        }
        const formatedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })

        res.status(200).json(formatedFriends)
    }
    catch (e) {
        res.status(500).json({ message: e.message })

    }
}