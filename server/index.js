import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import allowCors from "./allowCors.js";
import { init } from "./socket.js";
import path from "path";

const app = express();

//for live
// const corsOptions = {
//   origin: "https://mern-memories-app-xi.vercel.app",
//   optionsSuccessStatus: 200,
// };

//for live
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://mern-memories-app-xi.vercel.app"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   next();
// });

//for local
// app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
// app.listen(5000);

dotenv.config();

// ------------------------------Deployement code---------------------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  //Here we connect our current directory of backend with build of fron-end
  app.use(express.static(path.join(__dirname1, "..", "client", "build")));

  //Here we get all the content of index.html of build folder
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname1, "..", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    console.log("API is running...");
  });
}

// ---------------------------------------------------------------------------------------------

const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.kqjiqcg.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //SOCKET CONNECTION
    const server = app.listen(PORT, () =>
      console.log("Server is now live on port:8000")
    );
    //We use current server to the websocket because we want to run http server and websocket server onto the same port(8000).
    //INITIALIZE SOCKET
    const io = init(server);

    //WHEN ANY USER CONNECT TO SOCKET
    io.on("connection", (socket) => {
      console.log("socket is connected!");

      //We want whenever user is connect it should be connect to his own personal socket.
      socket.on("setup", (userData) => {
        //Create room for the logged in user and other user that we want to chat with.
        socket.join(userData?.result?._id);
        socket.emit("connected");
      });

      //For join the room
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user join room " + room);
      });

      //For typing

      //Here we create socket for typing in which we will recieve room and inside that room we will emit typing event for all the users except one that typing now.
      socket.on("typing", (room) => socket.in(room).emit("typing"));

      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      //Send message
      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        console.log(chat.users);
        //We want to send message to the other users except sender
        chat.users.forEach((user) => {
          if (user._id === newMessageRecieved.sender._id) return;

          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
    });

    //For disconnect the socket.
    socket.off("setup", () => {
      console.log("USER DISCONNECTED!");
      socket.leave(userData?.result?._id);
    });
  })
  .catch((err) => console.log(err.message));

// mongoose.set("strictQuery", true);
