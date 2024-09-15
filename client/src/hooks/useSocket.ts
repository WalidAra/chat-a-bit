import { SocketContext } from "@/providers/SocketProvider";
import { useContext } from "react";

const useSocket = () => useContext(SocketContext);

export default useSocket;
