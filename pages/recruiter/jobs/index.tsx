import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { JobColumns } from "@components/table/columnType";
import { useQuery } from "@tanstack/react-query";
import { getJobsForRecruiter } from "@services/apiJob";
import { useState } from "react";
import { JobDataType } from "@components/table/dataType";
import router from "next/router";
import Profile from "../profile/index";
import { getRecruiter } from "@services/apiRecruiter";
import { setCompany, setCompanyId, setID, setRole } from "@redux/actions";
import { useDispatch } from "react-redux";

//create a next page for the student home page, code below
const Jobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  // data to be filtered/changed
  const [data, setData] = useState<JobDataType[]>([]);
  // original data that remains unchanged
  const [dataset, setDataSet] = useState<JobDataType[]>([]);
  const jobQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsForRecruiter,
    onSuccess: async (jobs) => {
      setData(jobs);
      setDataSet(jobs);
      setSearchResults(jobs.map((job) => job.title));
    },
    onError: () => {},
  });

  const dispatch = useDispatch();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getRecruiter,
    onSuccess: async (info) => {
      console.log(info);
      dispatch(setID(info.account.id));
      dispatch(
        setRole({
          isStudent: false,
          isAdvisor: false,
          isRecruiter: true,
        })
      );
      dispatch(setCompany(info.company.name));
      dispatch(setCompanyId(info.company.id));
    },
    onError: () => {},
  });

  //reimplemented search
  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter((item) =>
      item.title?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleAddJob = () => {
    router.push("/recruiter/postJobs/jobForm");
  };

  return (
    <div className="applicant">
      <h1 className="applicant-title">Công việc</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={JobColumns}
          placeholder={"Tìm công việc"}
          // handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddJob}
          tableType={"RecruiterJobs"}
          isLoading={jobQuery.isLoading && profileQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Jobs;
