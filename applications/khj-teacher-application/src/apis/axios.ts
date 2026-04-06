import axios from "axios";

export const api = axios.create({
  baseURL: "http://3.26.198.139:8080/", // 예시
  withCredentials: true,
});
