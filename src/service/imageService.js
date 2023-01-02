import axios from "../axios-config";

export const getImage = async (params) => {
  return await axios.get(`/images`, params);
};
