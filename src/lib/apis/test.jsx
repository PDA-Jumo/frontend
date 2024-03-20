import instance from "./base";

export async function testFinish({ user_id, type }) {
  const response = await instance.put("/users/test", {
    user_id,
    type,
  });
  return response;
}
