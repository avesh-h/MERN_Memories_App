import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/postRoutes.js";
const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", routes);
app.listen(5000);

dotenv.config();

const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.kqjiqcg.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server is now live on port:8000"))
  )
  .catch((err) => console.log(err.message));

// mongoose.set("strictQuery", true);
