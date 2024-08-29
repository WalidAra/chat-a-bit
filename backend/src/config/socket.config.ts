import { Server } from "socket.io";

const socketInitializer = (
  httpServer: import('http').Server
) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {

  });
};

export default socketInitializer;
