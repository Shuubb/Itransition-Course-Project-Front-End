import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext/useUserContext";
import axios from "axios";
import { redirect } from "react-router-dom";

export default function useAxios() {
    const { user } = useUserContext();

    const [axiosInstance] = useState(() => {
        const axiosInstance = axios.create({
            baseURL: "/api/",
        });
        axiosInstance.interceptors.response.use(
            (res) => res,
            (err) => {
                throw err.response;
            }
        );
        axiosInstance.defaults.headers.common["Authorization"] = user && `Token ${user.token}`;
        return axiosInstance;
    });

    useEffect(() => {
        axiosInstance.defaults.headers.common["Authorization"] = user && `Token ${user.token}`;
    }, [user]);

    return axiosInstance;
}
