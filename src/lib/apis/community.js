import instance from "./base";

export const getSearchRoom = async (keyword) => {
  const res = await instance.get(`community/search?stock_name=${keyword}`);
  console.log(res.data);
  return res.data;
};
