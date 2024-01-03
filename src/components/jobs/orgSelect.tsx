import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Checkbox, Divider, Form, Select } from "antd";
import { useState } from "react";
import { SubmitButton } from "@components/button/SubmitButton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getOrgList } from "@services/apiUser";
import { setCompany, setCompanyId, setSchoolIds, setPubliclyAvailalble } from "@redux/actions";
import { schoolList, companyList } from "@public/static/list";

export const SelectOrg: React.FC<any> = ({ onClick }) => {
  const state = useSelector((state: RootState) => state.jobs);
  const router = useRouter();
  const [schools, setSchools] = useState<any>();
  const [companies, setCompanies] = useState<any>();
  const [selectedOrgIds, setSelectedOrgIds] = useState<any>([]);
  const [publiclyAvail, setPubliclyAvail] = useState<any>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const dispatch = useDispatch();

  const processedSchoolList: any[] = Object.keys(schoolList).map((key) => ({
    id: key,
    name: schoolList[parseInt(key)].name,
  }));
  const processedCompanyList: any[] = Object.keys(companyList).map((key) => ({
    id: key,
    name: companyList[parseInt(key)].name,
  }));

  // const orgQuery = useQuery({
  //   queryKey: ["orgs"],
  //   queryFn: getOrgList,
  //   onSuccess: async (orgs) => {
  //     // add "school is not found" into the list
  //     const schoolList = orgs.schools;
  //     const companyList = orgs.companies;

  //     setSchools(schoolList);
  //     setCompanies(companyList);
  //   },
  //   onError: () => {
  //     // console.log("error");
  //   },
  // });

  const isRecruiter = router.pathname.includes("recruiter") ? true : false;

  return (
    <div className="job-school">
      <h2>{`Chọn ${isRecruiter ? `trường` : `công ty`} để đăng công việc`}</h2>
      <br />
      {isRecruiter && (
        <Checkbox
          onChange={() => {
            setPubliclyAvail(!Boolean(publiclyAvail));
          }}
          disabled={selectedOrgIds.length > 0}
        >
          Đăng công việc lên diễn đàn chung
        </Checkbox>
      )}
      {/* <hr/> */}
      {!publiclyAvail && (
        <Form className="form" layout="vertical" disabled={publiclyAvail}>
          <div className="form-flex">
            <div className="form-input">
              <Form.Item label={isRecruiter ? "Chọn 1 hoặc nhiều trường" : "Công ty"}>
                <Select
                  // defaultValue={orgName}
                  labelInValue={true}
                  mode={isRecruiter ? "multiple" : undefined}
                  showSearch
                  className="form-select"
                  bordered={false}
                  onChange={(value: any) => {
                    // console.log(value);
                    if (isRecruiter) {
                      setSelectedOrgIds(value.map((item: { key: any }) => Number(item.key)));
                    } else {
                      setCompanyName(value.label);
                      setSelectedOrgIds(Number(value.key));
                    }
                  }}
                  // loading={orgQuery.isLoading}
                >
                  {isRecruiter
                    ? processedSchoolList.map((school: any) => (
                        <Select.Option
                          key={school.id}
                          className="form-select-dropdown"
                          value={school.name}
                        >
                          {school.name}
                        </Select.Option>
                      ))
                    : processedCompanyList.map((company: any) => (
                        <Select.Option
                          key={company.id}
                          className="form-select-dropdown"
                          value={company.name}
                        >
                          {company.name}
                        </Select.Option>
                      ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
      <SubmitButton
        text={"Tiếp tục"}
        disabled = {!selectedOrgIds && typeof publiclyAvail !== "boolean"}
        // isLoading={orgQuery.isLoading}
        onClick={() => {
          if (isRecruiter) {
            console.log(publiclyAvail)
            dispatch(setPubliclyAvailalble(publiclyAvail));
            dispatch(setSchoolIds(selectedOrgIds));
          } else {
            dispatch(setCompanyId(selectedOrgIds));
            dispatch(setCompany(companyName));
          }
          onClick();
        }}
      />
    </div>
  );
};

export default SelectOrg;
