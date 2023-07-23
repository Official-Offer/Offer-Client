import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { useQuery } from "react-query";
import {  getUnapprovedJobs } from "@services/apiJob";
import { useState } from "react";
import { EventAdvisorDataType } from "@components/table/dataType";
import router from "next/router";
import { EventAdvisorColumns } from '../../../src/components/table/columnType';

//create a next page for the student home page, code below
const Events: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<EventAdvisorDataType[]>([]);
  const [dataset, setDataSet] = useState<EventAdvisorDataType[]>([]);
  // DataType[]
  const eventQuery = useQuery({
    queryKey: ["advisor-events"],
    queryFn: getAdvisorEvents,
    onSuccess: async (events) => {
      setData(events);
      setDataSet(events);

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
    if (!value) {
      setData(dataset);
      return;
    }
    setData(dataset.filter((item) => item.title === value));
  };

  const handleAddJob = () => {
    router.push('/recruiter/jobs/eventForm');
  }

  return (
    <div className="advisor">
      <h1 className="advisor-title">Sự kiện</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={EventAdvisorColumns}
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