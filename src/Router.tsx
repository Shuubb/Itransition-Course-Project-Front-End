import { ActionFunction, LoaderFunction, RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./pages/!DefaultLayout";
import AuthLayout from "./pages/auth/!AuthLayout";
import ErrorBoundary from "./pages/ErrorBoundary";
import { useCollectionPage } from "./pages/collection/useCollectionPage";
import { usePersonalPage } from "./pages/personal/usePersonalPage";
import { useItemPage } from "./pages/item/useItemPage";
import { useIndexPage } from "./pages/Index/useIndexPage";
import { useLoginPage } from "./pages/auth/login/useLoginPage";
import { useRegisterPage } from "./pages/auth/register/useRegisterPage";

export type usePageHook = () => {
    element: JSX.Element;
    loader?: LoaderFunction;
    action?: ActionFunction;
};

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <DefaultLayout />,
            errorElement: <ErrorBoundary />,
            children: [
                {
                    path: "/",
                    ...useIndexPage(),
                },
                {
                    path: "/personal",
                    ...usePersonalPage(),
                },
                {
                    path: "/collections/:collectionId?",
                    ...useCollectionPage(),
                },
                {
                    path: "/items/:itemId?",
                    ...useItemPage(),
                },
                {
                    path: "",
                    element: <AuthLayout />,
                    children: [
                        {
                            path: "login",
                            ...useLoginPage(),
                        },
                        {
                            path: "register",
                            ...useRegisterPage(),
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
