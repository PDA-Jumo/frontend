import { communitySocket } from "./socket";

const joinRoom = (stock_code, user_id) => {
  communitySocket.emit("joinRoom", { stock_code, user_id });
  console.log(`${stock_code}방에 ${user_id}님이 입장하셨습니다!`);
};

const sendMessage = (data) => {
  communitySocket.emit("sendMessage", data);
  console.log(`${data.nickname}님이 메시지 전송 :: ${data.message}`);
};

const onMessageReceived = (callback) => {
  communitySocket.on("message", callback);
  console.log("새로운 메시지 도착!");
};

const onLoadPreviousMessages = (callback) => {
  communitySocket.on("loadPreviousMessages", callback);
  console.log("이전 대화 내용을 불러옵니다...");
};

const disconnectSocket = () => {
  if (communitySocket) communitySocket.disconnect();
};

const leaveRoom = (stock_code, user_id) => {
  communitySocket.emit("leaveRoom", { stock_code, user_id });
  console.log(`${stock_code}방에서 ${user_id}님이 퇴장하셨습니다.`);

  communitySocket.off("message");
  communitySocket.off("loadPreviousMessages");
};

export default {
  joinRoom,
  sendMessage,
  onMessageReceived,
  onLoadPreviousMessages,
  disconnectSocket,
  leaveRoom, // 추가된 부분
};
