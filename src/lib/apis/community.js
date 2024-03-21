import instance from "./base";

export const createCommunity = async (stockcode) => {
  const resp = await instance.post(`/community/create/${stockcode}`);
  return resp.data;
};
export const getSearchRoom = async (keyword) => {
  const res = await instance.get(`community/search?stock_name=${keyword}`);
  console.log(res.data);
  return res.data;
};
