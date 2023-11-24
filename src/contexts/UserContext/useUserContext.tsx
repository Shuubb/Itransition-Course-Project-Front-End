import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useUserContext() {
   const context = useContext(UserContext);

   if (!context) throw new Error("context setting went wrong!");
   return context;
}
