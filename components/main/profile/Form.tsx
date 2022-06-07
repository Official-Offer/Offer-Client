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
  UploadButton,
} from "@styles/styled-components/styledUser";
import { Field } from "rc-field-form";
import useForm from "@utils/hook/useForm";
import { BoxALignCenter_Justify_ItemsBetween } from "@styles/styled-components/styledBox";
import { Divider } from "antd";
import { XCircle } from "react-feather";
import request from "@services/apiSSO";
import { URL_API_IMG, URL_API_SSO } from "@config/dev.config";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { notification } from "antd";
const Form = ({ data, reload, setReload }: any) => {
  const { input, handleChange, resetForm, clearForm, clearFormFields }: any =
    useForm({
      ...data,
    });
  const token = Cookies.get("accessToken");
  const [avatar, setAvatar] = useState(data.avatar); //upload base64
  const [uploadAvatarFile, setUploadAvatarFile] = useState<any>(); //raw file
  const router = useRouter();
  useEffect(() => {
    if (!uploadAvatarFile) {
      setAvatar(data.avatar);
      return;
    }
    const avatarURL = URL.createObjectURL(uploadAvatarFile);
    setAvatar(avatarURL);
    return () => URL.revokeObjectURL(avatarURL);
  }, [uploadAvatarFile]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(input);
    const resData = await request
      .put(`users/${data.id}`, input)
      .then(async () => {
        if (uploadAvatarFile) {
          const formData = new FormData();
          formData.append("file", uploadAvatarFile);
          const resAvatar = await request.post(`users/uploadAvatar`, formData);
        }
      })
      .then(onSuccessfullyEdit)
      .catch(onFailedEdit);
    // if avatar is uploaded, post it too.
  };

  const onSelectImage = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadAvatarFile(undefined);
      return;
    }
    // console.log(e.target.files[0]);
    setUploadAvatarFile(e.target.files[0]);
  };

  const onSuccessfullyEdit = (err: any) => {
    console.log(err);
    notification.open({
      message: "Success 🥳",
      description:
        "Your info has been successfully updated! \nReload to see full changes",
      duration: 3,
    });
  };

  const onFailedEdit = () => {
    notification.open({
      message: "Error 🤢",
      description: "Error, try again.",
      duration: 3,
    });
  };

  const onClearForm = () => {
    const nullField = [
      "facebook",
      "website",
      "twitter",
      "telegram",
      "instagram",
      "bio",
    ];
    clearFormFields(nullField);
  };

  return (
    <div>
      <ProfileTitle> Profile Settings </ProfileTitle>
      <FormDescription>
        You can set preferred display name, create your profile URL and manage
        other personal settings.
      </FormDescription>
      <FormWrapper>
        <FormContainer
          onSubmit={onSubmit}
        >
          <FormTitle>Edit Profile</FormTitle>
          <FormAvatarContainer className="row">
            <Container className="col-lg-3 col-12">
              <FormAvatarImg src={avatar || data.avatar || "/img/austin.png"} />
            </Container>
            <Container className="col-lg-6 col-12 px-4">
              {/* <UploadButton placeholder="Update Photo" type='file' accept="image/*"/> */}
              <UploadButton>
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onSelectImage}
                ></input>
              </UploadButton>
            </Container>
          </FormAvatarContainer>
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
                name="website"
                placeholder="Enter URL"
                value={input.website}
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
            <Divider style={{ height: "1px", backgroundColor: "#223052" }} />
            <div className="row gy-4 avatar-form-submit-container">
              <div className="col-lg-6 col-12 center-inner-mobile">
                <FormButton
                  className="all-width-mobile"
                  style={{ marginLeft: 0 }}
                  type="submit"
                >
                  Update Profile
                </FormButton>
              </div>
            </div>
          </div>
        </FormContainer>
      </FormWrapper>
    </div>
  );
};
export default Form;
