import instance from "./base";

export async function upCash({ user_id, cash }) {
  const response = await instance.put("/users/work", {
    user_id,
    cash,
  });
  return response;
}
