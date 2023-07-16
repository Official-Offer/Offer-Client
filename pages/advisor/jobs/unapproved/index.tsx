import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { Button, Input, Space, Tag } from "antd";
import { BaseTable } from "@components/table/BaseTable";
import { useQuery } from "react-query";
import { getJobList, getJobs, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { UnapprovedJobDataType } from "@components/table/dataType";
import router from "next/router";
import { UnapprovedJobColumns } from "@components/table/columnType";

const UnapprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<any[][]>([[]]);
  // const [filterResults, setFilterResults] = useState<any[][]>([]);
  const [data, setData] = useState<UnapprovedJobDataType[]>([]);
  const [dataset, setDataSet] = useState<UnapprovedJobDataType[]>([]);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const addFilter = () => {
    let inType = UnapprovedJobColumns.filter((col)=>filterType === col.key)
    if (inType) {
      setPlaceholders((p)=>[...p, filterType]);
      setFilterTypes((filters) => [...filters, filterType]);
      var s: any[] = [];
      dataset.forEach((data)=>{
        s.push(data[`${filterType}`]);
      })
      console.log(searchResults)
      setSearchResults((oldSearches)=>[...oldSearches, s])
    } else {
      console.log("not a valid filter type")
    }
  };

  const jobQuery = useQuery({
    queryKey: ["unapproved-job", filterTypes],
    queryFn: getUnapprovedJobs,
    onSuccess: async (jobs) => {
      setData(jobs);
      setDataSet(jobs);

      // var s: any[] = [];
      // jobs.forEach((data)=>{
      //   s.push(data.title);
      // })
      // setSearchResults((oldSearches)=>[...oldSearches, s])
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

  const handleFilterSearch = (value: any, filter: any) => {
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item[`${filter}`] === value));
  };

  const handleAddJob = () => {
    router.push("/advisor/jobs/jobForm");
  };

  return (
    <div className="advisor">
      <h1 className="advisor-title">Công việc chưa được duyệt</h1>
      <div className="advisor-table">
        <span>
          <Input
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
          />
          <Button onClick={addFilter}>Add Filter</Button>
        </span>

        <BaseTable
          dataset={data}
          placeholders={placeholders}
          filterTypes={filterTypes}
          columns={UnapprovedJobColumns}
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
