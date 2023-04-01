 import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "API",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

