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
} from "@styles/styled-components/styledUser";
import { Field } from "rc-field-form";
import useForm from "@utils/hook/useForm";
import { BoxALignCenter_Justify_ItemsBetween } from "@styles/styled-components/styledBox";
import { Divider } from "antd";
import { XCircle } from "react-feather";

const Form = () => {
  const { input, handleChange, resetForm } = useForm({
    displayName: "",
    customURL: "",
    bio: "",
    portfolio: "",
    twitter: "",
    telegram: "",
    instagram: "",
    facebook: "",
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
        <FormAvatarContainer>
          <FormAvatarImg src="/img/ys.jpg"></FormAvatarImg>
          <FormButton className="px-4">Update Photo</FormButton>
        </FormAvatarContainer>
        <FormContainer>
          <FormTitle>Account Info</FormTitle>
          <br />
          <div className="row">
            <div className="col-12">
              <FieldTitle>Display Name</FieldTitle>
              <FormField
                onChange={handleChange}
                name="displayName"
                placeholder="Enter your display name"
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Custom URL</FieldTitle>
              <FormField  onChange={handleChange}
                  name="customURL"
                  placeholder="ui8.next/Your custom URL"></FormField>
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
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Telegram</FieldTitle>
              <FormField
                onChange={handleChange}
                name="telegram"
                placeholder="@telegram user"
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Instagram</FieldTitle>
              <FormField
                onChange={handleChange}
                name="instagram"
                placeholder="@instagram user"
              ></FormField>
            </div>
            <div className="col-12">
              <FieldTitle>Telegram</FieldTitle>
              <FormField
                onChange={handleChange}
                name="facebook"
                placeholder="@facebook user"
                style={{ marginBottom: 0 }}
              ></FormField>
            </div>
          </div>
        </FormContainer>
        <FormClosingNote>{`To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message`}</FormClosingNote>
        <Divider
          style={{ height: "1px", backgroundColor: "#223052", margin: 0 }}
        />
        <div>
          <FormButton style={{ marginLeft: 0 }}>Update Profile</FormButton>
          <ClearButton>
            {" "}
            <XCircle /> Clear all
          </ClearButton>
        </div>
      </FormWrapper>
    </div>
  );
};
export default Form;
