import React from "react";
import { Button as BaseButton } from "antd";
import { StyledSubmitButton } from "@styles/styled-components/styledButton";
import Image from "next/image";

type SubmitButtonProps = {
  text?: string;
  isLoading?: boolean;
  onClick?: (event: any) => void;
  type?: number;
  disabled?: boolean;
  background?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  isLoading,
  onClick,
  type,
  disabled,
  background
}: any) => {
  const styles =
    type == 2
      ? {
          width: "150px",
          background: "gray",
          borderRadius: "10px",
        }
      : type == 3
        ? {
            width: "150px",
            borderRadius: "10px",
            background:
              "var(--theme, linear-gradient(180deg, #EA0A8E 0%, #7289DA 100%));",
            gradient: true,
          }
        : {
          background: background,
        };
  return (
    <StyledSubmitButton
      disabled={disabled || isLoading}
      type="submit"
      onClick={onClick}
      {...styles}
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
