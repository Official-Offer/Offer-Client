import { createContext } from "react";

const AppContext = createContext({
    registerEmail: "",
    setRegisterEmail: (registerEmail: string) => {},
});

export default AppContext;