import axios from "../axios-config";

export const login = async ({ username, password }) => {
  return await axios.post("/auth", {
    username,
    password,
  });
};
