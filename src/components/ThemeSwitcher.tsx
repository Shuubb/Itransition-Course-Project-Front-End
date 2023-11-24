import { useEffect, useState } from "react";

import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitcher() {
   const [isChecked, setIsChecked] = useState<null | boolean>(null);

   useEffect(() => {
      if (isChecked === null) {
         const savedThemeJSON = localStorage.getItem("darkTheme");
         const savedTheme = JSON.parse(savedThemeJSON ?? "false");
         setIsChecked(savedTheme);
      } else
         document.body.setAttribute(
            "data-bs-theme",
            isChecked ? "dark" : "light"
         );
   }, [isChecked]);

   function handleSwitch() {
      setIsChecked(!isChecked);
      localStorage.setItem("darkTheme", JSON.stringify(!isChecked));
   }

   return (
      <div
         className="d-flex align-items-center bg-dark-subtle p-2 m-2 rounded border position-fixed end-0 bottom-0"
         onClick={handleSwitch}
         style={{ cursor: "pointer", width: "fit-content" }}
      >
         {isChecked ? (
            <FaSun style={{ color: "#FFCC33" }} size="1.5rem" />
         ) : (
            <FaMoon className="text-dark" size="1.5rem" />
         )}
      </div>
   );
}
