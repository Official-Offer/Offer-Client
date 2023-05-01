import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { SchoolForm } from "@components/forms";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

//create a next page for the student home page, code below
const RegisterStudent: NextPage = () => {
  const router = useRouter();
  const [school, setSchool] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.account);

  return (
    <div className="register">
      <div className="register-sideBar">
        <LeftPanel />
      </div>
      <div className="register-content">
        <div className="register-content-form">
          {state.role.isStudent ? (
            <div>
              <h1>
                Bắt đầu sự nghiệp ngay khi
                <br />
                ngồi trên ghế nhà trường với Offer
              </h1>
              <SchoolForm
                onSubmit={(school) => {
                  // setSchool(school);
                  dispatch(setSchool(school));
                  router.push({
                    pathname: "/registration/password",
                    // query: { param: school },
                  });
                }}
              />
            </div>
          ) : state.role.isAdvisor ? (
            <div>
              <h1>
                Bắt đầu sự nghiệp ngay khi
                <br />
                ngồi trên ghế nhà trường với Offer
              </h1>
              <SchoolForm
                onSubmit={(school) => {
                  // setSchool(school);
                  dispatch(setSchool(school));
                  router.push({
                    pathname: "/registration/password",
                    // query: { param: school },
                  });
                }}
              />
            </div>
          ) : (
            <div>
              <h1>
                Bắt đầu sự nghiệp ngay khi
                <br />
                ngồi trên ghế nhà trường với Offer
              </h1>
              <SchoolForm
                onSubmit={(school) => {
                  // setSchool(school);
                  dispatch(setSchool(school));
                  router.push({
                    pathname: "/registration/password",
                    // query: { param: school },
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
