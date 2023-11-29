import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { useQuery } from "@tanstack/react-query";
import { getApprovedJobs, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import router from "next/router";
import { ApprovedJobDataType } from "@components/table/dataType";
import { ApprovedJobColumns } from "@components/table/columnType";

const ApprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<ApprovedJobDataType[]>([]);
  const [dataset, setDataSet] = useState<ApprovedJobDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["approved-jobs", searchChange],
    queryFn: getApprovedJobs,
    onSuccess: async (jobs) => {
      setData(jobs);
      setDataSet(jobs);

      setSearchResults(jobs.map((job) => job.title));
    },
    onError: () => {},
  });

  //   const handleFilterType = (values: string[]) => {
  //     console.log(values);
  //     if (values.length == 0) {
  //       setData(dataset);
  //       return;
  //     }
  //     setData(
  //       dataset.filter((item) => {
  //         if (!item.tag || values.length == 0) return false;
  //         for (let i = 0; i < values.length; i++) {
  //           if (values[i]?.label === item.title) return true;
  //         }
  //         return false;
  //       })
  //     );
  //   };

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

  const handleAddJob = () => {
    router.push("/advisor/postJobs/jobForm");
  };

  return (
    <div className="advisor">
      <h1 className="advisor-title">Công việc đã duyệt</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={ApprovedJobColumns}
          //   handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddJob}
          tableType={"approvedJob"}
          isLoading={jobQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default ApprovedJobs;
