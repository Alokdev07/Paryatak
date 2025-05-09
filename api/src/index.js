import app from "./app.js";
import { connectDB } from "../database/db.js";
import dotenv from 'dotenv'


dotenv.config()

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log("app is listening at : ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
