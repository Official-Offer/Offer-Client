// import { SubmitButton } from "@styles/styled-components/styledButton";
// import { Typography } from "antd";
// import PinInput from "react-pin-input";
// import FootnoteForm from "./FootnoteForm";

// function SchoolForm() {
//   const [school, setSchool] = useState("");

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // onSubmit(school);
//   };

//   const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
//     // print(event.target.value);
//         setSchool(event.target.value);
//   };

//   return (
//     <div className="register-student-content-form-pincode">
//       <form onSubmit={handleSubmit}>
//         <PinInput
//           length={4}
//           initialValue=""
//           onChange={(value, index) => {}}
//           type="numeric"
//           inputMode="number"
//           style={{ padding: "20px 0px" }}
//           inputStyle={{
//             borderColor: "#7277F1",
//             fontSize: "20px",
//             width: "50px",
//           }}
//           inputFocusStyle={{ borderColor: "#D30B81" }}
//           onComplete={(value, index) => {}}
//           autoSelect={true}
//           regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
//         />
//         <Typography.Text type="secondary">
//           Không nhận được? <u>Gửi lại mã xác nhận</u>
//         </Typography.Text>
//         <br />
//         <br />
//         <SubmitButton type="submit">Tiếp tục</SubmitButton>
//         <br />
//         <br />
//         <FootnoteForm />
//       </form>
//     </div>
//   );
// }
