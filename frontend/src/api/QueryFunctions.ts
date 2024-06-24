import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";

export function postLogin(data:object){
    const fetchData=axiosInstanceWithCredentials.post(`/auth/login`,data).then(res=>res.data).catch(err=>err.response.data)
    
    return fetchData;
}
export function postRegister(data:object){
    const fetchData=axiosInstanceWithCredentials.post(`/auth/register`,data).then(res=>res.data).catch(err=>err)
    return fetchData;
}