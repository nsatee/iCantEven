import gql from "graphql-tag";

export const addComment = gql`
    mutation AddComment($post: ID!, $isDeleted: Boolean, $body: String!) {
        addComment(
            commentInput: { post: $post, isDeleted: $isDeleted, body: $body }
        ) {
            _id
            body
            post {
                _id
            }
            isDeleted
            createdAt
            creator {
                _id
                username
            }
        }
    }
`;

export const comments = gql`
    query Comments($postId: ID!) {
        comments(postId: $postId) {
            _id
            body
            createdAt
            post {
                _id
            }
            creator {
                _id
                username
            }
        }
    }
`;
