import { stockSocket } from "./socket";

const joinRoom = (stock_code, user_id) => {
  stockSocket.emit("joinRoom", { stock_code, user_id });
  console.log(`${stock_code}방에 ${user_id}님이 입장하셨습니다!`);
};

const getStockdata = (callback) => {
  stockSocket.on("stock_update", callback);
};

const getStockPrice = (stock_code) => {
  stockSocket.on(`current_${stock_code}`, { stock_code });
};

const leaveRoom = (stock_code, user_id) => {
  stockSocket.emit("leaveRoom", { stock_code, user_id });
  console.log(`${stock_code}방에서 ${user_id}님이 퇴장하셨습니다.`);

  stockSocket.off("stock_update");
  stockSocket.off(`current_${stock_code}`);
};

export default {
  joinRoom,
  getStockdata,
  getStockPrice,
  leaveRoom,
};
