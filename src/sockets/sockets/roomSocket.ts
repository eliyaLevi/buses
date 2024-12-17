// import { Server, Socket } from "socket.io";
// import { getRoomByName, patchRoom } from "../../services/roomsService";
// import { handleBadRequest } from "../../../utils/ErrorHandle";

// const roomSocket = (io: Server, socket: Socket) => {
//   socket.on("joinRoom", async (roomName) => {
//     try {
//       const room = await getRoomByName(roomName);

//       if (!room) {
//         throw new Error("room not found");
//       }
//       socket.join(roomName);
//       console.log(`${socket.id} join to room ${roomName}`);

//       socket.emit("loadMessages", room.massages);

//       socket.on("sendMessageToRoom", (data) => {
//         const { roomName, message, userName } = data;

//         console.log(`Message received in room ${roomName}: ${message}`);
//         io.to(roomName).emit("receiveMessage", {
//           userName,
//           message,
//           timestamp: new Date().toISOString(),
//         });
//         patchRoom(roomName, {
//           userName,
//           message,
//           timestamp: new Date().toISOString(),
//         });
//       });
//     } catch (error) {
//       return handleBadRequest("socket", error);
//     }
//   });
// };

// export default roomSocket;
