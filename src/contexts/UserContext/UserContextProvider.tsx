import { useState } from "react";
import { User, UserContext } from "./UserContext";

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

export function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(() => {
        const userJSON = localStorage.getItem("user");
        const user = userJSON && JSON.parse(userJSON);
        return user;
    });

    const userAction = {
        set: (newUser: User) => {
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
        },
        remove: () => {
            setUser(null);
            localStorage.removeItem("user");
        },
    };

    return <UserContext.Provider value={{ user, userAction }}>{children}</UserContext.Provider>;
}
