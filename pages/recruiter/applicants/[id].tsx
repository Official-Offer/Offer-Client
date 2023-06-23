import ApplicantTypeFilter from "@components/filter/TypeFilter";
import { BaseTable } from "@components/table/BaseTable";
import { ApplicantColumns } from "@components/table/columnType";
import { ApplicantDataType } from "@components/table/dataType";
import { getApplicantsFromJobs } from "@services/apiStudent";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

//create a next page for the student home page, code below
const Applicant: NextPage = () => {
  const router = useRouter();
  const jobID = router.query.id;
//   console.log(id)

const [dataset, setData] = useState<ApplicantDataType[]>([]);
  // DataType[]
  const jobQuery = useQuery({
    queryKey: ["unapproved-job"],
    queryFn: () => getApplicantsFromJobs(Number(jobID)),
    onSuccess: async (applicants) => {
      console.log(applicants);
      setData(applicants);
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
    setData(dataset.filter((item) => item.name == value));
  };

  return (
    <div className="applicant">
      <h1 className="applicant-title">Ứng viên</h1>
      <div className="applicant-table">
        <BaseTable dataset={dataset} columns={ApplicantColumns} handleFilterType={handleFilterType} handleFilterSearch={handleFilterSearch}/>
      </div>
    </div>
  );
};

export default Applicant;
