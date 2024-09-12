import { createFriendRequest, createPendingRequest } from "@/models";
import { Server, Socket } from "socket.io";
import { redisClient } from "@/helpers";
import { Notification } from "@/constants";

export const sendFriendRequest = (io: Server, socket: Socket) => {
  const event = "sendFriendRequest";
  const userId = (socket as Socket & { userId: string }).userId;

  return socket.on(event, async (obj: { receiverId: string }) => {
    const { receiverId } = obj;

    const receiverSocketId = await redisClient.hGet("online_users", receiverId);

    if (receiverSocketId) {
      const pendingRequest = await createPendingRequest(userId, receiverId);
      const friendRequest = await createFriendRequest(receiverId, userId);

      io.to(receiverSocketId).emit(
        "notification",
        (): { data: object | null; type: Notification } => {
          const notification: Notification = "friendRequest";

          return {
            data: friendRequest,
            type: notification,
          };
        }
      );
    }
  });
};

export const acceptFriendRequest = (io: Server, socket: Socket) => {
  const event = "acceptFriendRequest";
  const userId = (socket as Socket & { userId: string }).userId;
};
