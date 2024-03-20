import { io } from "socket.io-client";

// 서버의 포트를 통해 io를 받아온다
const communitySocket = io("http://localhost:5000/community");
const stockSocket = io("http://localhost:5000/stock");
export { communitySocket, stockSocket };
