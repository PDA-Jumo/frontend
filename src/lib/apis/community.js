import instance from "./base";
import { format } from "date-fns";

export const checkCommunity = async (stockcode) => {
  const resp = await instance.get(`/community/${stockcode}`);
  return resp.data;
};

export const createCommunity = async (stockcode, stockname) => {
  const createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  const resp = await instance.post(`/community/create/${stockcode}`, {
    user_id: 0,
    stock_name: stockname,
    content: "커뮤니티 생성",
    created_at: createdAt,
  });
  return resp.data;
};
export const getSearchRoom = async (keyword) => {
  const res = await instance.get(`community/search?stock_name=${keyword}`);
  console.log(res.data);
  return res.data;
};
