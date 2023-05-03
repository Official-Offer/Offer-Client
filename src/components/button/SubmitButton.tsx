import React from "react";
import { Button as BaseButton } from "antd";
import { ButtonProps } from "antd/lib/button";
import { StyledSubmitButton } from "@styles/styled-components/styledButton";
import Image from "next/image";

export type IButton = ButtonProps;

export const SubmitButton: React.FC<IButton> = ({text, isLoading, onClick}: any) => {
  return (
    <StyledSubmitButton
      disabled={isLoading}
      type="submit"
      onClick={onClick}
    >
      {!isLoading ? (
        text
      ) : (
        <div>
          {/* <p>Loading...</p>{" "} */}
          <Image
            className="spinner"
            src="/icons/spinner.svg"
            alt="pankod"
            width="20"
            height="15"
          />
        </div>
      )}
    </StyledSubmitButton>
  );
};
