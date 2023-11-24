import useAxios from "../../hooks/useAxios";
import { usePageHook } from "../../Router";
import Index from "./Index";

export const useIndexPage: usePageHook = () => {
    const axios = useAxios();

    return {
        element: <Index />,
        loader: async () => {
            const [colRes, itemRes, tagRes] = await Promise.all([
                axios.get("item_management/collections/?subset=[0,5]"),
                axios.get("item_management/items/?subset=[0,5]"),
                axios.get("item_management/tags/"),
            ]);

            const collections = colRes.data;
            const items = itemRes.data;
            const tags = tagRes.data;

            return { collections, items, tags };
        },
    };
};
