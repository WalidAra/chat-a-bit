import { JwtHelper } from "@/helpers";
import { Socket } from "socket.io";

const checkAuthSocket = (socket: Socket, next: (err?: any) => void) => {
  try {
    
    const socketHeader = socket.handshake.auth.token as string;
    const token = socketHeader?.split(" ")[1];

    if (!token) {
      return next(null);
    }

    const decoded = JwtHelper.verifyToken(token);
    (socket as any).userId = decoded.id;
    next();
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Invalid token" ||
        error.message === "Token has expired")
    ) {
      return next(null);
    } else {
      return next(null);
    }
  }
};

export default checkAuthSocket;
