import React, { FC, useEffect, useState } from 'react';
import { BoxALignCenter_Justify_ItemsCenter } from '@styles/styled-components/styledBox';
import { ButtonBlue } from '@styles/styled-components/styledButton';
import { useRouter } from 'next/router';
import { URL_API } from '@config/index';
import NFTLists from '@components/common/NFTLists';
import axios from 'axios';

export const NFTExplore: FC = () => {
    const router = useRouter();
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const params = {
                limit: 10,
                offset: 0
            };
            await axios.post(`${URL_API}/items`, params).then((res: any) => {
                setData(res.data);
            });
        })();
    }, []);

    return (
        <section className="main-homepage-nftexplore px-lg-3 px-0">
            <h2>NFTs - Marketplace</h2>
            <div className="row nft_main_list m-0">
                <NFTLists
                    data={data}
                />
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
