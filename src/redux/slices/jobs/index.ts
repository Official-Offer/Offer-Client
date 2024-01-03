import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

interface ICJob {
  title: string;
  company: string;
  description: string;
  companyId: number;
  deadline?: Date | null;
  level: string[];
  address: string;
  salary: number;
  major: number[];
  type: string[];
  reqs: string;
  benefits: string;
  upperSalary: number;
  jobId?: number;
  schoolIds?: number[];
  applied: boolean;
  createdAt?: Date | null;
  publiclyAvailalble: boolean;
}

const initialState: ICJob = {
  title: "",
  company: "",
  description: "",
  jobId: 0,
  companyId: 1,
  deadline: new Date(),
  level: [],
  address: "Hà Nội",
  salary: 0,
  major: [1],
  type: [],
  reqs: "",
  benefits: "",
  upperSalary: 0,
  schoolIds: [],
  applied: false,
  createdAt: null,
  publiclyAvailalble: false,
};

const jobSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setPubliclyAvailalble: (state, action) => {
      state.publiclyAvailalble = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
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
    setSchoolIds: (state, action) => {
      state.schoolIds = action.payload;
    },
    setApplied: (state, action) => {
      state.applied = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
  },
});

export const {
  setTitle,
  setCompany,
  setCompanyId,
  setDescription,
  setJobId,
  setDeadline,
  setLevel,
  setAddress,
  setSalary,
  setMajor,
  setType,
  setReqs,
  setBenefits,
  setUpperSalary,
  setSchoolIds,
  setApplied,
  setCreatedAt,
  setPubliclyAvailalble,
} = jobSlice.actions;

export default jobSlice.reducer;
