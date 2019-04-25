const User = require("../../models/User");

module.exports = {
    followAction: async ({uid, follow}) => {
        const followedUser = await User.findById(uid);
        const ownUser = await User.findById(req.userId);

        if (follow) {
            followedUser.stalker.push(ownUser._id);
            ownUser.stalking.push(followedUser._id);
            await followedUser.save();
            await ownUser.save();
        } else {
            followedUser.stalker.push(ownUser._id);
            ownUser.stalking.push(followedUser._id);
            await followedUser.save();
            await ownUser.save();
        }
    },
};
