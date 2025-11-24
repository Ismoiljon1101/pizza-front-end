import React, { ReactNode, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext, ThemeMode } from "../hooks/useGlobals";

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light"
  const stored = localStorage.getItem("theme")
  if (stored === "light" || stored === "dark") return stored
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const ContextProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const cookies = new Cookies();
    if(!cookies.get("accessToken")) localStorage.removeItem("memberData"); 

    const [authMember, setAuthMember] = useState <Member | null> (
        localStorage.getItem("memberData")
            ? JSON.parse(localStorage.getItem("memberData") as string)
            : null
    );

    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
    const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

    useEffect(() => {
      const root = window.document.documentElement
      if (theme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
      localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"))

    return (<GlobalContext.Provider value={{authMember, setAuthMember, orderBuilder, setOrderBuilder, theme, setTheme, toggleTheme}}>
        {children}
    </GlobalContext.Provider>)


};

export default ContextProvider;