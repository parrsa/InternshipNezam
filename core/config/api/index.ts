import axios from "axios";
import { getCookie, setCookie } from "@/lib/cookie";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

/**
 * مسیرهایی که نیازی به Authorization ندارند.
 * این‌ها رو باید دقیقاً با path خودت پر کنی.
 * مثال: "auth/login", "auth/register"
 */
const publicRoutes: string[] = [
  // "auth/login",
  // "auth/register",
  // "auth/refresh-token",
];

const getSessionId = (): string | null => {
  const fromCookie = getCookie("session-id");
  if (fromCookie) return fromCookie;

  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("session-id") ||
      localStorage.getItem("sessionId")
    );
  }

  return null;
};

api.interceptors.request.use(
  (config: any) => {
    const isPublic = publicRoutes.some((route) =>
      config.url?.includes(route)
    );

    const sessionId = getSessionId();

    if (!isPublic && sessionId) {
      // طبق curl بک‌اند:
      config.headers["session-id"] = sessionId;
      config.headers["Authorization"] = `Bearer ${sessionId}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await getNewTokens();

        if (res?.accessToken) {
          setCookie("accessToken", res.accessToken, 30);
          setCookie("refreshToken", res.refreshToken, 360);

          originalRequest.headers["Authorization"] =
            `Bearer ${res.accessToken}`;

          return api(originalRequest);
        }
      } catch {
        // clearTokens();
      }
    }

    return Promise.reject(
      error?.response?.data || error?.message || error
    );
  }
);

export default api;

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return {};

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh-token`,
      { refresh_token: refreshToken }
    );
    return res?.data || {};
  } catch {
    return {};
  }
};