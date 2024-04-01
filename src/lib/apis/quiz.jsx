import instance from "./base";

export async function quizSuccess({ user_id, level }) {
  const response = await instance.put("/users/quiz", {
    user_id,
    level,
  });
  return response;
}
