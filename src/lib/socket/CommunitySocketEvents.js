import socket from "./socket";

export const connectSocket = (stock_code, user_id, nickname) => {
  console.log("**Connecting socket...**");

  socket.on("connect", () => {
    console.log("Connected.");
    socket.emit("joinRoom", {
      stockCode: stock_code,
      userId: user_id,
      nickname,
    });
    console.log("join room.", stock_code, user_id, nickname);
  });
};

export const sendMessage = (data) => {
  if (socket) {
    const { stock_code, stock_name, message, user_id, nickname } = data;
    socket.emit("sendMessage", {
      stockCode: stock_code,
      stockName: stock_name,
      userId: user_id,
      nickname,
      content: message,
    });
  }
};

export const disconnectSocket = () => {
  console.log("##Disconnecting socket...##s");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return;

  socket.on("message", (msg) => {
    console.log("New message");
    cb(msg);
  });
};
