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
};

export const getLiveSise = async () => {
  const liveSise = await instance.get("/stock/liveSise");
  return liveSise;
};

export const getThemeRank = async () => {
  const themeRank = await instance.get("/stock/theme");
  return themeRank;
};

export const getLiveRanking = async (type) => {
  const apiKey = process.env.REACT_APP_SHINHAN_API_KEY;
  const liveRanking = await instance.get(`/stock/liveRanking/${type}`, {
    headers: {
      apiKey: apiKey,
    },
  });
  return liveRanking;
};

export const getStockDetail = async (code, name) => {
  const resp = await instance.get(`/stock/detail/${code}/${name}`);
  return resp.data;
};

export const getStockNews = async (code) => {
  const resp = await instance.get(`/stock/news/${code}`);
  return resp.data;
};

export const kospiTop5 = async () => {
  const resp = await instance.get(`/stock/kospitop5`);
  return resp.data;
}
export const kosdaqTop5 = async () => {
  const resp = await instance.get(`/stock/kosdaqtop5`);
  return resp.data;
}