import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import PasswordForm from "@components/forms/PasswordForm";
import Image from "next/image";
import { useContext, useState } from "react";
import AppContext from "@components/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { registerUser } from "services/apiUser";

//create a next page for the student home page, code below
const RegisterPassword: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Invalidate and refetch
      console.log('success');
      queryClient.invalidateQueries({ queryKey: ['register'] })
    },
  })


  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          {/* <Image src="..;/"/> */}
          <h1>Bách Khoa Hà Nội</h1>
          <br />
          <br />
          <PasswordForm
            onSubmit={function (password: string): void {
                // setPassword(password);
                mutation.mutate({
                  email: context.registerEmail,
                  password: password,
                })
                router.push({
                    pathname: "/student/registration/basic-information",
                });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPassword;
