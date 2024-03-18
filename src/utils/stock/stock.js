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
