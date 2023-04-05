import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import PasswordForm from "@components/forms/PasswordForm";
import Image from "next/image";
import { useContext, useState } from "react";
import AppContext from "@components/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { registerUser } from "services/apiUser";
import Cookies from "js-cookie";

//create a next page for the student home page, code below
const RegisterPassword: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Invalidate and refetch
      Cookies.set("access_token", data.token);
      // context.setToken(mutation.data.Response);
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });

  // console.log(mutation.data);

  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          {/* <Image src="..;/"/> */}
          <h1>{context.school}</h1>
          <br />
          <br />
          <PasswordForm
            onSubmit={(password: string): void => {
              // setPassword(password);
              mutation.mutate({
                email: context.registerEmail,
                password: password,
              });
              console.log(context.registerEmail, password);
              router.push("/student/email/verify");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPassword;
