import { io } from "socket.io-client";
// 서버의 포트를 통해 io를 받아온다
const communitySocket = io("/community");
const stockSocket = io("/stock");
export { communitySocket, stockSocket };
