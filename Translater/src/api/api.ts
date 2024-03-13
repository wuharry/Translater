import axios, { AxiosRequestConfig } from "axios";

//axios 實體

const instance = axios.create({
  // https://api.edenai.run/v2/translation/automatic_translation
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjk0MTYxMDktMGQ2OC00MzUwLWEzM2EtZjQ2NDMzOTliNmMxIiwidHlwZSI6ImFwaV90b2tlbiJ9.GHz75FIzPzJFkAgLylGdH60UVy5tEMWbGlp8Jdy9OWI",
  },

  timeout: 20000,
});

// 此處的instance為我們create的實體
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      switch (error.response.status) {
        case 404:
          //deal with response 404
          console.log("你要找的頁面不存在");
          break;

        case 500:
          //deal with response 500
          console.log("程式發生問題");
          break;

        default:
          break;
      }
      if (!window.navigator.onLine) {
        alert("網路出了點問題，請重新連線後重整網頁");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  }
);

export const ApiRequest = <T>(
  method: string,
  url: string,
  data: string | object | undefined | null,
  config: AxiosRequestConfig = {}
): Promise<T> | false => {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return instance.post(url, data, config).then((res) => res.data);
    case "get":
      return instance.get(url, { params: data }).then((res) => res.data);
    case "delete":
      return instance.delete(url, { params: data }).then((res) => res.data);
    case "put":
      return instance.put(url, data).then((res) => res.data);
    case "patch":
      return instance.patch(url, data).then((res) => res.data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
};
