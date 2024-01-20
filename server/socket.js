import { Server } from "socket.io";

export let io;

export const init = (server) => {
  io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });
  return io;
};
