import { stockSocket } from "./socket";
const joinRoom = (stock_code, user_id) => {
  stockSocket.emit("joinRoom", { stock_code, user_id });
  console.log(`${stock_code}방에 ${user_id}님이 입장하셨습니다!`);
};
const getStockdata = (callback) => {
  stockSocket.on("stock_update", callback);
};
const leaveRoom = (stock_code, user_id) => {
  stockSocket.emit("leaveRoom", { stock_code, user_id });
  console.log(`${stock_code}방에서 ${user_id}님이 퇴장하셨습니다.`);
  stockSocket.off("currentStockData");
};
export default {
  joinRoom,
  getStockdata,
  leaveRoom,
};

// import { stockSocket } from "./socket";

// const requestLiveRanking = (type) => {
//   stockSocket.emit("liveRanking", type);
//   console.log("실시간 종목 랭킹을 요청했습니다.");
// };

// const onLiveRankingReceived = (callback) => {
//   stockSocket.on("liveRanking", callback);
//   console.log("실시간 종목 랭킹을 받았습니다.");
// };

// const disconnectSocket = () => {
//   // if (stockSocket) {
//   //   stockSocket.disconnect();
//   //   console.log("Stock 소켓 연결이 끊겼습니다.");
//   // }

//   // stockSocket.off("liveRanking");
//   stockSocket.disconnect();
//   console.log("Stock 소켓 연결이 끊겼습니다.");
// };

// export default {
//   requestLiveRanking,
//   onLiveRankingReceived,
//   disconnectSocket,
// };
