import { createFriendRequest, deleteFriendRequest } from "@/models";
import { Server, Socket } from "socket.io";
import { redisClient } from "@/helpers";

export const sendFriendRequest = (io: Server, socket: Socket) => {
  const event = "sendFriendRequest";
  const userId = (socket as Socket & { userId: string }).userId;

  return socket.on(event, async (obj: { receiverId: string }) => {
    const { receiverId } = obj;

    const friendRequest = await createFriendRequest(receiverId, userId);
    io.to(socket.id).emit("pending", friendRequest);
    const receiverSocketId = await redisClient.hGet("online_users", receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("requests", friendRequest);
    }
  });
};

export const cancelOrDeclineFriendRequest = (io: Server, socket: Socket) => {
  const event = "cancelFriendRequest";

  return socket.on(event, async (obj: { requestId: string }) => {
    const { requestId } = obj;

    const deletedRequest = await deleteFriendRequest(requestId);

    const clientSocketId = await redisClient.hGet(
      "online_users",
      deletedRequest.clientId
    );
    const userSocketId = await redisClient.hGet(
      "online_users",
      deletedRequest.userId
    );

    if (clientSocketId) {
      io.to(clientSocketId).emit("canceled-deleted", { refetch: true });
    }

    if (userSocketId) {
      io.to(userSocketId).emit("canceled-deleted", { refetch: true });
    }
  });
};

export const acceptFriendRequest = (io: Server, socket: Socket) => {
  const event = "acceptFriendRequest";
  const userId = (socket as Socket & { userId: string }).userId;
};
