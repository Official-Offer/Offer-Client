import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { EventRecruiterColumns } from "@components/table/columnType";
import { useQuery } from "react-query";
import { useState } from "react";
import { EventRecruiterDataType } from "@components/table/dataType";
import router from "next/router";
import { getRecruiterEvents } from "@services/apiEvents";

//create a next page for the student home page, code below
const Events: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<EventRecruiterDataType[]>([]);
  const [dataset, setDataSet] = useState<EventRecruiterDataType[]>([]);
  // DataType[]
  const eventQuery = useQuery({
    queryKey: ["advisor-events"],
    queryFn: getRecruiterEvents,
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

  const handleAddEvent = () => {
    router.push('/recruiter/jobs/eventForm');
  }

  return (
    <div className="advisor">
      <h1 className="advisor-title">Sự kiện</h1>
      <div className="advisor-table">
        <BaseTable
          dataset={data}
          columns={EventRecruiterColumns}
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

