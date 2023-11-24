import Collection from "./Collection";
import useAxios from "../../hooks/useAxios";
import { redirect } from "react-router-dom";
import { usePageHook } from "../../Router";
import baseAxios from "axios";

export const useCollectionPage: usePageHook = () => {
    const axios = useAxios();

    return {
        element: <Collection />,
        loader: async ({ params }) => {
            if (params.collectionId) {
                let res = await axios.get(`item_management/collections/${params.collectionId}/`);
                const collection = res.data;

                res = await axios.get(`item_management/items/?collection=${collection.id}`);
                const items = res.data;

                res = await axios.get(`item_management/tags/`);
                const tags = res.data;

                return { collections: [collection], items, tags };
            } else {
                let res = await axios.get(`item_management/collections/`);
                const collections = res.data;

                if (collections.length === 1) return redirect(`/collections/${collections[0].id}/`);

                return { collections };
            }
        },
        action: async ({ params, request }) => {
            switch (request.method) {
                case "DELETE":
                    await axios.delete(`item_management/collections/${params.collectionId}/`);
                    return redirect("/");
                case "POST":
                    const formData = await request.formData();
                    const image = formData.get("image") as Blob;
                    if (image.size) {
                        const imageFormData = new FormData();
                        imageFormData.append("file", image);
                        imageFormData.append("upload_preset", "hcemftz8");

                        const imageResponse = await baseAxios.post(
                            "https://api.cloudinary.com/v1_1/dmltpftir/upload",
                            imageFormData
                        );
                        formData.delete("image");
                        formData.append("image_link", imageResponse.data.url);
                    }
                    const res = await axios.post("item_management/collections/", formData);
                    const collection_id = res.data.id;
                    return redirect(`/collections/${collection_id}`);
                default:
                    return null;
            }
        },
    };
};
