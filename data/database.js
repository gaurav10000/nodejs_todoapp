 import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "API",
    })
    .then((c) => console.log(`Connected to MongoDB  ${c.connection.host} `)
    )
    .catch((err) => {
      console.log(err);
    });
};

