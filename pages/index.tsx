import React from "react";
import type { NextPage } from 'next';
import {EmailForm} from "@components/forms/EmailForm";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserList } from "services/apiUser";
import { getSchoolList } from "services/apiSchool";
import { useDispatch } from "react-redux";
import { setRegisterEmail, setSchool } from "@redux/actions";
const Home: NextPage = () => {
  const users = useQuery({ queryKey: ["users"], queryFn: getUserList });
  const schools = useQuery({ queryKey: ["schools"], queryFn: getSchoolList });
  console.log(schools);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="email">
      <div className="email-sideBar">
        <LeftPanel> </LeftPanel>
      </div>
      <div className="email-content">
        <div className="email-content-form-student">
          <EmailForm
            onSubmit={(email) => {
              if (users.data.Response.filter((data: { email: string; }) => data.email == email).length > 0) {
                //if email is in database, navigate to login page
                router.push("/login");
              } else if (email.includes(".edu")) {
                const school = schools.data[email.split("@")[1]]
                //if email is not in database but have an .edu suffix, navigate to school page
                dispatch(setRegisterEmail(email));
                dispatch(setSchool(school));
                router.push(`/registration/password`);
              } else {
                //else, navigate to registration page
                dispatch(setRegisterEmail(email));
                router.push("/registration");
              }
              return;
            }}
          />
        </div>
        <div className="email-content-form-google" data-onsuccess="onSignIn">Google</div>
        <div className="email-content-form-recruiter">
          <EmailForm
            onSubmit={(email) => {
              if (users.data.Response.filter((data: { email: string; }) => data.email == email).length > 0) {
                //if email is in database, navigate to login page
                router.push("/login");
              } else if (email.includes(".edu")) {
                const school = schools.data[email.split("@")[1]]
                //if email is not in database but have an .edu suffix, navigate to school page
                dispatch(setRegisterEmail(email));
                dispatch(setSchool(school));
                router.push(`/registration/password`);
              } else {
                //else, navigate to registration page
                dispatch(setRegisterEmail(email));
                router.push("/registration");
              }
              return;
            }}
          />
        </div>
          <div className="email-content-form-google" data-onsuccess="onSignIn">Google</div>
        </div>
      </div>
  );
};

export default Home;
