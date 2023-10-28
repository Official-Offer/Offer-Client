import React from "react";
import Link from "next/link";
import Image from "next/image";
import { StyledNotiBox } from "@styles/styled-components/styledBox";

type NotiBoxProps = {
  large: boolean,
  read: boolean,
  hasDot: boolean,
  content: HTMLDivElement,
}

export const NotiBox: React.FC<NotiBoxProps> = ({ large, read, hasDot, content }) => {
  return (
    <StyledNotiBox large={large} read={read}>
      <Image className="avatar" width={48} height={48} src="/images/avatar.png" alt="avatar" />
      <div className="preview">
        <Link className="preview-link" href="/student/notifications"><div className="preview-link"></div></Link>
        {content}
      </div>
      {hasDot && <div className="dot" />}
    </StyledNotiBox>
  );
}
