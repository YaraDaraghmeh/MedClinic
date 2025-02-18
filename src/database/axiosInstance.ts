import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://firestore.googleapis.com/v1/projects/hospital-29356/databases/(default)/documents",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
