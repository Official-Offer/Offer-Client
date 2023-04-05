import { createContext } from "react";

const AppContext = createContext({
    registerEmail: "",
    setRegisterEmail: (registerEmail: string) => {},
    school: "",
    setSchool: (school: string) => {},
});

export default AppContext;