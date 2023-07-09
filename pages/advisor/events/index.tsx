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

//create a next page for the student home page, code below
const Events: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [dataset, setData] = useState<UnapprovedJobDataType[]>([]);
  const [isLoading, setLoading] = useState(false);
  // DataType[]
  const eventQuery = useQuery({
    queryKey: ["event"],
    queryFn: getUnapprovedJobs,
    onSuccess: async (events) => {
      setData(events);

      var s: string[] = [];

      events.forEach((event) => {
        s.push(event.title);
      });

      setSearchResults(s);
    },
    onError: () => {},
  });

  const handleFilterType = (values: string[]) => {
    console.log(values);
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

  const handleFilterSearch = (value: string) => {
    console.log(value);
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.title === value));
  };

  const handleAddEvent = () => {
    router.push('/advisor/jobs/eventForm');
  }

  return (
    <div className="applicant">
      <h1 className="applicant-title">Sự kiện</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={dataset}
          columns={unapprovedJobColumns}
          handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          handleAdd={handleAddEvent}
          tableType={"Event"}
          isLoading={eventQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Events;