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

export const getStockDetail = async (code, name) => {
  const resp = await instance.get(`/stock/detail/${code}/${name}`);
  return resp.data;
};

export const getStockNews = async (code) => {
  const resp = await instance.get(`/stock/news/${code}`);
  return resp.data;
};

export const postBuyStock = async (
  user_id,
  stock_code,
  quantity,
  transaction_price
) => {
  console.log("여기", user_id, "005930", quantity, transaction_price);
  const resp = await instance.post(`/stock/buy`, {
    user_id,
    stock_code,
    quantity,
    transaction_price,
  });
  return resp.data;
};

export const postSellStock = async (
  user_id,
  stock_code,
  quantity,
  transaction_price
) => {
  const resp = await instance.post(`/stock/sell`, {
    user_id,
    stock_code,
    quantity,
    transaction_price,
  });
  return resp.data;
};
