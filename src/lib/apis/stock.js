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
  const resp = await instance.get(`/stock/detail/${code}`);
  return resp.data;
};

export const getStockNews = async (code) => {
  const resp = await instance.get(`/stock/news/${code}`);
  return resp.data;
};

export const getStockGraph = async (code) => {
  const resp = await instance.get(`/stock/graph/${code}`);
  return resp.data;
};

//메인에서 최근 검색 종목 가격
export const getStockPrice = async (code) => {
  const resp = await instance.get(`/stock/initial/${code}`);
  return resp.data;
};

//// 매수, 매도 주문 API
// 1. 매수 주문
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

export const getRecommend = async () => {
  const resp = await instance.get(`/stock/recommend`);
  return resp.data;
};

// 2. 매도 주문
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

// 3. 매도 가능 수량 조회
export const getSellQuantityStock = async (user_id, stock_code) => {
  const resp = await instance.get(
    `/stock/sellquantity/${user_id}/${stock_code}`
  );
  return resp.data;
};

// 4. 매수 가능 수량 조회
export const getBuyQuantityStock = async (user_id, stock_code) => {
  const resp = await instance.get(
    `/stock/buyquantity/${user_id}/${stock_code}`
  );
  return resp.data;
};

// 5. 종목 상세 페이지 초기값 조회
export const getInitialStock = async (stock_code) => {
  const resp = await instance.get(`/stock/initial/${stock_code}`);
  console.log("API", resp.data);
  return resp.data;
};

// 6. 매수 주문 바로 체결
export const postBuyStockSuccessfully = async (
  user_id,
  stock_code,
  quantity,
  transaction_price
) => {
  console.log("여기", user_id, "005930", quantity, transaction_price);
  const resp = await instance.post(`/stock/buy/successfully`, {
    user_id,
    stock_code,
    quantity,
    transaction_price,
  });
  return resp.data;
};

// 7. 매도 주문 바로 체결
export const postSellStockSuccessfully = async (
  user_id,
  stock_code,
  quantity,
  transaction_price
) => {
  const resp = await instance.post(`/stock/sell/successfully`, {
    user_id,
    stock_code,
    quantity,
    transaction_price,
  });
};
export const kospiTop5 = async () => {
  const resp = await instance.get(`/stock/kospitop5`);
  return resp.data;
};
export const kosdaqTop5 = async () => {
  const resp = await instance.get(`/stock/kosdaqtop5`);

  return resp.data;
};
