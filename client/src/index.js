import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, defaultDataIdFromObject  } from "apollo-cache-inmemory";
import "./styles/main.scss";
import App from "./App";

const client = new ApolloClient({
    uri: "/graphql",
    request: async operation => {
        const token = await localStorage.getItem("token");
        operation.setContext({
            headers: {
                Authorization: token ? `Bearer ${token}` : ""
            }
        });
    },
    cache: new InMemoryCache({
        dataIdFromObject: object => {
            switch (object.__typename) {
                case "Post":
                    return Math.random();
                case "User":
                    return Math.random();
                case "Comment":
                    return Math.random();
                case "CommentFeeling":
                    return Math.random();
                case "Reaction":
                    return Math.random();
                default:
                    return defaultDataIdFromObject(object); // fall back to default handling
            }
        }
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
