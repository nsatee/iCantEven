const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { populateReactions, posts } = require("./merge");

module.exports = {
    createUser: async args => {
        const existingUser = await User.findOne({
            email: args.userInput.email
        });
        try {
            if (existingUser) {
                throw new Error("User is already existed");
            }
            const hashedPassword = await bcrypt.hash(
                args.userInput.password,
                12
            );

            const user = new User({
                email: args.userInput.email,
                username: args.userInput.username,
                password: hashedPassword
            });

            const result = await user.save();

            return { ...result._doc, password: null };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({
            $or: [{ email: email }, { username: email }]
        });
        if (!user) {
            throw new Error("User is not exist");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("Password is incorrect!");
        }
        const token = await jwt.sign(
            { userId: user.id, email: user.email },
            "secreatKey",
            {
                expiresIn: "1y"
            }
        );
        return {
            userId: user.id,
            _id: user._id,
            token: token,
            email: email,
            reacted: populateReactions(user.reacted),
            createdPosts: posts(user.createdPosts)
        };
    },
    tokenLogin: async ({ token }) => {
        const decodedToken = await jwt.verify(token, "secreatKey");
        if (decodedToken) {
            const user = await User.findOne({ email: decodedToken.email });
            return {
                _id: user._id,
                createdPosts: posts(user.createdPosts),
                email: user.email,
                username: user.username,
                reacted: populateReactions(user.reacted)
            };
        }
    },
    getUser: async ({ id }) => {
        try {
            const user = await User.findById(id);
            return { ...user._doc, createdPosts: posts(user.createdPosts) };
        } catch (err) {
            throw err;
        }
    }
};
