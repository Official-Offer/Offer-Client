import React from "react";
import type { Logo } from "./types";

export const OfferLogo: React.FC<Logo> = ({ width, height, className }) => {
  return (
    <img src="/icons/offer-logo.svg" alt="logo" width={width} height={height} className={className} />
  );
};