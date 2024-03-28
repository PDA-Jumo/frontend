import { stockSocket } from "./socket";

const joinRoom = (stock_code, user_id) => {
  stockSocket.emit("joinRoom", { stock_code, user_id });
  console.log(`${stock_code}방에 ${user_id}님이 입장하셨습니다!`);
};

const currentStockPrice = (callback) => {
  stockSocket.on("currentStockData", callback);
};

const leaveRoom = (stock_code, user_id) => {
  stockSocket.emit("leaveRoom", { stock_code, user_id });
  console.log(`${stock_code}방에서 ${user_id}님이 퇴장하셨습니다.`);

  stockSocket.off("currentStockData");
};

export default {
  joinRoom,
  currentStockPrice,
  leaveRoom,
};
