import axios from "axios";
import { getCookie, setCookie } from "@/lib/cookie";
export const BASE_URL = "https://fa-academy.ir/api/v1/"
const api = axios.create({
  baseURL: BASE_URL,
  // baseURL: "https://snacloud.news/api/v1/",
  // baseURL: "http://localhost:8081/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const publicRoutes = [
  "User/SendOtp",
  "User/ConfirmOtp",
];

api.interceptors.request.use((config: any) => {
  let accessToken = getCookie("accessToken");
  if (!accessToken && typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken") || "";
  }
  const isPublic = publicRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (!isPublic && accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await getNewTokens();

        if (res?.accessToken) {
          setCookie("accessToken", res.accessToken, 30);
          setCookie("refreshToken", res.refreshToken, 360);

          originalRequest.headers["Authorization"] = `Bearer ${res.accessToken}`;
          return api(originalRequest);
        } else {
          // clearTokens();
        }
      } catch {
        // clearTokens();
      }
    }

    return Promise.reject(error?.response?.data || error.message);
  }
);

export default api;



const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return {};

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh-token`, {
      refresh_token: refreshToken,
    });

    return res?.data || {};
  } catch {
    return {};
  }
};

// const clearTokens = () => {
//   setCookie("accessToken", "", 0);
//   setCookie("refreshToken", "", 0);
// };
