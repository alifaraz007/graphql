const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require('./graph_ql/schema/index');
const graphqlResolver = require('./graph_ql/resolver/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${
    process.env.MONGO_USER
    }:${process.env.MONGO_PASSWORD}@alibaba-yx9i2.mongodb.net/graphql?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000);
    console.log("app is running");
  })
  .catch(error => {
    console.log(error);
  });
