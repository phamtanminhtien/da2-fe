import axios from "../axios-config";

export const createMess = (data) => {
  return axios.post("/mess", data);
};

export const getMess = (data) => {
  return axios.get("/mess", data);
};
