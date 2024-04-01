import instance from "./base";

export const levelUp = (bonus, user_id, level_name) => {
  const response = instance.put("/users/levelUp", {
    bonus,
    user_id,
    level_name,
  });
  return response;
};

export const getMyStockList = (user_id) => {
  const response = instance.get(`/stock/myStock/${user_id}`);
  return response;
};
