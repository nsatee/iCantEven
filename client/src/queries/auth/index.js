import gql from "graphql-tag";

export const tokenLogin = gql`
    query($token: String!) {
        tokenLogin(token: $token) {
            _id
            email
            username
            createdPosts {
                _id
            }
            reacted {
                _id
                post {
                    _id
                }
            }
        }
    }
`;

export const login = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            email
            createdPosts {
                _id
            }
            reacted {
                _id
                post {
                    _id
                }
            }
        }
    }
`;

export const createUser = gql`
    mutation CreateUser(
        $email: String!
        $password: String!
        $username: String!
    ) {
        createUser(
            userInput: {
                email: $email
                password: $password
                username: $username
            }
        ) {
            _id
            email
            username
        }
    }
`;

export const getUser = gql`
    query getUser($id: ID!) {
        getUser(id: $id) {
            _id
            username
            email
        }
    }
`;
