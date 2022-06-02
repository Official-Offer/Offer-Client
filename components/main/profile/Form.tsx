import { ButtonBlue } from "@styles/styled-components/styledButton";
import {
  FormAvatarContainer,
  AvatarImg,
  FormDescription,
  FormTitle,
  FormWrapper,
  ProfileTitle,
  FormAvatarImg,
  FormContainer,
  FieldTitle,
  FormField,
  BiggerFormField,
  FormClosingNote,
  FormButton,
  ClearButton,
  PlaceholderWrapper,
  ColoredPlaceHolder,
  Container,
} from "@styles/styled-components/styledUser";
import { Field } from "rc-field-form";
import useForm from "@utils/hook/useForm";
import { BoxALignCenter_Justify_ItemsBetween } from "@styles/styled-components/styledBox";
import { Divider } from "antd";
import { XCircle } from "react-feather";

const Form = ({ data }) => {
  const { input, handleChange, resetForm, clearForm } = useForm({
    ...data,
    customURL: "",
    portfolio: "",
  });

  return (
    <div>
      <ProfileTitle> Profile Settings </ProfileTitle>
      <FormDescription>
        You can set preferred display name, create your profile URL and manage
        other personal settings.
      </FormDescription>
      <FormWrapper>
        <FormTitle>Edit Profile</FormTitle>
        <FormAvatarContainer className="row">
          <Container className="col-lg-3 col-12">
            <FormAvatarImg src="/img/ys.jpg" />
          </Container>
          <Container className="col-lg-6 col-12 px-4">
            <FormButton>Update Photo</FormButton>
          </Container>
        </FormAvatarContainer>
        <FormContainer onSubmit={() => console.log(input)}>
          <FormTitle>Account Info</FormTitle>
          <br />
          <div className="row">
            <div className="col-12">
              <FieldTitle>Display Name</FieldTitle>
              <FormField
                onChange={handleChange}
                name="displayName"
                placeholder="Enter your display name"
                value={input.displayName}
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Custom URL</FieldTitle>
              <FormField
                onChange={handleChange}
                name="customURL"
                placeholder="ui8.next/Your custom URL"
                value={input.customURL}
              ></FormField>
              {/* <PlaceholderWrapper>
                <ColoredPlaceHolder>
                  <b>ui8.next/</b> Your custom URL
                </ColoredPlaceHolder>
                <FormField
                  onChange={handleChange}
                  name="customURL"
                  // placeholder="ui8.next/Your custom URL"
                  style={{zIndex: 10, position:'relative'}}
                ></FormField>
              </PlaceholderWrapper> */}
            </div>
            <div className="col-12">
              <FieldTitle>BIO</FieldTitle>
              <BiggerFormField
                onChange={handleChange}
                name="bio"
                placeholder="About yourself in a few words"
                value={input.bio}
              ></BiggerFormField>
            </div>
          </div>
          <FormTitle>Social</FormTitle>
          <br />
          <div className="row">
            <div className="col-12">
              <FieldTitle>Portfolio Or Website</FieldTitle>
              <FormField
                onChange={handleChange}
                name="portfolio"
                placeholder="Enter URL"
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Twitter</FieldTitle>
              <FormField
                onChange={handleChange}
                name="twitter"
                placeholder="@twitter username"
                value={input.twitter}
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Telegram</FieldTitle>
              <FormField
                onChange={handleChange}
                name="telegram"
                placeholder="@telegram user"
                value={input.telegram}
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Instagram</FieldTitle>
              <FormField
                onChange={handleChange}
                name="instagram"
                value={input.instagram}
                placeholder="@instagram user"
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Telegram</FieldTitle>
              <FormField
                onChange={handleChange}
                name="facebook"
                placeholder="@facebook user"
                value={input.facebook}
                style={{ marginBottom: 0 }}
              ></FormField>
            </div>
          </div>
          <div>
            <FormClosingNote>{`To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message`}</FormClosingNote>
            <Divider
              style={{ height: "1px", backgroundColor: "#223052"}}
            />
            <div className="row gy-4 avatar-form-submit-container">
              <div className="col-lg-6 col-12 center-inner-mobile">
                <FormButton className='all-width-mobile' style={{ marginLeft: 0 }} type="submit">
                  Update Profile
                </FormButton>
              </div>
              <div className="col-lg-6 col-12 center-inner-mobile">
                <ClearButton onClick={clearForm}>
                  {" "}
                  <XCircle /> Clear all
                </ClearButton>
              </div>
            </div>
          </div>
        </FormContainer>
      </FormWrapper>
    </div>
  );
};
export default Form;
