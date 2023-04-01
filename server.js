import { app } from "./app.js";
import { connectDB } from "./data/database.js"

connectDB(); // connecting to the database

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });

  //nothing at all