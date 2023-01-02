import axios from "../axios-config";

export const updateCamera = async (id, params) => {
  return await axios.put(`/camera/${id}`, params);
};

export const getCamera = async (id) => {
  return await axios.get(`/camera/${id}`);
};

export const getAllCamera = async () => {
  return await axios.get(`/camera`);
};
