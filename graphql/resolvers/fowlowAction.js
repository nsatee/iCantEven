const User = require("../../models/User");

module.exports = {
    followAction: async ({uid, follow}) => {
        const followedUser = await User.findById(uid);
        const ownUser = await User.findById(req.uid);
    },
};
