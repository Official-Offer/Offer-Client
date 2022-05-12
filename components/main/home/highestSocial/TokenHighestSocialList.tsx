import React, { useState } from 'react';
import { BoxALignCenter_Justify_ItemsCenter, BoxALignCenter_Justify_ItemsEnd, BoxALignItemsCenter, BoxWhiteShadow } from '@styles/styled-components/styledBox';
import { isExistAndFormatCurrency, formatter } from '@utils/formatCurrency';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useRouter } from 'next/router';

const { Option } = Select;

export default function TokenHighestSocialList({ data, setSort, sort }: any) {
    const router = useRouter();
    const [valueSelected, setValueSelected] = useState(sort[0]);

    const theadList = [
        { tag: 'number', name: '#', sort: false, query: '', },
        { tag: 'dapp', name: 'Dapp', sort: false, query: '', },
        { tag: 'category', name: 'Category', sort: false, query: '', },
        { tag: 'blockchain', name: 'Blockchain', sort: false, query: '', },
        { tag: '24users', name: '24hr Users', sort: true, query: 'dailyUser', },
        { tag: '24transactions', name: '24hr Transactions', sort: true, query: 'dailyTransaction', },
        { tag: '24volume', name: '24hr Volume', sort: true, query: 'dailyVolume', },
        { tag: 'social', name: 'Social Signal', sort: true, query: 'socialSignal', },
    ];

    const listTitleHeaderMobile = [
        { title: 'Social Signal', sort: true, query: 'socialSignal', },
        { title: 'Users', sort: true, query: 'dailyUser', },
        { title: 'Transactions', sort: true, query: 'dailyTransaction', },
        { title: 'Volume', sort: true, query: 'dailyVolume', },
    ];

    const activeItem = (sort: string, query: string) => {
        setSort([query, sort]);
    };
    const handleChangeSelectThead = (value: string) => {
        setValueSelected(value);
        setSort([value, 'desc']);
    };

    return (
        <div className="py-lg-4 px-lg-2 p-1">
            <BoxWhiteShadow className="p-lg-4 p-2">
                <table className="main-homepage-highestsocial-table pc">
                    <thead>
                        <tr>
                            {theadList.map((thead, i) => {
                                return (
                                    <th
                                        className={`main-homepage-highestsocial-table-${thead.tag}`}
                                        key={i}
                                    >
                                        <BoxALignCenter_Justify_ItemsCenter
                                            className={`${thead.tag === '24users' ? 'justify-content-end' :
                                                thead.tag === '24transactions' ? 'justify-content-end' :
                                                    thead.tag === 'social' ? 'justify-content-end' :
                                                        thead.tag === 'dapp' ? 'justify-content-start' : ''
                                                }`}
                                        >
                                            <span>{thead.name}</span>
                                            {thead.sort && <div className="main-homepage-highestsocial-table-sorter">
                                                <div className="main-homepage-highestsocial-table-sorter-inner">
                                                    <CaretUpOutlined
                                                        className={`up ${sort[0] === thead.query && sort[1] === 'asc' ? 'active' : ''}`}
                                                        onClick={() => activeItem('asc', thead.query)}
                                                    />
                                                    <CaretDownOutlined
                                                        className={`down ${sort[0] === thead.query && sort[1] === 'desc' ? 'active' : ''}`}
                                                        onClick={() => activeItem('desc', thead.query)}
                                                    />
                                                </div>
                                            </div>}
                                        </BoxALignCenter_Justify_ItemsCenter>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((token: any, i: number) => {
                            let usds_24hr = token.attributes.crawl.usds_24h;
                            let userDiff: string;
                            let transactionsDiff: string;
                            let volumeDiff: string;
                            let socialSignalDiff: string;
                            if (token.attributes.dailyUserDiff < 0) {
                                userDiff = 'decrease';
                            } else {
                                userDiff = 'increase';
                            }
                            if (token.attributes.dailyTransactionDiff < 0) {
                                transactionsDiff = 'decrease';
                            } else {
                                transactionsDiff = 'increase';
                            }
                            if (token.attributes.dailyVolumeDiff < 0) {
                                volumeDiff = 'decrease';
                            } else {
                                volumeDiff = 'increase';
                            }
                            if (token.attributes.crawl.social_signal_gr < 0) {
                                socialSignalDiff = 'decrease';
                            } else {
                                socialSignalDiff = 'increase';
                            }
                            return (
                                <tr key={i} onClick={() => router.push(`/app/${token.attributes.slug}`)}>
                                    <td className="main-homepage-highestsocial-table-number">{i + 1}</td>
                                    <td className="main-homepage-highestsocial-table-dapp">
                                        <BoxALignItemsCenter>
                                            <img src={token.attributes.crawl.icon} alt={''} />
                                            <span className="ms-2">{token.attributes.crawl.name}</span>
                                        </BoxALignItemsCenter>
                                    </td>
                                    <td className="main-homepage-highestsocial-table-category">
                                        <span>
                                            {token.attributes.category.data.attributes.name}
                                        </span>
                                    </td>
                                    <td className="main-homepage-highestsocial-table-blockchain">
                                        <BoxALignCenter_Justify_ItemsCenter>
                                            <img src={token.attributes.chain.data.attributes.crawl.color_icon} alt={token.attributes.chain.data.attributes.crawl.slug} />
                                            <span className="ms-2">{token.attributes.chain.data.attributes.crawl.name}</span>
                                        </BoxALignCenter_Justify_ItemsCenter>
                                    </td>
                                    <td className="main-homepage-highestsocial-table-24users">
                                        <div className="main-homepage-highestsocial-table text-end">
                                            <p>{token.attributes.dailyUser}</p>
                                        </div>
                                        <div className={`main-homepage-highestsocial-table-${userDiff} text-end`}>
                                            <p>{((token.attributes.dailyUserDiff) * 100).toFixed(2)}% {userDiff === 'increase' ? "↑" : "↓"}</p>
                                        </div>
                                    </td>
                                    <td className="main-homepage-highestsocial-table-24transactions">
                                        <div className="main-homepage-highestsocial-table text-end">
                                            <p>{token.attributes.dailyTransaction}</p>
                                        </div>
                                        <div className={`main-homepage-highestsocial-table-${transactionsDiff} text-end`}>
                                            <p>{((token.attributes.dailyTransactionDiff) * 100).toFixed(2)}% {transactionsDiff === 'increase' ? "↑" : "↓"}</p>
                                        </div>
                                    </td>
                                    <td className="main-homepage-highestsocial-table-24volume">
                                        <div className="main-homepage-highestsocial-table-24volume-bar-top">
                                            <p>${formatter.format(token.attributes.dailyVolume)}</p>
                                            <div className={`main-homepage-highestsocial-table-${volumeDiff} ms-3`}>
                                                <p>
                                                    {((token.attributes.dailyVolumeDiff) * 100).toFixed(2)}% {volumeDiff === 'increase' ? "↑" : "↓"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="main-homepage-highestsocial-table-24volume-bar-bottom">
                                            {usds_24hr.length == 2 ? (
                                                <>
                                                    <div
                                                        className="volume-bar"
                                                        style={{ width: `${usds_24hr[0].ratio == 0 ? '10%' : `${((usds_24hr[0].ratio) * 100).toFixed(1)}%`}` }}
                                                    />
                                                    <div
                                                        className="volume-bar"
                                                        style={{ width: `${`${((usds_24hr[1].ratio) * 100).toFixed(1)}%`}` }}
                                                    />
                                                </>
                                            ) : usds_24hr.length == 3 ? (
                                                <>
                                                    <div
                                                        className="volume-bar"
                                                        style={{ width: `${usds_24hr[0].ratio == 0 ? '10%' : `${((usds_24hr[0].ratio) * 100).toFixed(1)}%`}` }}
                                                    />
                                                    <div
                                                        className="volume-bar"
                                                        style={{ width: `${`${((usds_24hr[1].ratio) * 100).toFixed(1)}%`}` }}
                                                    />
                                                    <div
                                                        className="volume-bar"
                                                        style={{ width: `${`${((usds_24hr[2].ratio) * 100).toFixed(1)}%`}` }}
                                                    />
                                                </>
                                            ) : (
                                                <div className="volume-bar" style={{ width: `100%` }} />
                                            )}
                                        </div>
                                        <div className="main-homepage-highestsocial-table-24volume-price-combine">
                                            <div className="main-homepage-highestsocial-table-24volume-unit-column">
                                                {usds_24hr.map((volume: any, index: number) => {
                                                    return (
                                                        <span key={index}>
                                                            {`$${formatter.format(volume.usd)} ${volume.token}`}
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="main-homepage-highestsocial-table-social">
                                        <div>
                                            <BoxALignCenter_Justify_ItemsEnd>
                                                {token.attributes.crawl.social_top100 && <img src="/img/icons/fire.png" alt="" />}
                                                <span className="ms-1">
                                                    {isExistAndFormatCurrency(token.attributes.crawl.social_signal, 0)}
                                                </span>
                                            </BoxALignCenter_Justify_ItemsEnd>
                                            <div className={`main-homepage-highestsocial-table-${socialSignalDiff} text-end`}>
                                                <p>
                                                    {((token.attributes.crawl.social_signal_gr) * 100).toFixed(2)}% {socialSignalDiff === 'increase' ? "↑" : "↓"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="main-homepage-highestsocial-table mobile">
                    <div className="main-homepage-highestsocial-table-header">
                        <div className="main-homepage-highestsocial-table-header-item">
                            <span className="main-homepage-highestsocial-table-header-item-title">#</span>
                        </div>
                        <div className="main-homepage-highestsocial-table-header-item">
                            <span className="main-homepage-highestsocial-table-header-item-title">Dapp</span>
                        </div>
                        <div className="main-homepage-highestsocial-table-header-item justify-content-start">
                            <Select
                                defaultValue={`${listTitleHeaderMobile[0].title}`}
                                onChange={handleChangeSelectThead}
                                style={{ width: '90%' }}
                            >
                                {listTitleHeaderMobile.map((header, i) => {
                                    return (
                                        <Option value={header.query} key={i}>
                                            {header.title}
                                        </Option>
                                    )
                                })}
                            </Select>
                            <div className="main-homepage-highestsocial-table-sorter">
                                <div className="main-homepage-highestsocial-table-sorter-inner">
                                    <CaretUpOutlined
                                        className={`up ${sort[1] === 'asc' ? 'active' : ''}`}
                                        onClick={() => activeItem('asc', valueSelected)}
                                    />
                                    <CaretDownOutlined
                                        className={`down ${sort[1] === 'desc' ? 'active' : ''}`}
                                        onClick={() => activeItem('desc', valueSelected)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {data.map((token: any, i: number) => {
                        let usds_24hr = token.attributes.crawl.usds_24h;
                        let userDiff: string;
                        let transactionsDiff: string;
                        let volumeDiff: string;
                        let socialSignalDiff: string;
                        if (token.attributes.dailyUserDiff < 0) {
                            userDiff = 'decrease';
                        } else {
                            userDiff = 'increase';
                        }
                        if (token.attributes.dailyTransactionDiff < 0) {
                            transactionsDiff = 'decrease';
                        } else {
                            transactionsDiff = 'increase';
                        }
                        if (token.attributes.dailyVolumeDiff < 0) {
                            volumeDiff = 'decrease';
                        } else {
                            volumeDiff = 'increase';
                        }
                        if (token.attributes.crawl.social_signal_gr < 0) {
                            socialSignalDiff = 'decrease';
                        } else {
                            socialSignalDiff = 'increase';
                        }
                        return (
                            <div className="main-homepage-highestsocial-table-body" key={i}>
                                <div className="main-homepage-highestsocial-table-body-item table-body-item-number">
                                    {/* <img src="/img/icons/tag-ad.png" alt="" /> */}
                                    <span>{i + 1}</span>
                                </div>
                                <div className="main-homepage-highestsocial-table-body-item main-homepage-highestsocial-table-body-item-name">
                                    <div className="row m-0 p-0 justify-content-between w-100">
                                        <div className="col-5">
                                            <BoxALignItemsCenter className="h-100">
                                                <img className="dapp-logo" src={token.attributes.crawl.icon} alt={''} />
                                                <span className="ms-2">{token.attributes.crawl.name}</span>
                                            </BoxALignItemsCenter>
                                        </div>
                                        <div className="col-5">
                                            <div className="w-100">
                                                <div className="main-homepage-highestsocial-table-body-item-user-number text-end">
                                                    <p>
                                                        {valueSelected === 'dailyTransaction' ? token.attributes.dailyTransaction
                                                            : valueSelected === 'dailyVolume' ? `$${formatter.format(token.attributes.dailyVolume)}`
                                                                : valueSelected === 'socialSignal' ? (
                                                                    <>
                                                                        {token.attributes.crawl.social_top100 && <img src="/img/icons/fire.png" alt="" />}
                                                                        <span className="ms-1">
                                                                            {isExistAndFormatCurrency(token.attributes.crawl.social_signal, 0)}
                                                                        </span>
                                                                    </>
                                                                ) : token.attributes.dailyUser}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`main-homepage-highestsocial-table-${valueSelected === 'dailyTransaction' ? transactionsDiff
                                                        : valueSelected === 'dailyVolume' ? volumeDiff
                                                            : valueSelected === 'socialSignal' ? socialSignalDiff : userDiff} text-end`}
                                                >
                                                    <p className="mb-0">
                                                        {valueSelected === 'dailyTransaction' ? (
                                                            <>
                                                                {((token.attributes.dailyTransactionDiff) * 100).toFixed(2)}% {transactionsDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        ) : valueSelected === 'dailyVolume' ? (
                                                            <>
                                                                {((token.attributes.dailyVolumeDiff) * 100).toFixed(2)}% {volumeDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        ) : valueSelected === 'socialSignal' ? (
                                                            <>
                                                                {((token.attributes.crawl.social_signal_gr) * 100).toFixed(2)}% {socialSignalDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {((token.attributes.dailyUserDiff) * 100).toFixed(2)}% {userDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="w-100">
                                                <BoxALignCenter_Justify_ItemsEnd>
                                                    <img className="blockchain-logo" src={token.attributes.crawl.chains[0].icon_new} alt="" />
                                                </BoxALignCenter_Justify_ItemsEnd>
                                                <BoxALignCenter_Justify_ItemsEnd>
                                                    <img className="blockchain-logo" src={token.attributes.crawl.category.icon} alt="" />
                                                </BoxALignCenter_Justify_ItemsEnd>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <div className="main-homepage-highestsocial-table-24volume-bar-bottom">
                                                {usds_24hr.length == 2 ? (
                                                    <>
                                                        <div
                                                            className="volume-bar"
                                                            style={{ width: `${usds_24hr[0].ratio == 0 ? '10%' : `${((usds_24hr[0].ratio) * 100).toFixed(1)}%`}` }}
                                                        />
                                                        <div
                                                            className="volume-bar"
                                                            style={{ width: `${`${((usds_24hr[1].ratio) * 100).toFixed(1)}%`}` }}
                                                        />
                                                    </>
                                                ) : usds_24hr.length == 3 ? (
                                                    <>
                                                        <div
                                                            className="volume-bar"
                                                            style={{ width: `${usds_24hr[0].ratio == 0 ? '10%' : `${((usds_24hr[0].ratio) * 100).toFixed(1)}%`}` }}
                                                        />
                                                        <div
                                                            className="volume-bar"
                                                            style={{ width: `${`${((usds_24hr[1].ratio) * 100).toFixed(1)}%`}` }}
                                                        />
                                                        <div
                                                            className="volume-bar"
                                                            style={{ width: `${`${((usds_24hr[2].ratio) * 100).toFixed(1)}%`}` }}
                                                        />
                                                    </>
                                                ) : (
                                                    <div className="volume-bar" style={{ width: `100%` }} />
                                                )}
                                            </div>
                                            <div className="main-homepage-highestsocial-table-24volume-price-combine">
                                                <div className="main-homepage-highestsocial-table-24volume-unit-column">
                                                    {usds_24hr.map((volume: any, index: number) => {
                                                        return (
                                                            <span key={index}>
                                                                {`$${formatter.format(volume.usd)} ${volume.token}`}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </BoxWhiteShadow>
        </div>
    );
};
