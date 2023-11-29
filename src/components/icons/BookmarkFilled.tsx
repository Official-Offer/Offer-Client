import React from "react";
import Image from "next/image";

export const BookmarkFilled: React.FC = () => {
  return (
    <Image
      src="/icons/bookmark-filled.svg"
      alt="bookmarked"
      width={20}
      height={20}
    />
  );
};
