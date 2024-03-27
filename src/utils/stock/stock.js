// axios
import axios from "axios";

export const getMarketIssue = async () => {
  const marketIssues = await axios.get("/stock/issue", {
    headers: {
      apiKey: process.env.REACT_APP_SHINHAN_API_KEY,
    },
  });
  console.log(marketIssues);
};

export const getLiveRanking = async (type) => {
  const rankingData = await axios.get(
    "/stock/liveRanking",
    {
      headers: {
        apiKey: process.env.REACT_APP_SHINHAN_API_KEY,
      },
    },
    {
      type: type,
    }
  );
  console.log(rankingData);
};
