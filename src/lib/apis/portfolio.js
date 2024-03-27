import instance from "./base";

export const getKoreaPortfolio = async (id) => {
  const res = await instance.get(`portfolio?user_id=${id}&market_location=0`);
  console.log(res.data)
  return res.data;
};

/* 
export const getWorldPortfolio = async (id) => {
const res = await instance.get(`portfolio?user_id=${id}&market_location=1`);
console.log(res.data)
return res.data;
};

// 백엔드 models/queries/Portfolio/PortfolioQueries.js 에
const foreignPortfolioQueries = `SELECT *FROM MyStock Where user_id = ? AND market_location = 1`; 추가하기
(해외주식이 어떻게 될지 잘 몰라서 변동해놓지 않았음.)
*/

export const getLikePortfolio = async (id) =>{
  const res = await instance.get(`portfolio/like?user_id=${id}`);
  console.log(res.data)
  return res.data;
}

