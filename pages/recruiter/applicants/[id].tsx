import ApplicantTypeFilter from "@components/filter/ApplicantTypeFilter";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";

//create a next page for the student home page, code below
const Applicant: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
//   console.log(id)

  const ApplicantTable = dynamic(() =>
    import("@components").then((mod: any) => mod.ApplicantTable)
  ) as any;

  return (
    <div className="applicant">
      <h1 className="applicant-title">Ứng viên</h1>
      <div className="applicant-table">
        <ApplicantTable applicantID={id}/>
      </div>
    </div>
  );
};

export default Applicant;
