import axios from "axios";

export const letsGetUserInfo = async (userId) => {
  try {
    const response = await axios.get(`/users//${userId}`);
    const userInfo = {
      level: response.data[0].level,
      nickname: response.data[0].nickname,
      total_assets: response.data[0].total_assets,
    };
    return userInfo;
  } catch (error) {
    console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
    throw error;
  }
};
