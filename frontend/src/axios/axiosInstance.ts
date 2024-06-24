import axios from "axios";
import envVar from "@/conf/env";
const axiosInstanceWithCredentials = axios.create({
  baseURL: envVar.backendUrl,
  withCredentials: true,
});
export { axiosInstanceWithCredentials };
