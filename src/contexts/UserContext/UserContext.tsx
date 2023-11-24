import { createContext } from "react";

export type User = {
    id: number;
    is_admin: boolean;
    token: string;
    username: string;
};

export type UserManager = {
    user: User | null;
    userAction: {
        set: (newUser: User) => void;
        remove: () => void;
    };
};

export const UserContext = createContext<UserManager | null>(null);
