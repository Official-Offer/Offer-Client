import React, { FC, useEffect, useState } from "react";
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { ButtonBlue } from "@styles/styled-components/styledButton";
import { useRouter } from "next/router";
import { URL_API, URL_NFTs } from "@config/index";
import NFTLists from "@components/common/NFTLists";
import axios from "axios";
import { SectionHeader } from "@styles/styled-components/styledTabs";

export const NFTExplore: FC = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    // (async () => {
    //   const params = {
    //     limit: 10,
    //     offset: 0,
    //   };
    //   await axios.post(`${URL_API}/items`, params).then((res: any) => {
    //     setData(res.data);
    //   });
    // })();
    (async () => {
      const params = {
        limit: 9,
        offset: 0,
        filter: {
            sellOrders: true,
        }
      };
      await axios.post(`${URL_NFTs}/items`, params).then((res: any) => {
        console.log(res.data)
        setData(res.data.data);
      });
    })();
  }, []);

  return (
    <section className="main-homepage-nftexplore px-lg-3 px-0">
      <SectionHeader>NFTs - Marketplace</SectionHeader>
      <div className="row nft_main_list m-0">
        <NFTLists data={data} />
      </div>
      <BoxALignCenter_Justify_ItemsCenter className="mt-4">
        <ButtonBlue
          className="fw-bold px-5 fontSize_1-3"
          onClick={() => router.push(`/nft-marketplace`)}
        >
          Explore
        </ButtonBlue>
      </BoxALignCenter_Justify_ItemsCenter>
    </section>
  );
};
