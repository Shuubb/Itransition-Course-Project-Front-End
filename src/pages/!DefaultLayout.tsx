import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Search from "../components/Search";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function DefaultLayout({ children }: { children?: JSX.Element }) {
    return (
        <div className="vw-100 min-height-100vh">
            <Navbar />
            <div className="myContainer mx-3">
                <Search />
                <div className="pt-2">{children || <Outlet />}</div>
                <ThemeSwitcher />
            </div>
        </div>
    );
}
