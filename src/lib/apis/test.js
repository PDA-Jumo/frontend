import instance from "./base";

export async function testAPI() {
  const response = await instance.get("/test");
  return response;
}
