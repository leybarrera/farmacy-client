import axios from "axios";

export const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_SERVER_URL_LOCAL
      : import.meta.env.VITE_SERVER_URL_DEPLOY,
});
