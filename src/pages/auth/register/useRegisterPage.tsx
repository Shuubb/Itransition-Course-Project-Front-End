import { Navigate } from "react-router-dom";
import { usePageHook } from "../../../Router";
import useAxios from "../../../hooks/useAxios";
import { useUserContext } from "../../../contexts/UserContext/useUserContext";
import Register from "./Register";

export const useRegisterPage: usePageHook = () => {
    const axios = useAxios();
    const { userAction } = useUserContext();

    return {
        element: <Register />,
        action: async ({ request }) => {
            switch (request.method) {
                case "POST":
                    const formData = await request.formData();
                    try {
                        const res = await axios.post("auth_api/register/", formData, undefined);
                        userAction.set(res.data);
                        return <Navigate to="/" />;
                    } catch (err: any) {
                        return err.data.message;
                    }
                default:
                    return null;
            }
        },
    };
};
