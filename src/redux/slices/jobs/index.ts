import { createSlice } from "@reduxjs/toolkit";

interface ICJob {
  title: string;
  company: string;
  description: string;
  deadline: string;
  level: string;
  address: string;
  salary: number;
  major: string;
  type: string;
  reqs: string;
  benefits: string;
  upperSalary: number;
}

const initialState: ICJob = {
  title: "",
  company: "",
  description: "",
  deadline: "",
  level: "",
  address: "",
  salary: 0,
  major: "",
  type: "",
  reqs: "",
  benefits: "",
  upperSalary: 0,
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
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setSalary: (state, action) => {
      state.salary = action.payload;
    },
    setUpperSalary: (state, action) => {
      state.upperSalary = action.payload;
    },
    setMajor: (state, action) => {
      state.major = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setReqs: (state, action) => {
      state.reqs = action.payload;
    },
    setBenefits: (state, action) => {
      state.benefits = action.payload;
    },
  },
});

export const { setTitle, setCompany, setDescription, setDeadline, setLevel, setAddress, setSalary, setMajor, setType, setReqs, setBenefits, setUpperSalary} = jobSlice.actions;

export default jobSlice.reducer;
