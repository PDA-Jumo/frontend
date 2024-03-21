import instance from "./base";

export const createCommunity = async (stockcode) => {
  const resp = await instance.post(`/community/create/${stockcode}`);
  return resp.data;
};
