import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import allowCors from "./allowCors.js";

const app = express();

//for live
// const corsOptions = {
//   origin: "https://mern-memories-agqj1kkmc-avesh-h.vercel.app",
//   optionsSuccessStatus: 200,
// };

//for live
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Origin",
    "https://mern-memories-app-9dwwg8pja-avesh-h.vercel.app/"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  next();
});

//for local
// app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
// app.listen(5000);

dotenv.config();

const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.kqjiqcg.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server is now live on port:8000"))
  )
  .catch((err) => console.log(err.message));

// mongoose.set("strictQuery", false);
