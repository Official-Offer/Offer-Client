import { NextPage } from "next";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useRouter } from "next/router";
import { PasswordForm } from "@components/forms";
import { useMutation, useQueryClient } from "react-query";
import { setCookie } from "cookies-next";
import { registerStudent } from "services/apiStudent";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

//create a next page for the student home page, code below
const RegisterPassword: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = useSelector((state: RootState) => state.account);
  const mutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: async (data) => {
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
          {/* <Image src="..;/"/> */}
          <h1>{state.school}</h1>
          <PasswordForm
            onSubmit={(password: string): void => {
              mutation.mutate({
                email: state.email,
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
