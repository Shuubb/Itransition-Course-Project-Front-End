import { useRouteError } from "react-router-dom";
import DefaultLayout from "./!DefaultLayout";

export default function ErrorBoundary() {
    let error = useRouteError() as any;
    console.error(error);

    return (
        <DefaultLayout>
            <div className="text-center">
                <h1 className="border rounded shadow bg-light-subtle p-5 m-5 d-inline-block text-danger">
                    {error.statusText}
                </h1>
            </div>
        </DefaultLayout>
    );
}
