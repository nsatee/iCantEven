const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/is_auth");

const app = express();

app.use(bodyParser.json(), cors());
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
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0-rc53f.mongodb.net/ice?retryWrites=true`,
    { useNewUrlParser: true },
    console.log("DB is connected")
);

app.listen(8000, () => {
    console.log("server is running");
});
