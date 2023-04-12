import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginForm } from "@components/forms";
import { setCookie, getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { studentLogin } from "services/apiStudent";

//create a next page for the student home page, code below
const LoginStudent: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: studentLogin,
    onSuccess: async (data) => {
      // Invalidate and refetch
      setCookie("access_token", data.token);
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
          <h1>
            Bách Khoa Hà Nội
          </h1>
          <LoginForm
            onSubmit={(item) => {
              mutation.mutate({
                "email": item.email,
                "password": item.password,
              });
              // setEmail(item.email);
              // setPassword(item.password);
              router.push({
                pathname: "/student",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
