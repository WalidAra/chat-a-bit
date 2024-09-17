import { createFriendRequest, createPendingRequest } from "@/models";
import { Server, Socket } from "socket.io";
import { redisClient } from "@/helpers";

export const sendFriendRequest = (io: Server, socket: Socket) => {
  const event = "sendFriendRequest";
  const userId = (socket as Socket & { userId: string }).userId;

  return socket.on(event, async (obj: { receiverId: string }) => {
    const { receiverId } = obj;

    const pendingRequest = await createPendingRequest(userId, receiverId);
    io.to(socket.id).emit("pending", pendingRequest);

    const friendRequest = await createFriendRequest(receiverId, userId);
    const receiverSocketId = await redisClient.hGet("online_users", receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("requests", friendRequest);
    }
  });
};

export const cancelOrDeclineFriendRequest = (io: Server, socket: Socket) => {
  const event = "cancelFriendRequest";
  const userId = (socket as Socket & { userId: string }).userId;

  return socket.on(event, (obj: { receiverId: string }) => {
    const { receiverId } = obj;

    // delete pending request
    // delete friend request

    if (receiverId) {
      // get user friend requests
      // emit with replace:true
    }
  });
};

export const acceptFriendRequest = (io: Server, socket: Socket) => {
  const event = "acceptFriendRequest";
  const userId = (socket as Socket & { userId: string }).userId;
};
