import gql from "graphql-tag";

export const getPosts = gql`
    query GetPosts($uid: ID){
        posts(uid: $uid) {
            _id
            body
            date
            createdAt
            headerTag
            creator {
                _id
                email
                username
            }
            reaction {
                _id
                liker {
                    _id
                }
                type
            }
        }
    }
`;

export const createPost = gql`
    mutation CreatePost($body: String!, $date: String!, $headerTag: String, $creator: ID!) {
        createPost(
            postInput: { body: $body, date: $date, headerTag: $headerTag, creator: $creator }
        ) {
            _id
            headerTag
            body
            date
            createdAt
            creator {
                _id
                email
                username
            }
            reaction {
                _id
                type
                isDeleted
            }
        }
    }
`;
export const addReaction = gql`
    mutation AddReaction(
        $type: Int!
        $post: ID!
        $date: String!
        $hasReacted: Boolean
        $reactionId: ID
    ) {
        addReaction(
            type: $type
            post: $post
            date: $date
            hasReacted: $hasReacted
            reactionId: $reactionId
        ) {
            _id
            type
            liker {
                _id
                email
                username
            }
            post {
                _id
            }
            isDeleted
        }
    }
`;

export const getReaction = gql`
    query GetReaction($postId: ID!) {
        reaction(postId: $postId) {
            _id
            isDeleted
            liker {
                _id
            }
        }
    }
`;
