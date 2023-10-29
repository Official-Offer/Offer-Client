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
    getApplicantsForJob,
  getRecruitersForCompany,
} from "@services/apiRecruiter";
import { ApplicantDataType } from "@components/table/dataType";
import { useRouter } from "next/router";
import { formatFullName } from "@utils/formatters/stringFormat";

const Applicants: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<ApplicantDataType[]>([]);
  const [dataset, setDataSet] = useState<ApplicantDataType[]>([]);
  const router = useRouter();
  // make id an integer instead of string
  const id = parseInt(router.query.id as string);

  const applicantQuery = useQuery({
    queryKey: ["applicants"],
    queryFn: getApplicantsForJob,
    onSuccess: async (applicants: ApplicantDataType[]) => {
      setData(applicants);
      setDataSet(applicants);
      setSearchResults(applicants.map(applicant => formatFullName(applicant.student.account)));
    },
    onError: () => {},
  });

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter(item =>
      value.toLowerCase() === formatFullName(item.student.account).toLowerCase()
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
