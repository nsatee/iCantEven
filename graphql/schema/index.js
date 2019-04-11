const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Post {
    _id: ID!
    body: String!
    headerTag: String
    date: String!
    creator: User!
    reaction: [Reaction]!
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
    post: Post!
    creator: User!
    isDeleted: Boolean!
    feelings: [CommentFeeling]!
    createdAt: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    createdPosts: [Post!]
    reacted: [Reaction!]
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
    posts: [Post]!
    comments(postId: ID!): [Comment]!
    login(email: String!, password: String!): AuthData!
    reaction(postId: ID!): [Reaction]!
    tokenLogin(token: String): User
    getUser(email: String!): User!
}
type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    addReaction(type: Int!, post: ID!, date: String!, hasReacted: Boolean, reactionId: ID): Reaction
    addComment(commentInput: CommentInput): Comment
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
