import React, { ReactElement } from 'react';
import { BoxALignCenter_Justify_ItemsBetween } from '@styles/styled-components/styledBox';
import { Select } from 'antd';
import { listCategory } from './TabsCategory';

const { Option } = Select;

export default function TabsChain(): ReactElement {

    const listBlockchain = [
        { name: 'All', tag: 'all', icon: '', icon_white: '' },
        { name: 'Ethereum', tag: 'eth', icon: '/img/coin/eth.png', icon_white: '/img/coin/eth-white.png' },
        { name: 'BNB Chain', tag: 'bnb', icon: '/img/coin/bnb.png', icon_white: '/img/coin/bnb-white.png' },
        { name: 'Polygon (Matic)', tag: 'matic', icon: '/img/coin/matic.png', icon_white: '/img/coin/matic-white.png' },
        { name: 'TRON', tag: 'tron', icon: '/img/coin/tron.png', icon_white: '/img/coin/tron-white.png' },
    ];

    return (
        <>
            <div className="tab-bar-combination flex-for-pc">
                {listBlockchain.map((blockchain, i) => {
                    return (
                        <button
                            className="tab-bar-combination-item"
                            key={i}
                        >
                            {/* {i != 0 && <div className="divider" />} */}
                            <div
                                className={`tab-bar-combination-item-blockchain ${blockchain.tag} ${i == 0 && 'active'}`}
                            >
                                <div className={`fill-background ${blockchain.tag}`} />
                                {blockchain.icon !== "" && blockchain.icon_white !== "" && (
                                    <>
                                        <img className="icon" src={blockchain.icon} alt="" />
                                        <img className="icon-white" src={blockchain.icon_white} alt="" />
                                    </>
                                )}
                                <span>{blockchain.name}</span>
                            </div>
                        </button>
                    )
                })}
            </div>
            <div className="tab-bar-combination flex-for-mobile">
                <BoxALignCenter_Justify_ItemsBetween className="w-100">
                    <Select defaultValue="all" style={{ width: '45%' }}>
                        {listBlockchain.map((blockchain, i) => {
                            return (
                                <Option value={blockchain.tag} key={i}>
                                    {i == 0 ? (
                                        <>
                                            {`${blockchain.name} Blockchains`}
                                        </>
                                    ) : (
                                        <>
                                            {blockchain.name}
                                        </>
                                    )}
                                </Option>
                            )
                        })}
                    </Select>
                    <Select className="ms-2" defaultValue="all" style={{ width: '45%' }}>
                        {listCategory.map((category, i) => {
                            return (
                                <Option value={category.tag} key={i}>
                                    {i == 0 ? (
                                        <>
                                            {`${category.name} Categories`}
                                        </>
                                    ) : (
                                        <>
                                            {category.name}
                                        </>
                                    )}
                                </Option>
                            )
                        })}
                    </Select>
                </BoxALignCenter_Justify_ItemsBetween>
            </div>
        </>
    );
};
