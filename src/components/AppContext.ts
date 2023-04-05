import { createContext } from "react";

const AppContext = createContext({
    registerEmail: "",
    setRegisterEmail: (registerEmail: string) => {},
    school: "",
    setSchool: (school: string) => {},
    token: "",
    setToken: (token: string) => {},
});

export default AppContext;