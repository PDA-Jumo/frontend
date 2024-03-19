import instance from "./base";

export const getMarketIssue = async () => {
  const marketIssues = await instance.get("/stock/issue", {
    headers: {
      apiKey: process.env.REACT_APP_SHINHAN_API_KEY,
    },
  });
  return marketIssues;
};

export const getLiveSise = async () => {
  const liveSise = await instance.get("/stock/liveSise");
  return liveSise;
};

export const getThemeRank = async () => {
  const themeRank = await instance.get("/stock/theme");
  return themeRank;
};
