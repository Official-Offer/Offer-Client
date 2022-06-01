import { ButtonBlue } from "@styles/styled-components/styledButton";
import {
  FormAvatarContainer,
  AvatarImg,
  FormDescription,
  FormTitle,
  FormWrapper,
  ProfileTitle,
  UploadPhoto,
  FormAvatarImg,
} from "@styles/styled-components/styledUser";

const Form = () => {
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
          <UploadPhoto>Update Photo</UploadPhoto>
        </FormAvatarContainer>
        
      </FormWrapper>
    </div>
  );
};
export default Form;
