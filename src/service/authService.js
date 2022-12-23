import axios from "../axios-config";

export const login = async ({ username, password }) => {
  return await axios.post("/auth", {
    username,
    password,
  });
};

export const register = async ({ username, password }) => {
  return await axios.post("/user/register", {
    username,
    password,
  });
};
