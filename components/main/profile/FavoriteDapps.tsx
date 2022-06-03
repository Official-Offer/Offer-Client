import { BoxWhiteShadow } from "@styles/styled-components/styledBox";
import {
  DappBox,
  DappImg,
  FormTitle,
  ProfileTitle,
} from "@styles/styled-components/styledUser";
import { useState } from "react";
const FavoriteDapps = () => {
  const [dapps, setDapps] = useState([
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
  ]);
  return (
    <div>
      <ProfileTitle>Favorite Dapps</ProfileTitle>
      <div className="row g-4">
        {dapps.map((dapp) => (
          <div className="col-12 col-xl-4" key={1}>
            <DappBox className="row">
              <DappImg className="col-2 col-lg-3" src={dapp.imgSrc}></DappImg>
              <p className="col-3">{dapp.name}</p>
            </DappBox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteDapps;
