import axios from "axios";
export const BACKEND_URL = "http://localhost:4001/backend/api/v1";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
// Without using local storage
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }
      isRefreshing = true;
      try {
        const res = await axios.get(`${BACKEND_URL}/refresh/token`, {
          withCredentials: true,
        });

        processQueue();
        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
// Token store in localStorage based Interceptors

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log(token, "token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// let isRefreshing = false;
// const failedQueue = [];
// const processQueue = (err, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (err) {
//       prom.reject(err);
//     } else {
//       prom.resolve(token);
//     }
//   });
// };
// axiosInstance.interceptors.response.use(
//   (response) => console.log(response, "response"),
//   async (error) => {
//     console.log(error, "error");
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           processQueue.push({ resolve, reject }).then((token) => {
//             originalRequest.headers.Authorization = `Bearers ${token}`;
//             return axiosInstance(originalRequest);
//           });
//         });
//       }
//       isRefreshing = true;
//       try {
//         const res = await axios.get(`${BACKEND_URL}/refresh/token`, {
//           withCredentials: true,
//         });
//         console.log(res, "response const ");
//         const newAccessToken = res.data?.token;
//         localStorage.setItem("token", newAccessToken);
//         processQueue(null, newAccessToken);
//         return axiosInstance(originalRequest);
//       } catch (error) {
//         console.log("enter error");
//         processQueue(error, null);
//         localStorage.removeItem("token");
//         return Promise.reject(error);
//       } finally {
//        isRefreshing= false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );
