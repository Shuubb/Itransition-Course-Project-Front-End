import useAxios from "../../hooks/useAxios";
import { redirect } from "react-router-dom";
import { usePageHook } from "../../Router";
import Item from "./Item";

export const useItemPage: usePageHook = () => {
    const axios = useAxios();

    return {
        element: <Item />,
        loader: async ({ params }) => {
            if (params.itemId) {
                const res = await axios.get(`item_management/items/${params.itemId}/`);
                const item = res.data;

                return [item];
            } else {
                const res = await axios.get(`item_management/items/`);
                const items = res.data;
                if (items.length === 1) return redirect(`/items/${items[0].id}/`);
                return items;
            }
        },
        action: async ({ params, request }) => {
            switch (request.method) {
                case "DELETE":
                    await axios.delete(`item_management/items/${params.itemId}/`);
                    return redirect("/items");
                case "POST":
                    const formData = await request.formData();

                    const res = await axios.post("item_management/items/", formData);

                    const item_id = res.data.id;
                    return redirect(`/items/${item_id}`);
                default:
                    return null;
            }
        },
    };
};
