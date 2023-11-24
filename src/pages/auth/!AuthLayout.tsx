import { Outlet } from "react-router-dom";

export default function AuthLayout() {
   return (
      <div className="w-100 h-100 d-flex justify-content-center">
         <div className="my-5" style={{ minWidth: "33%" }}>
            <Outlet />
         </div>
      </div>
   );
}
