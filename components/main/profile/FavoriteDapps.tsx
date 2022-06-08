import { BoxWhiteShadow } from "@styles/styled-components/styledBox";
import {
  DappBox,
  DappHeart,
  DappImg,
  DappName,
  DappWrapper,
  FormTitle,
  ProfileTitle,
} from "@styles/styled-components/styledUser";
import { useEffect, useState } from "react";
import request from "@services/apiService";
const FavoriteDapps = ({ data }: any) => {
  console.log(data);
  const [dapps, setDapps] = useState([
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
    { imgSrc: "/img/ys.jpg", name: "Uniswap V3" },
  ]);

  useEffect(() => {
    (async () => {
      await request
        // .get(`/favorites?populate=user,dapp&filters[user][id][$eq]=${data.id}`)
        .get(`/favorites?populate=user,dapp&filters[user][id][$eq]=5`)
        .then((res) => {
          setDapps(res.data.data.map((dapp: any) => {
            return {
              imgSrc: dapp.attributes.dapp.data.attributes.crawl.icon,
              name: dapp.attributes.dapp.data.attributes.name
            }
          }));       
        });
    })();
  }, []);
  return (
    <div>
      <ProfileTitle>Favorite Dapps</ProfileTitle>
      <div className="row g-4">
        {dapps.map((dapp) => (
          <div className="col-12 col-lg-6 col-xl-4" key={1}>
            <DappBox>
              <DappWrapper>
                <DappImg src={dapp.imgSrc}></DappImg>
                <DappName>{dapp.name}</DappName>
              </DappWrapper>
              <DappHeart src="/img/icons/circled_heart.png"></DappHeart>
            </DappBox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteDapps;
