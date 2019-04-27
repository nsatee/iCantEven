const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { populateReactions, posts, userFormat } = require("./merge");

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
        console.log(token, user._id, user._id);
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
            return userFormat(user);
        }
    },
    getUser: async ({ id }) => {
        try {
            const user = await User.findById(id);
            return userFormat(user);
        } catch (err) {
            throw err;
        }
    },
    getUsers: async () => {
        try {
            const users = await User.find({});
            return users.map(user => {
                return userFormat(user);
            });
        } catch (err) {
            throw err;
        }
    }
};
