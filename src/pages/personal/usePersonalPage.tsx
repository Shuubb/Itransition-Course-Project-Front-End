import useAxios from "../../hooks/useAxios";
import { usePageHook } from "../../Router";
import Personal from "./Personal";
import { useUserContext } from "../../contexts/UserContext/useUserContext";

export const usePersonalPage: usePageHook = () => {
    const axios = useAxios();
    const { user } = useUserContext();

    return {
        element: <Personal />,
        loader: async () => {
            let res = await axios.get(`item_management/collections/?user=${user?.id}`);
            const collections = res.data;
            res = await axios.get("item_management/topics/");
            const topicOptions = res.data;
            return { collections, topicOptions };
        },
    };
};
