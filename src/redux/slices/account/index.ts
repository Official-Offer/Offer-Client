import { createSlice } from "@reduxjs/toolkit";

interface ICAccount {
  email: string;
  school?: string;
  company?: string;
  role: {
    isStudent: boolean;
    isAdvisor: boolean;
    isRecruiter: boolean;
  };
  loggedIn: boolean;
}

const initialState: ICAccount = {
  email: "",
  school: "",
  company: "",
  role: {
    isStudent: true,
    isAdvisor: false,
    isRecruiter: false,
  },
  loggedIn: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setRegisterEmail: (state, action) => {
      state.email = action.payload;
    },
    setSchool: (state, action) => {
      state.school = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    }
  },
});

export const { setRegisterEmail, setSchool, setCompany, setRole, setLoggedIn } = accountSlice.actions;

export default accountSlice.reducer;
