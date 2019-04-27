import gql from "graphql-tag";

export const followAction = gql`
    mutation FollowAction($uid: ID!, $follow: Boolean!){
        followAction(uid: $uid, follow: $follow) {
            _id
            username
            _id
            username
            follower {
                _id
                username
                password
            }
            following {
                _id
                username
                password
            }
        }
    }
`;
