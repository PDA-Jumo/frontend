import { stockSocket } from "./socket";

const requestLiveRanking = (type) => {
  stockSocket.emit("liveRanking", type);
  console.log("실시간 종목 랭킹을 요청했습니다.");
};

const onLiveRankingReceived = (callback) => {
  stockSocket.on("liveRanking", callback);
  console.log("실시간 종목 랭킹을 받았습니다.");
};

const disconnectSocket = () => {
  // if (stockSocket) {
  //   stockSocket.disconnect();
  //   console.log("Stock 소켓 연결이 끊겼습니다.");
  // }

  // stockSocket.off("liveRanking");
  stockSocket.disconnect();
  console.log("Stock 소켓 연결이 끊겼습니다.");
};

export default {
  requestLiveRanking,
  onLiveRankingReceived,
  disconnectSocket,
};
