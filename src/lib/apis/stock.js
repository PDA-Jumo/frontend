import instance from "./base";

export const getMarketIssue = async () => {
  const apiKey = process.env.REACT_APP_SHINHAN_API_KEY;
  const marketIssues = await instance.get("/stock/issue", {
    headers: {
      apiKey: apiKey,
    },
  });
  return marketIssues;
};

export const SearchKeyword = async (keyword) => {
  const resp = await instance.get(`/stock/search?stock_name=${keyword}`);
  return resp.data;
  console.log(resp.data)
};
