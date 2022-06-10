import { BoxWhiteShadow } from "@styles/styled-components/styledBox";
import {
  DappBox,
  DappHeart,
  DappImg,
  DappName,
  DappWrapper,
  FormDescription,
  FormTitle,
  ProfileTitle,
} from "@styles/styled-components/styledUser";
import { useEffect, useState } from "react";
import request from "@services/apiService";
const FavoriteDapps = ({ data }: any) => {
  const [dapps, setDapps] = useState([]);

  useEffect(() => {
    (async () => {
      await request
        .get(`/favorites?populate=user,dapp&filters[user][id][$eq]=${data.id}`)
        // .get(`/favorites?populate=user,dapp&filters[user][id][$eq]=5`)
        .then((res) => {
          console.log(res);
          setDapps(
            res.data.data.map((dapp: any) => {
              return {
                imgSrc: dapp.attributes.dapp.data.attributes.crawl.icon,
                name: dapp.attributes.dapp.data.attributes.name,
                url: dapp.attributes.dapp.data.attributes.website,
              };
            })
          );
        });
    })();
  }, []);
  return (
    <div>
      <ProfileTitle>Favorite Dapps</ProfileTitle>
      <FormDescription>
        Here are all dapps that you have previously favorited
      </FormDescription>
      <div className="row g-4">
        {dapps.map((dapp: any) => (
          <div className="col-12 col-lg-6 col-xl-4" key={1}>
            <DappBox onClick={() => window.open(dapp.url)}>
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
