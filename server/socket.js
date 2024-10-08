import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

export let io;

export const init = (server) => {
  io = new Server(server, {
    pingTimeout: 60000, //it will wait for the 1 min to for check any response from the client if there is nothing then it closed in 1 min to save the bandwidth.
    cors: { origin: process.env.FRONTEND_URL },
    // Testing with mobile
    // cors: { origin: "http://192.168.1.17:3000" },
  });
  return io;
};
