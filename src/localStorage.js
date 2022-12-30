export const STORAGE_KEYS = {
  jwt_token: "jwt_token",
  user_info: "user_info",
};

export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

export const removeLocalStorageByName = (name) => {
  localStorage.removeItem(name);
};

export const getLocalStorageByName = (name) => {
  return localStorage.getItem(name);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.user_info));
};
