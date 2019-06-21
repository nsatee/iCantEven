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

var reqTimer = setTimeout(function wakeUp() {
    request("https://my-qa.herokuapp.com/", function() {
        console.log("WAKE UP DYNO");
    });
    return (reqTimer = setTimeout(wakeUp, 1200000));
}, 1200000);

app.use(bodyParser.json(), cors());
app.use(isAuth);

app.use(
    "/graphql",
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
        query: ``
    })
);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0-rc53f.mongodb.net/ice?retryWrites=true`,
    { useNewUrlParser: true },
    console.log("DB is connected")
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("server is running");
});
