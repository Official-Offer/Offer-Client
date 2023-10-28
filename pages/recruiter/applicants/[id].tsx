import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import {
  ApplicantColumns,
  JobColumns,
  RecruiterCompanyColumns,
} from "@components/table/columnType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getApplicantsForRecruiter,
  getRecruitersForCompany,
} from "@services/apiRecruiter";
import { ApplicantDataType } from "@components/table/dataType";
import { useRouter } from "next/router";

const Applicants: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<ApplicantDataType[]>([]);
  const [dataset, setDataSet] = useState<ApplicantDataType[]>([]);
  const router = useRouter();
  // make id an integer instead of string
  const id = parseInt(router.query.id as string);

  const applicantQuery = useQuery(
    ["applicants"],
    () => getApplicantsForRecruiter(id),
    {
      onSuccess: async (applicants) => {
        console.log(applicants);
        //   setData(recruiters);
        //   setDataSet(recruiters);

        //   setSearchResults(recruiters.map(recruiter=>recruiter.name));
      },
      onError: () => {},
    }
  );

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter((item) =>
      item.name?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div className="applicant">
      <h1 className="applicant-title">Ứng viên</h1>
      <div className="applicant-table">
        <BaseTable
          dataset={data}
          columns={ApplicantColumns}
          placeholder={"Tìm ứng viên"}
          // handleFilterType={handleFilterType}
          handleFilterSearch={handleFilterSearch}
          searchResults={searchResults}
          tableType={"Applicants"}
          isLoading={applicantQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Applicants;
