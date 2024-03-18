import instance from "./base";

export const getMarketIssue = async () => {
  const marketIssues = await instance.get("/stock/issue", {
    headers: {
      apiKey: process.env.REACT_APP_SHINHAN_API_KEY,
    },
  });
  return marketIssues;
};
