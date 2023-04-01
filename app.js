import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter  from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
})

// Using Middlewares

// app.use(express.urlencoded({ extended: true}))
app.use(express.json()); // use express.json() to parse the body of the request
app.use(cookieParser());
app.use(cors(
  {
    origin: ["process.env.FRONTEND_URL"],
    METHODS: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));

// Usinng Routes
app.use("/api/v1/users", userRouter); // use the userRouter for all the routes starting with /users
app.use("/api/v1/task", taskRouter)


app.get("/", (req, res) => {
  res.send("This is the Home Page");
});

app.use( errorMiddleware )


