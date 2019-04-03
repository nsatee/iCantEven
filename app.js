const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/is_auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(
    "/graphql",
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@ds229826.mlab.com:29826/gql`,
    { useNewUrlParser: true },
    console.log("DB is connected")
);

app.listen(8000, console.log("Server is running"));
