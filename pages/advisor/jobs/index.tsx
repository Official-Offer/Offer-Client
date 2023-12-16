import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAdvisorJobs,
  verifyJobs,
} from "@services/apiJob";
import { useState } from "react";
import {
  RecruiterJobDataType,
} from "@components/table/dataType";
import {
  AdvisorJobColumns,
} from "@components/table/columnType";
import { getCookie } from "cookies-next";

const Jobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<RecruiterJobDataType[]>([]);
  const [dataset, setDataSet] = useState<RecruiterJobDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["jobs", searchChange],
    queryFn: getAdvisorJobs,
    onSuccess: async (jobs) => {
      console.log("job query", jobs);
      setData(jobs);
      setDataSet(jobs);

      setSearchResults(jobs.map((job: { title: any }) => job.title));
    },
    onError: () => {},
  });

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    // setData(dataset.filter((item) => item.title === value));
    const filteredData = dataset.filter(
      (item) => item.title?.toLowerCase().includes(value.toLowerCase()),
    );
    setData(filteredData);
  };


  console.log(getCookie("cookieToken"))
  console.log(getCookie("orgName"));

  const verifyMutation = useMutation({
    mutationKey: ["verify"],
    mutationFn: verifyJobs,
    onSuccess: async (data: any) => {
      console.log("verify", data);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
    },
  });

  const handleVerifyJob = (id: any, is_approved: boolean) => {
    verifyMutation.mutate({
      id,
      is_approved
    });
    // router.reload();
  };

  return (
    <div className="advisor">
      <h1 className="advisor-title">Công việc</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={AdvisorJobColumns}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleVerify={handleVerifyJob}
          tableType={"AdvisorJobs"}
          isLoading={jobQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Jobs;
