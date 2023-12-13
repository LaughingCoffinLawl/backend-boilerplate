require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.error("MongoDB connection error: ", err);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("disconnectrd", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDb connection error: ", err);
});

process.on("SIGINT", () => {
  mongoose.connection.closer(() => {
    console.log("MongoDB connection disconnected through app termination");
    process.exit(0);
  });
});

module.exports = connectToDatabase;
