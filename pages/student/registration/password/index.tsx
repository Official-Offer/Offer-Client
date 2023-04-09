import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { PasswordForm } from "@components/forms";
import { useContext, useEffect, useState } from "react";
import AppContext from "@components/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { setCookie } from "cookies-next";
import { registerStudent } from "services/apiStudent";

//create a next page for the student home page, code below
const RegisterPassword: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: async (data) => {
      // Invalidate and refetch
      // Cookies.set("access_token", data.token);
      setCookie("access_token", data.token);
      // Cookies.set("email", context.registerEmail);
      router.reload();
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });


  return (
    <div className="register-student">
      <div className="register-student-sideBar">
        <LeftPanel />
      </div>
      <div className="register-student-content">
        <div className="register-student-content-form">
          {/* <Image src="..;/"/> */}
          <h1>{context.school}</h1>
          <PasswordForm
            onSubmit={(password: string): void => {
              // setPassword(password);
              // setEmail(context.registerEmail);
              mutation.mutate({
                email: context.registerEmail,
                password: password,
              });
              // if (!mutation.isLoading)
              // router.push("/student/email/verify");
              router.push("/student/registration/basic-information");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPassword;
