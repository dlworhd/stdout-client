
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";


console.log(process.env.REACT_APP_BASE_URL);

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 기본 요청 URL 설정
});

// instance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem("accessToken");
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         return config;
//     },
//     (error: AxiosError) => {
//         if(error.response&& error.response.status === 401){
//             const dispatch = useDispatch();
//             const navigator = useNavigate();
//             dispatch(logout());
//             localStorage.setItem('accessToken', '');
//             alert('다시 로그인해주세요.');
//             navigator('/login');
//         } else {
//             console.log(error);
//         }
//     }
// );

export default instance;
