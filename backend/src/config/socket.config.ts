import { acceptFriendRequest, sendFriendRequest } from "@/core/events";
import { redisClient } from "@/helpers";
import { checkAuthSocket } from "@/middlewares";
import { Server, Socket } from "socket.io";

const socketInitializer = (httpServer: import("http").Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.use(checkAuthSocket);

  io.on("connection", async (socket: Socket) => {
    const userId = (socket as Socket & { userId: string }).userId;

    if (userId) {
      await redisClient.hSet("online_users", userId, socket.id);
      sendFriendRequest(io, socket);
      acceptFriendRequest(io, socket);

      socket.on("disconnect", async () => {
        await redisClient.hDel("online_users", userId);
      });
    }
  });
};

export default socketInitializer;
