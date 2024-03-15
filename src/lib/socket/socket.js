import { io } from "socket.io-client";

// 서버의 포트를 통해 io를 받아온다
const socket = io("http://localhost:5000");

export default socket;
