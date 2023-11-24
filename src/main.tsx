import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { UserContextProvider } from "./contexts/UserContext/UserContextProvider.tsx";
import App from "./App.tsx";
import "react-bootstrap-typeahead/css/Typeahead.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </React.StrictMode>
);
