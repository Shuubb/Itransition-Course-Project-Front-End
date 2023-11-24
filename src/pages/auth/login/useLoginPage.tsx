import { Navigate, redirect } from "react-router-dom";
import { usePageHook } from "../../../Router";
import useAxios from "../../../hooks/useAxios";
import Login from "./Login";
import { useUserContext } from "../../../contexts/UserContext/useUserContext";

export const useLoginPage: usePageHook = () => {
    const axios = useAxios();
    const { userAction } = useUserContext();

    return {
        element: <Login />,
        action: async ({ request }) => {
            switch (request.method) {
                case "DELETE":
                    await axios.delete("auth_api/logout/");
                    userAction.remove();
                    return redirect("/login");
                case "POST":
                    const formData = await request.formData();
                    try {
                        const res = await axios.post("auth_api/login/", formData, undefined);
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
