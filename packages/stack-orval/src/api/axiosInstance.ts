import axios from "axios";

const customInstance = axios.create({
  baseURL: "http://localhost:4010",
  headers: {
    "Content-Type": "application/json",
  },
});

customInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default customInstance;
