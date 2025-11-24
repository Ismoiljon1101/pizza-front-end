import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

export type ThemeMode = "light" | "dark"

interface GlobalInterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void;
    orderBuilder: Date;
    setOrderBuilder: (input: Date) => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>( undefined);

export const useGlobals = () => {
   const context = useContext(GlobalContext);
   if(context === undefined) throw Error("useGlobals within Provider");
   return context;
}