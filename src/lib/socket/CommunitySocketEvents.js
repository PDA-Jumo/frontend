import socket from "./socket";

export const connectSocket = () => {
  console.log("**Connecting socket...**");

  socket.on("connect", () => {
    console.log("Connected.");
    socket.emit("joinRoom", "0001");
  });
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

export const sendMessage = (message) => {
  if (socket) socket.emit("sendMessage", { stockCode: "0001", message });
};
