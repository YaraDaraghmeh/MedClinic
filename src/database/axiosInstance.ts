import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://firestore.googleapis.com/v1/projects/medicare-2ede3/databases/(default)/documents",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
