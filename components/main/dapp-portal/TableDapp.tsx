import React, { ReactElement, useState } from 'react'
import { CaretDownOutlined, CaretUpOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { BoxALignCenter_Justify_ItemsEnd, BoxALignItemsCenter, BoxWhiteShadow } from '@styles/styled-components/styledBox';
import { useRouter } from 'next/router';
import { Select } from 'antd';

const { Option } = Select;

export default function TableDapp(): ReactElement {
    const router = useRouter();
    const [isSorter, setSorter] = useState(true);

    const listTitleHeader = [
        { title: '#', icon: '', sort: false },
        { title: 'Dapp', icon: '', sort: false },
        { title: 'Category', icon: '', sort: false },
        { title: 'Blockchain', icon: '', sort: false },
        { title: '24hr Users', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
        { title: '24hr Transactions', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
        { title: '24hr Volume', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
        { title: 'Social Signal', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
    ];

    const listTitleHeaderMobile = [
        { title: 'Users', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
        { title: 'Transactions', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
        { title: 'Volume', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
        { title: 'Social Signal', icon: <QuestionCircleOutlined style={{ color: '#000' }} />, sort: true },
    ];

    return (
        <>
            <div className="block-for-pc">
                <BoxWhiteShadow className="p-4">
                    <div className="table-header-outer">
                        <div className="table-header">
                            {listTitleHeader.map((header, i) => {
                                return (
                                    <div className="table-header-item" key={i}>
                                        {header.icon !== '' && header.icon}
                                        <span className="table-header-item-title">{header.title}</span>
                                        {header.sort && (
                                            <div className="table-header-item-sorter">
                                                <div className="table-header-item-sorter-inner">
                                                    <CaretUpOutlined
                                                        className="up"
                                                    />
                                                    <CaretDownOutlined
                                                        className="down"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => {
                        return (
                            <div
                                className="table-body"
                                key={i}
                                onClick={() => {
                                    router.push(`/app/${i}`);
                                }}
                            >
                                <div className="table-body-item table-body-item-number">
                                    <img src="/img/icons/tag-ad.png" alt="" />
                                    <span>2</span>
                                </div>
                                <div className="table-body-item table-body-item-name">
                                    <img className="dapp-logo" src="/img/logo.png" alt="" />
                                    <p>TOKENPLAY</p>
                                </div>
                                <div className="table-body-item table-body-item-category">
                                    <p>High-risk</p>
                                </div>
                                <div className="table-body-item table-body-item-blockchain">
                                    <img src="/img/coin/bnb.png" alt="" />
                                    <p className="ms-2">BNB Chain</p>
                                </div>
                                <div className="table-body-item table-body-item-user">
                                    <div>
                                        <div className="table-body-item-user-number text-end">
                                            <p>0</p>
                                        </div>
                                        <div className="table-body-item-user-decrease text-end">
                                            <p>-100.00% ↓</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-body-item table-body-item-transaction">
                                    <div>
                                        <div className="table-body-item-transaction-number text-end">
                                            <p>0</p>
                                        </div>
                                        <div className="table-body-item-transaction-increase text-end">
                                            <p>100.00% ↑</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-body-item table-body-item-volume">
                                    <div className="table-body-item-volume-bar-top">
                                        <p>$0.00</p>
                                        <p className="table-body-item-volume-bar-top-decrease ms-2">
                                            -100.00% ↓
                                        </p>
                                    </div>
                                    <div className="table-body-item-volume-bar-bottom">

                                    </div>
                                </div>
                                <div className="table-body-item table-body-item-ranking">
                                    <div>
                                        <div className="table-body-item-ranking-social">
                                            <img src="/img/icons/fire.png" alt="" />
                                            <span>10,000</span>
                                        </div>
                                        <div className="table-body-item-ranking-increase text-end">
                                            <p>100.00% ↑</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </BoxWhiteShadow>
            </div>
            <div className="block-for-mobile">
                <div className="table-header-outer">
                    <div className="table-header">
                        <div className="table-header-item">
                            <span className="table-header-item-title">#</span>
                        </div>
                        <div className="table-header-item">
                            <span className="table-header-item-title">Dapp</span>
                        </div>
                        <div className="table-header-item justify-content-start">
                            <Select
                                defaultValue={`${listTitleHeaderMobile[0].title}`}
                                style={{ width: '70%' }}
                            >
                                {listTitleHeaderMobile.map((header, i) => {
                                    return (
                                        <Option value={header.title} key={i}>
                                            {header.title}
                                        </Option>
                                    )
                                })}
                            </Select>
                            {isSorter && (
                                <div className="table-header-item-sorter">
                                    <div className="table-header-item-sorter-inner">
                                        <CaretUpOutlined
                                            className="up"
                                        />
                                        <CaretDownOutlined
                                            className="down"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => {
                    return (
                        <div className="table-body" key={i}>
                            <div className="table-body-item table-body-item-number">
                                <img src="/img/icons/tag-ad.png" alt="" />
                                <span>2</span>
                            </div>
                            <div className="table-body-item table-body-item-name">
                                <div className="row m-0 p-0">
                                    <div className="col-5">
                                        <BoxALignItemsCenter className="h-100">
                                            <img className="dapp-logo" src="/img/logo.png" alt="" />
                                            <p>TOKENPLAY</p>
                                        </BoxALignItemsCenter>
                                    </div>
                                    <div className="col-5">
                                        <div className="w-100">
                                            <div className="table-body-item-user-number text-end">
                                                <p>0</p>
                                            </div>
                                            <div className="table-body-item-user-decrease text-end">
                                                <p>-100.00% ↓</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="w-100">
                                            <BoxALignCenter_Justify_ItemsEnd>
                                                <img className="blockchain-logo" src="/img/coin/bnb-white.png" alt="" />
                                            </BoxALignCenter_Justify_ItemsEnd>
                                            <BoxALignCenter_Justify_ItemsEnd>
                                                <img className="blockchain-logo" src="/img/icons/icn-gambling.png" alt="" />
                                            </BoxALignCenter_Justify_ItemsEnd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
