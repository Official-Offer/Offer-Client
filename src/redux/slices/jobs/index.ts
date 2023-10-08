import { createSlice } from "@reduxjs/toolkit";

interface ICJob {
  title: string;
  company: string;
  description: string;
}

const initialState: ICJob = {
  title: "",
  company: "",
  description: ""
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
  },
});

export const { setTitle, setCompany, setDescription } = jobSlice.actions;

export default jobSlice.reducer;
