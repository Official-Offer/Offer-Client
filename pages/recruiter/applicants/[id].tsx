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
import { formatDate } from "@utils/formatters/numberFormat";
import { BackwardOutlined } from "@ant-design/icons";

const Applicants: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [dataset, setDataSet] = useState<any[]>([]);
  const router = useRouter();
  // make id an integer instead of string
  const id = parseInt(router.query.id as string);

  console.log(id);
  const applicantQuery = useQuery(
    ["applicants"],
    () => getApplicantsForJob(id),
    {
      onSuccess: async (applicants: ApplicantDataType[]) => {
        const apps = applicants.map((app: any) => ({
          key: app.id,
          applied_at: formatDate(app.created_at, "D/M/YYYY"),
          name:
            app.student.account.firstName + " " + app.student.account.lastName,
          school: app.student.school || "Không tìm thấy",
          job: app.job.title || "Không tìm thấy",
          resume: app.resume,
        }));
        setData(apps);
        setDataSet(apps);
        setJobTitle(applicants[0]?.job?.title || " ");
        setSearchResults(
          applicants.map(
            (applicant: any) => applicant.student.account.firstName
            // formatFullName(applicant.student.account)
          )
        );
      },
      onError: () => {},
    }
  );

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter(
      (item) =>
        value.toLowerCase() ===
        formatFullName(item.student.account).toLowerCase()
    );
    setData(filteredData);
  };

  return (
    <div className="applicant">
      <p
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          router.back();
          // setScreen(false);
        }}
      >
        <BackwardOutlined /> Quay lại
      </p>
      {/* <h3>Ứng viên cho công việc </h3> */}
      <h3 className="applicant-title">Ứng viên cho công việc {jobTitle}</h3>
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
