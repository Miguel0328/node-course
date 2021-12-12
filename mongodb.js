// CRUD
const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to DB");
    }

    const db = client.db(databaseName);

    db.collection("users").findOne({ name: "Miguel" }, (error, user) => {
      if (error) {
        console.log("Unable to fetch");
      }

      console.log(user);
    });

    db.collection("users")
      .find({ $or: [{ age: 27 }, { name: new RegExp("Mi", "i") }] })
      .toArray((error, users) => {
        console.log(users);
      });
  }
);
