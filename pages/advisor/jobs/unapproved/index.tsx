import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { Button, Input, Space, Tag } from "antd";
import { BaseTable } from "@components/table/BaseTable";
import { unapprovedJobColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { getJobList, getJobs, getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { UnapprovedJobDataType } from "@components/table/dataType";
import router from "next/router";

const UnapprovedJobs: NextPage = () => {
  const [searchResults, setSearchResults] = useState<any[][]>([]);
  // const [filterResults, setFilterResults] = useState<any[][]>([]);
  const [data, setData] = useState<UnapprovedJobDataType[]>([]);
  const [dataset, setDataSet] = useState<UnapprovedJobDataType[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>("title");
  const [placeholders, setPlaceholders] = useState<string[]>(["Tìm ứng viên"]);
  const [handleFilterSearches, setHandleFilterSearches] = useState([]);
  const addFilter = () => {
    let inType = unapprovedJobColumns.filter((col)=>filterType === col.key)
    if (inType) {
      let handleFilterSearch = (value: any) => {
        if (!value) {
          setData(dataset);
          return;
        }
        setData(dataset.filter((item) => item[`${filterType}`] === value));
      };
      setPlaceholders((p)=>[...p, filterType]);
      setFilterTypes((filters) => [...filters, filterType]);
      setHandleFilterSearches((filters)=>[...filters, ()=>{return;}])
      var s: any[] = [];
      dataset.forEach((data)=>{
        s.push(data[`${filterType}`]);
      })
      setSearchResults((oldSearches)=>[...oldSearches, s])
    } else {
      console.log("not value filter type")
    }
  };

  const jobQuery = useQuery({
    queryKey: ["unapproved-job", searchChange, filterTypes],
    queryFn: getUnapprovedJobs,
    onSuccess: async (jobs) => {
      setData(jobs);
      setDataSet(jobs);

      // var s: string[] = [];

      // jobs.forEach((job) => {
      //   filterTypes.forEach((filter) => {
      //     setSearchResults((oldSearch) => [...oldSearch, job[`${filter}`]]);
      //   });
      // });
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
          columns={unapprovedJobColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearches}
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
