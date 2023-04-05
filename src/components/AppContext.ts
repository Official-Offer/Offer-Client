import { createContext } from "react";

const AppContext = createContext({
    session: "",
    setSession: (session: string) => {},
});

export default AppContext;