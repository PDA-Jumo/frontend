import instance from "./base";

export const getKoreaPortfolio = async (id) => {
  const res = await instance.get(`portfolio?user_id=${id}&market_location=0`);
  console.log(res.data);
  return res.data;
};

export const getLikePortfolio = async (id) => {
  const res = await instance.get(`portfolio/like?user_id=${id}`);
  console.log(res.data);
  return res.data;
};

export const checkLikeStock = async (userid, stockcode) => {
  const res = await instance.get(
    `portfolio/likecheck?stock_code=${stockcode}&user_id=${userid}`
  );
  console.log(res.data);
  return res.data;
};

export const postLikeStock = async (userid, stockcode, stockname) => {
  const res = await instance.post(`portfolio/like`, {
    user_id: userid,
    stock_code: stockcode,
    stock_name: stockname,
  });
  console.log(res.data);
  return res.data;
};

export const deleteLikeStock = async (userid, stockcode) => {
  const res = await instance.delete(`portfolio/like`, {
    data: {
      user_id: userid,
      stock_code: stockcode,
    },
  });
  console.log(res.data);
  return res.data;
};
