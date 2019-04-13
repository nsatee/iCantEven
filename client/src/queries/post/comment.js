import gql from "graphql-tag";

export const addComment = gql`
    mutation AddComment($post: ID!, $isDeleted: Boolean!, $body: String!) {
        addComment(
            commentInput: { post: $post, isDeleted: $isDeleted, body: $body }
        ) {
            _id
            body
            post {
                _id
            }
            feelings {
                _id
                isDeleted
                creator {
                    _id
                }
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

export const getComments = gql`
    query Comments($postId: ID!) {
        comments(postId: $postId) {
            _id
            body
            post {
                _id
            }
            feelings {
                _id
                isDeleted
                comment {
                    _id
                }
                creator {
                    _id
                }
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

export const addCommentFeeling = gql`
    mutation AddCommentFeeling($comment: ID!, $isDeleted: Boolean!, $feelingId: ID) {
        addCommentFeeling(comment: $comment, isDeleted: $isDeleted, feelingId: $feelingId) {
            _id
            comment {
                _id
            }
            comment {
                _id
            }
            creator {
                _id
                username
            }
            isDeleted
            createdAt
        }
    }
`;
