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

//create a next page for the student home page, code below
const UnapprovedJobs: NextPage = () => {
  // const [applicantList, setApplicantList] = useState<string[]>([]);
  const [dataset, setData] = useState<UnapprovedJobDataType[]>([]);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["unapproved-job"],
    queryFn: getUnapprovedJobs,
    onSuccess: async (jobs) => {
      console.log(jobs);
      setData(jobs);
      // jobs.forEach((job) => {
      //   // console.log(student)
      //   // setApplicantList([...applicantList, student.name || "No name"]);
      //   setData([
      //     ...dataset,
      //     {
      //       key: job.id,
      //       ID: job.id,
      //       date: job.timestamp.toString(),
      //       title: job.title || "No title",
      //       address: job.location || "No location",
      //       schools: job.schools.length || "No School",
      //       applicants: job.applicants.length,
      //       tag: "Vòng đơn",
      //     },
      //   ]);
      //   d.push({
      //     key: job.id,
      //     ID: job.id,
      //     date: job.timestamp.toString(),
      //     title: job.title || "No title",
      //     address: job.location || "No location",
      //     schools: job.schools.length || "No School",
      //     applicants: job.applicants.length,
      //     tag: "Vòng đơn",
      //   })
      // });
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
    setData(dataset.filter((item) => item.title == value));
  };

  return (
    <div className="applicant">
      <h1 className="applicant-title">Ứng viên</h1>
      <div className="applicant-table">
        <BaseTable dataset={dataset} columns={unapprovedJobColumns} handleFilterType={handleFilterType} handleFilterSearch={handleFilterSearch}/>
      </div>
    </div>
  );
};

export default UnapprovedJobs;
