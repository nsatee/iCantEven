import gql from "graphql-tag";

export const getPostsByHashtag = gql`
    query GetPostsByHashtag($hashtag: String!) {
        getPostsByHashtag(hashtag: $hashtag) {
            _id
            body
            date
            createdAt
            headerTag
            isDeleted
            commentTotal
            creator {
                _id
                username
                createdPosts {
                    _id
                }
            }
            reaction {
                _id
                liker {
                    _id
                }
                post {
                    _id
                }
                type
            }
        }
    }
`;
export const hashtagInfo = gql`
    query getHashtag($hashtag: String!){
        getHashtag(hashtag: $hashtag) {
            _id
            displayTag
            total
        }
    }
`;
