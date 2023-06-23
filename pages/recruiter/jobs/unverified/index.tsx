import ApplicantTypeFilter from "@components/filter/ApplicantTypeFilter";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { BaseTable } from "@components/table/unapprovedJobTable";
import { unapprovedJobColumns } from "@components/table/columnType";

//create a next page for the student home page, code below
const UnapprovedJobs: NextPage = () => {
  const ApplicantTable = dynamic(() =>
    import("@components").then((mod: any) => mod.ApplicantTable)
  ) as any;

  const [applicantList, setApplicantList] = useState<string[]>([]);
  const [dataset, setData] = useState<DataType[]>([]);

  // DataType[]
  const { jobID } = props;
  console.log(jobID);
  const jobQuery = useQuery({
    queryKey: ["jobID"],
    queryFn: () => getApplicants(jobID),
    onSuccess: async (res) => {
      console.log(res);
      res.forEach((student) => {
        // console.log(student)
        setApplicantList([...applicantList, student.name || "No name"]);
        setData([
          ...dataset,
          {
            ID: student.user.id,
            name: student.name || "No name",
            school: student.default_school?.name || "No School",
            major: student.major,
            expected_graduation: student.expected_graduation,
            tag: "Vòng đơn",
          },
        ]);
      });
    },
    onError: () => {},
  });

  return (
    <div className="applicant">
      <h1 className="applicant-title">Ứng viên</h1>
      <div className="applicant-table">
        <BaseTable dataset={dataset} columns={unapprovedJobColumns}/>
      </div>
    </div>
  );
};

export default UnapprovedJobs;
