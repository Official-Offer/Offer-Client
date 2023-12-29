import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import { ApplicantColumns } from "@components/table/columnType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getApplicantsForJob } from "@services/apiRecruiter";
import { ApplicantDataType } from "@components/table/dataType";
import { useRouter } from "next/router";
import { formatFullName } from "@utils/formatters/stringFormat";
import { formatDate } from "@utils/formatters/numberFormat";
import { BackwardOutlined } from "@ant-design/icons";
import { deleteJob } from "@services/apiJob";
import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

const Applicants: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [dataset, setDataSet] = useState<any[]>([]);
  const router = useRouter();
  const [confirmMessage, setMessage] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();

  // make id an integer instead of string
  const id = parseInt(router.query.id as string);

  console.log(id);
  const applicantQuery = useQuery(
    ["applicants"],
    () => getApplicantsForJob(id),
    {
      onSuccess: async (res: ApplicantDataType) => {
        console.log(res);
        setData(res.applicants);
        setDataSet(res.applicants);
        setJobTitle(res.job || " ");
        setSearchResults(
          res.applicants.map(
            (a: any) => a.student.account.firstName,
            // formatFullName(applicant.student.account)
          ),
        );
      },
      onError: () => {},
    },
  );
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message,
      description,
    });
  };
  const deleteJobMutation = useMutation(() => deleteJob(id), {
    onSuccess: () => {
      setMessage("Xóa công việc thành công");
    },
    onError: (error) => {},
  });

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter(
      (item) =>
        value.toLowerCase() ===
        formatFullName(item.student.account).toLowerCase(),
    );
    setData(filteredData);
  };

  const handleDeleteJob = () => {
    deleteJobMutation.mutate();
    // router.back();
  };

  const handleEditJob = () => {
    router.push(`/recruiter/jobs/edit/${id}`);
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
      <h3 className="applicant-title">Chi tiết công việc {jobTitle}</h3>
      {confirmMessage ? (
        <p>{confirmMessage}</p>
      ) : (
        <div className="applicant-table">
          <BaseTable
            dataset={data}
            columns={ApplicantColumns}
            placeholder={"Tìm ứng viên"}
            // handleFilterType={handleFilterType}
            handleFilterSearch={handleFilterSearch}
            handleDelete={handleDeleteJob}
            handleEdit={handleEditJob}
            searchResults={searchResults}
            tableType={"Applicants"}
            isLoading={applicantQuery.isLoading}
          />
        </div>
      )}
      {contextHolder}
    </div>
  );
};

export default Applicants;
