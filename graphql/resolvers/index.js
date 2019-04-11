const authResolver = require('./auth');
const postsResolver = require('./post');
const reactionResolver = require('./reaction');
const commentResolver = require('./comment');

const rootResolver = {
    ...authResolver,
    ...postsResolver,
    ...reactionResolver,
    ...commentResolver
};

module.exports = rootResolver;