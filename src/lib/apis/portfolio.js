import instance from "./base";

export const getKoreaPortfolio = async (id) => {
  const res = await instance.get(`portfolio?user_id=${id}&market_location=0`);
  console.log(res.data)
  return res.data;
};

export const getLikePortfolio = async (id) =>{
  const res = await instance.get(`portfolio/like?user_id=${id}`);
  console.log(res.data)
  return res.data;
}

