import { createSlice } from "@reduxjs/toolkit";

interface ICJob {
  title: string;
  company: string;
  description: string;
  deadline: string;
}

const initialState: ICJob = {
  title: "",
  company: "",
  description: "",
  deadline: "",
};

const jobSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDeadline: (state, action) => {
      state.deadline = action.payload;
    },
  },
});

export const { setTitle, setCompany, setDescription, setDeadline } = jobSlice.actions;

export default jobSlice.reducer;
