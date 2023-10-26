import React from 'react';
import { OfferLogo } from '@components/icons/OfferLogo';

export const LoadingPage: React.FC = () => {
  return (
    <div className="layout-fullscreen center">
      <div className="flip-3d-wrapper">
        <OfferLogo width={100} height={100} className="flip-infinite"/>
      </div>
      <h2>Vui lòng đợi...</h2>
    </div>
  )
}