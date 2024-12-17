import { Server } from "socket.io";
import roomSocket from "./sockets/roomSocket";

const mainSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

    roomSocket(io, socket);

    socket.on("disConnect", () => {
      console.log(`A user disconnect ${socket.id}`);
    });
  });
};
export default mainSocket;
