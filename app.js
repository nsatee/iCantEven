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

if (process.env.NODE_ENV === "production") {
    // Express will serve up the production asset
    // like main.js or main.css!
    app.use(express.static("client/build"));
    // express will serve up the index.html file
    // if it doesn't reconize the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(8000, () => {
    console.log("server is running");
});
