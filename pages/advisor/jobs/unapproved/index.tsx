import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { BaseTable } from "@components/table/BaseTable";
import { unapprovedJobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getJobList, getJobs, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { UnapprovedJobDataType } from "@components/table/dataType";
import router from "next/router";

const UnapprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [filterResults, setFilterResults] = useState<any[][]>([]);
  const [data, setData] = useState<UnapprovedJobDataType[]>([]);
  const [dataset, setDataSet] = useState<UnapprovedJobDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  const [filterType, setFilterType] = useState("title");
  const [placeholders, setPlaceholders] = useState<string[]>(["Tìm ứng viên"]);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["unapproved-job", searchChange],
    queryFn: getUnapprovedJobs,
    onSuccess: async (jobs) => {
      setData(jobs);
      setDataSet(jobs);

      var s: string[] = [];

      jobs.forEach((job) => {
        setSearchResults(oldSearch=>[...oldSearch, job.title]);
      });

    },
    onError: () => {},
  });

  const handleFilterType = (values: string[]) => {
    if (values.length == 0) {
      setData(dataset);
      return;
    }
    setData(
      dataset.filter((item) => {
        if (!item.tag || values.length == 0) return false;
        for (let i = 0; i < values.length; i++) {
          if (values[i]?.label === item.tag) return true;
        }
        return false;
      })
    );
  };

  const handleFilterSearch = (value: any) => {
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item[`${filterType}`] === value));
  };

  const filterProps = () => {

  }

  const handleAddJob = () => {
    router.push('/advisor/jobs/jobForm');
  }

  return (
    <div className="advisor">
      <h1 className="advisor-title">Công việc chưa được duyệt</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          placeholders={placeholders}
          columns={unapprovedJobColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddJob}
          tableType={"unapprovedJob"}
          isLoading={jobQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default UnapprovedJobs;
