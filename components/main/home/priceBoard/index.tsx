import React, { FC, useEffect, useState } from 'react';
import { Empty, Tabs } from 'antd';
import { Button } from '@styles/styled-components/styledButton';
import TokenList from './TokenList';
import request from '@services/apiService';
import * as qs from 'qs';
import { SectionHeader } from '@styles/styled-components/styledTabs';

const { TabPane } = Tabs;

export const PriceBoard: FC = () => {
    const [tokenList, setTokenList] = useState([]);
    const [viewMore, setNumberViewMore] = useState(10);
    const [sort, setSort] = useState(['holder', 'desc']);

    useEffect(() => {
        (async () => {
            const query = qs.stringify({
                // populate: '*',
                pagination: {
                    page: 1,
                    pageSize: viewMore,
                },
                sort: [`${sort[0]}:${sort[1]}`]
            }, {
                encodeValuesOnly: true,
            });
            await request.get(`/tokens?${query}`).then((res) => {
                setTokenList(res.data.data);
            })
        })();
    }, [viewMore, sort]);

    const onChangeTab = (key: any) => {
        //
    };
    const category = [
        { tab: 'Cryptocurrencies', key: 'Cryptocurrencies' },
        { tab: 'DeFi', key: 'defi' },
        { tab: 'NFT', key: 'nft' },
        { tab: 'Metaverse', key: 'metaverse' },
        { tab: 'Polkadot', key: 'polkadot' },
        { tab: 'BNB Chain', key: 'bnb' },
        { tab: 'Solana', key: 'solana' },
        { tab: 'Avalanche', key: 'avalanche' },
    ];

    return (
        <section className="main-homepage-tokenranking px-lg-3 px-0">
            <SectionHeader>Price Board</SectionHeader>
            {/* <Tabs
                    defaultActiveKey={"crypto"}
                    onChange={onChangeTab}
                    animated={false}
                    tabBarGutter={1}
                >
                    {category.map((e, i) => {
                        return (
                            <TabPane tab={e.tab} key={e.key}>
                            </TabPane>
                        )
                    })}
                </Tabs> */}
            <TokenList data={tokenList} setSort={setSort} sort={sort} />
            <br />
            <div className="text-center">
                <Button
                    className="text-green fw-bold fontSize_1-1"
                    onClick={() => {
                        setNumberViewMore(viewMore + 10)
                    }}
                >
                    View more
                </Button>
            </div>
        </section>
    );
};
