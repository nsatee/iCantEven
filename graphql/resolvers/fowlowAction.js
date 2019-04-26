const User = require("../../models/User");
const { userFormat } = require("./merge");

module.exports = {
    followAction: async ({ uid, follow }, req) => {
        if (follow) {
            try {
                const followedUser = await User.findById(uid);
                const ownUser = await User.findById(req.userId);
                console.log(ownUser);
                followedUser.follower.push(ownUser._id);
                ownUser.following.push(followedUser._id);
                await followedUser.save();
                await ownUser.save();
                return userFormat(ownUser);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                console.log(2);
                const followedUser = await User.findOneAndUpdate({_id: uid}, {
                    $pull: { follower: req.userId }
                });
                console.log(followedUser);
                const ownUser = await User.findOneAndUpdate({_id: req.userId}, {
                    $pull: { following: uid }
                });
                return userFormat(ownUser);
            } catch (err) {
                console.log(err);
            }
        }
    }
};
