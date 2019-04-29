const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Post {
    _id: ID!
    body: String!
    headerTag: String
    date: String!
    creator: User!
    isDeleted: Boolean!
    commentTotal: Int!
    reaction: [Reaction]!
    comments: [Comment]!
    createdAt: String!
}

type Reaction {
    _id: ID!
    type: Int!
    post: Post!
    liker: User!
    isDeleted: Boolean!
    createdAt: String!
}

type Comment {
    _id: ID!
    post: Post!
    body: String!
    creator: User!
    isDeleted: Boolean!
    feelings: [CommentFeeling]!
    createdAt: String!
}

type CommentFeeling {
    _id: ID!
    comment: Comment!
    creator: User!
    isDeleted: Boolean!
    createdAt: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    createdPosts: [Post!]
    reacted: [Reaction!]
    following: [User!]!
    follower: [User!]!
}
type AuthData {
    userId: ID!
    token: String!
    email: String!
    createdPosts: [Post!]
    reacted: [Reaction!]

}

input PostInput {
    body: String!
    headerTag: String
    date: String!
}
input UserInput {
    email: String!
    username: String!
    password: String!
}

input CommentInput {
    post: ID!
    isDeleted: Boolean!
    body: String!
}
type RootQuery {
    posts(uid: ID): [Post]!
    post(postId: ID!): Post!
    comments(postId: ID!, first: Int, skip: Int): [Comment]!
    comment(id: ID!): Comment!
    login(email: String!, password: String!): AuthData!
    reaction(postId: ID!): [Reaction]!
    tokenLogin(token: String): User!
    getUser(id: ID!): User!
    getUsers: User!
}
type RootMutation {
    createPost(postInput: PostInput): Post!
    deletePost(postId: ID!): Post!
    createUser(userInput: UserInput): User!
    addReaction(type: Int!, post: ID!, date: String!, hasReacted: Boolean, reactionId: ID): Reaction!
    addComment(commentInput: CommentInput): Comment!
    addCommentFeeling(comment: ID!, isDeleted: Boolean!, feelingId: ID): CommentFeeling!
    followAction(uid: ID!, follow: Boolean!): User!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
