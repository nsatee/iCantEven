const authResolver = require('./auth');
const postsResolver = require('./post');
const reactionResolver = require('./reaction');
const commentResolver = require('./comment');
const fowlowAction = require('./fowlowAction');

const rootResolver = {
    ...authResolver,
    ...postsResolver,
    ...reactionResolver,
    ...commentResolver,
    ...fowlowAction
};

module.exports = rootResolver;