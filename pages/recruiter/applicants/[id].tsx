import { NextPage } from "next";
import { BaseTable } from "@components/table/BaseTable";
import {
  ApplicantColumns,
  JobColumns,
  RecruiterCompanyColumns,
} from "@components/table/columnType";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { on } from "events";
import { deleteJob } from "@services/apiJob";
import { Button, message, Popconfirm } from "antd";

const Applicants: NextPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [dataset, setDataSet] = useState<any[]>([]);
  const router = useRouter();
  // make id an integer instead of string
  const id = parseInt(router.query.id as string);
  const [confirmMessage, setMessage] = useState<string>("");

  // console.log(id);
  const applicantQuery = useQuery(
    ["applicants"],
    () => getApplicantsForJob(id),
    {
      onSuccess: async (res: ApplicantDataType) => {
        console.log(res);
        // ApplicantDataType[]
        // const apps = res.applicants.map((app: any) => ({
        //   key: app.id,
        //   applied_at: formatDate(app.created_at, "D/M/YYYY"),
        //   name:
        //     app.student.account.firstName + " " + app.student.account.lastName,
        //   school: app.student.school || "Không tìm thấy",
        //   job: app.job.title || "Không tìm thấy",
        //   resume: app.resume,
        // }));
        setData(res.applicants);
        setDataSet(res.applicants);
        setJobTitle(res.job || " ");
        setSearchResults(
          res.applicants.map(
            (a: any) => a.student.account.firstName
            // formatFullName(applicant.student.account)
          )
        );
      },
      onError: () => {},
    }
  );

  const deleteJobMutation = useMutation(() => deleteJob(id), {
    onSuccess: () => {
      // console.log("delete job successfully");
      setMessage("Xóa công việc thành công");
      // queryClient.invalidateQueries("jobs");
    },
    onError: (error) => {
      // console.log(error);
      // message.error("Có lỗi xảy ra");
    },
  });

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
          {/* <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Xoá công việc</Button>
          </Popconfirm> */}
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
            isLoading={applicantQuery.isLoading || deleteJobMutation.isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Applicants;
