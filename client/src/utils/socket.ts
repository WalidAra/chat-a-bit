import { API_URL } from "@/config";
import { io, Socket } from "socket.io-client";

class SocketInstance {
  private static instance: SocketInstance;
  private socket: ReturnType<typeof io>;

  private constructor(token: string) {
    this.socket = io(API_URL, {
      auth: { token: `Bearer ${token}` },
    });
  }

  public static getInstance(token: string): Socket {
    if (!SocketInstance.instance) {
      SocketInstance.instance = new SocketInstance(token);
    }
    return SocketInstance.instance.socket;
  }
}

export default SocketInstance;
