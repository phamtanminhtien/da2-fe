import _axios from "axios";
import { getLocalStorageByName, STORAGE_KEYS } from "./localStorage";
import { baseURL } from "./constants";

const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";
const METHOD_DELETE = "DELETE";
const METHOD_PATCH = "PATCH";

function setHeaders(headers) {
  return {
    ...headers,
    Authorization: getLocalStorageByName(STORAGE_KEYS.jwt_token),
  };
}

async function requestAPI(method, url, headers = {}, dataBody, config = {}) {
  headers["Content-Type"] = headers["Content-Type"]
    ? headers["Content-Type"]
    : "application/json";
  headers["accept"] = "application/json";
  headers["lan"] = "vi";
  const token = getLocalStorageByName(STORAGE_KEYS.jwt_token);
  if (token) {
    headers = setHeaders(headers);
  }
  const baseConfig = {
    baseURL: baseURL,
    url: url,
    headers: headers,
    method: method,
  };

  if (method === METHOD_GET) {
    config.params = dataBody;
  } else {
    config.data = dataBody;
  }
  return _axios({
    ...baseConfig,
    ...config,
  })
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return new Promise(function (resolve, reject) {
        if (err.response) {
          return reject(err.response);
        }
        return reject(err);
      });
    });
}
const axios = {
  get(url, dataBody, headers = {}, config = {}) {
    return requestAPI(METHOD_GET, url, headers, dataBody, config);
  },

  post(url, dataBody, headers = {}) {
    return requestAPI(METHOD_POST, url, headers, dataBody);
  },

  put(url, dataBody, headers = {}) {
    return requestAPI(METHOD_PUT, url, headers, dataBody);
  },
  patch(url, dataBody, headers = {}) {
    return requestAPI(METHOD_PATCH, url, headers, dataBody);
  },

  delete(url, dataBody, headers = {}) {
    return requestAPI(METHOD_DELETE, url, headers, dataBody);
  },
};

export default axios;
