import instance from "./base";

// export const updateRankUsers = async () => {
//   try {
//     const response = await axios.get("/users/rankUsers");
//     return response.data;
//   } catch (error) {
//     throw new Error("랭킹 정보를 불러오는 중 에러가 발생했습니다.");
//   }
// };

export const updateRankUsers = async () => {
  try {
    const response = await instance.get("/users/rankUsers");
    return response.data;
  } catch (error) {
    throw new Error("랭킹 정보를 불러오는 중 에러가 발생했습니다.");
  }
};
