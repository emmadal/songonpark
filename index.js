require("dotenv").config();
import { ApolloServer } from 'apollo-server'
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization || "";
    return { auth };
  },
  engine: {
    reportSchema: true,
    variant: "current",
  },
});

//asynchronous function that allow us to connect on our database
const dbConnect = async url => {
  try {
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true //used for Mongo Atlas instead of local database
    });
    console.log("connected to database ");
  } catch (error) {
    console.error("Database not available. Please ensure you that the mongod service is enable."
    );
  }
};

//starting our GraphQL server...
app.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    dbConnect(
      "mongodb+srv://songonpark_admin:BVDYMIsMMI7C9FjR@cluster0.murx3.mongodb.net/songonpark?retryWrites=true&w=majority"
    );
    // dbConnect(
    //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    // );
  console.log(`🚀 GraphQL server started at ${url}`);
});
