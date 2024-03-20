import instance from "./base";

export async function login({ email, password }) {
  const response = await instance.post("/users/login", {
    email,
    password,
  });
  return response;
}

export async function signup({ email, password, nickname, profile_img }) {
  const response = await instance.post("/users/signup", {
    email,
    password,
    nickname,
    profile_img,
  });
  console.log(response);
  return response;
}

export async function logout() {
  const response = await instance.get("/users/logout");
}
