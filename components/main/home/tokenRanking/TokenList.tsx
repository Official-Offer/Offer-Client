import React, { useState } from 'react';
import { BoxALignCenter_Justify_ItemsCenter, BoxALignCenter_Justify_ItemsEnd, BoxALignItemsCenter, BoxWhiteShadow } from '@styles/styled-components/styledBox';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { formatter } from '@utils/formatCurrency';
import { useRouter } from 'next/router';
import { Select } from 'antd';

const { Option } = Select;

export default function TokenList({ data, setSort, sort }: any) {
    const router = useRouter();
    const [valueSelected, setValueSelected] = useState('');

    const theadList = [
        { tag: 'number', name: '#', sort: false, query: '', },
        { tag: 'token', name: 'Token Name', sort: false, query: '', },
        { tag: 'holder', name: 'Holders', sort: true, query: 'holder', },
        { tag: 'active-address', name: 'Active Address', sort: true, query: 'activeAddress', },
        { tag: 'transfer-volume', name: 'Transfer Volume', sort: true, query: 'transferVolume', },
        { tag: 'transfer-count', name: 'Transfer Count', sort: true, query: 'transferCount', },
        { tag: 'marketcaps', name: 'Market Caps', sort: true, query: 'marketCap', },
    ];

    const listTitleHeaderMobile = [
        { title: 'Holders', sort: true, query: 'holder', },
        { title: 'Active Address', sort: true, query: 'activeAddress', },
        { title: 'Transfer Volume', sort: true, query: 'transferVolume', },
        { title: 'Transfer Count', sort: true, query: 'transferCount', },
        { title: 'Market Caps', sort: true, query: 'marketCap', },
    ];

    const activeItem = (sort: string, query: string) => {
        setSort([query, sort]);
    };
    const handleChangeSelectThead = (value: string) => {
        setValueSelected(value);
        setSort([value, 'desc']);
    };

    return (
        <div className="p-lg-4 p-1">
            <BoxWhiteShadow className="p-lg-4 p-2">
                <table className="main-homepage-tokenranking-table pc">
                    <thead>
                        <tr>
                            {theadList.map((thead, i) => {
                                return (
                                    <th
                                        className={`main-homepage-tokenranking-table-${thead.tag}`}
                                        key={i}
                                    >
                                        <BoxALignCenter_Justify_ItemsCenter className={`${thead.sort && 'justify-content-end'} ${thead.tag}`}>
                                            <span>
                                                {thead.name}
                                            </span>
                                            {thead.sort && <div className="main-homepage-tokenranking-table-sorter">
                                                <div className="main-homepage-tokenranking-table-sorter-inner">
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
                            let holderDiff: string;
                            let activeAddressDiff: string;
                            let transferVolumeDiff: string;
                            let transferCountDiff: string;
                            let marketCapDiff: string;
                            if (token.attributes.holderDiff < 0) {
                                holderDiff = 'decrease';
                            } else {
                                holderDiff = 'increase';
                            }
                            if (token.attributes.activeAddressDiff < 0) {
                                activeAddressDiff = 'decrease';
                            } else {
                                activeAddressDiff = 'increase';
                            }
                            if (token.attributes.transferVolumeDiff < 0) {
                                transferVolumeDiff = 'decrease';
                            } else {
                                transferVolumeDiff = 'increase';
                            }
                            if (token.attributes.transferCountDiff < 0) {
                                transferCountDiff = 'decrease';
                            } else {
                                transferCountDiff = 'increase';
                            }
                            if (token.attributes.marketCapDiff < 0) {
                                marketCapDiff = 'decrease';
                            } else {
                                marketCapDiff = 'increase';
                            }
                            return (
                                <tr key={i} onClick={() => router.push(`/coins/${token.attributes.slug}`)}>
                                    <td className="main-homepage-tokenranking-table-number">{i + 1}</td>
                                    <td className="main-homepage-tokenranking-table-token">
                                        <BoxALignItemsCenter>
                                            <span className="main-homepage-tokenranking-table-logo">
                                                <img src={token.attributes.crawl.icon} alt="" />
                                            </span>
                                            <span className="main-homepage-tokenranking-table-name ms-2">
                                                {`${token.attributes.crawl.name} (${token.attributes.crawl.symbol})`}
                                            </span>
                                            {/* {token.status !== '' && (
                                                <span className="main-homepage-tokenranking-table-status ms-2">
                                                    {token.status}
                                                </span>
                                            )} */}
                                        </BoxALignItemsCenter>
                                    </td>
                                    <td className="main-homepage-tokenranking-table-holder">
                                        <div className="main-homepage-tokenranking-table text-end">
                                            <p>{!token.attributes.holder ? 0 : formatter.format(token.attributes.holder)}</p>
                                        </div>
                                        <p className={`main-homepage-tokenranking-table-${holderDiff} text-end`}>
                                            {token.attributes.holderDiff ?
                                                ((token.attributes.holderDiff) * 100).toFixed(2)
                                                : '0'}% {holderDiff === 'increase' ? "↑" : "↓"}
                                        </p>
                                    </td>
                                    <td className="main-homepage-tokenranking-table-active-address">
                                        <div className="main-homepage-tokenranking-table text-end">
                                            <p>{!token.attributes.activeAddress ? 0 : formatter.format(token.attributes.activeAddress)}</p>
                                        </div>
                                        <p className={`main-homepage-tokenranking-table-${activeAddressDiff} text-end`}>
                                            {token.attributes.activeAddressDiff ?
                                                ((token.attributes.activeAddressDiff) * 100).toFixed(2)
                                                : '0'}% {activeAddressDiff === 'increase' ? "↑" : "↓"}
                                        </p>
                                    </td>
                                    <td className="main-homepage-tokenranking-table-transfer-volume">
                                        <div className="main-homepage-tokenranking-table text-end">
                                            <p>{!token.attributes.transferVolume ? 0 : formatter.format(token.attributes.transferVolume)}</p>
                                        </div>
                                        <p className={`main-homepage-tokenranking-table-${transferVolumeDiff} text-end`}>
                                            {token.attributes.transferVolumeDiff ?
                                                ((token.attributes.transferVolumeDiff) * 100).toFixed(2)
                                                : '0'}% {transferVolumeDiff === 'increase' ? "↑" : "↓"}
                                        </p>
                                    </td>
                                    <td className="main-homepage-tokenranking-table-transfer-volume">
                                        <div className="main-homepage-tokenranking-table text-end">
                                            <p>{!token.attributes.transferCount ? 0 : formatter.format(token.attributes.transferCount)}</p>
                                        </div>
                                        <p className={`main-homepage-tokenranking-table-${transferCountDiff} text-end`}>
                                            {token.attributes.transferCountDiff ?
                                                ((token.attributes.transferCountDiff) * 100).toFixed(2)
                                                : '0'}% {transferCountDiff === 'increase' ? "↑" : "↓"}
                                        </p>
                                    </td>
                                    <td className="main-homepage-tokenranking-table-marketcaps">
                                        <div className="main-homepage-tokenranking-table text-end">
                                            <p>{!token.attributes.marketCap ? 0 : formatter.format(token.attributes.marketCap)}</p>
                                        </div>
                                        <p className={`main-homepage-tokenranking-table-${marketCapDiff} text-end`}>
                                            {token.attributes.marketCapDiff ?
                                                ((token.attributes.marketCapDiff) * 100).toFixed(2)
                                                : '0'}% {marketCapDiff === 'increase' ? "↑" : "↓"}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="main-homepage-tokenranking-table mobile">
                    <div className="main-homepage-tokenranking-table-header">
                        <div className="main-homepage-tokenranking-table-header-item">
                            <span className="main-homepage-tokenranking-table-header-item-title">#</span>
                        </div>
                        <div className="main-homepage-tokenranking-table-header-item">
                            <span className="main-homepage-tokenranking-table-header-item-title">Dapp</span>
                        </div>
                        <div className="main-homepage-tokenranking-table-header-item justify-content-start">
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
                            <div className="main-homepage-tokenranking-table-sorter">
                                <div className="main-homepage-tokenranking-table-sorter-inner">
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
                        let holderDiff: string;
                        let activeAddressDiff: string;
                        let transferVolumeDiff: string;
                        let transferCountDiff: string;
                        let marketCapDiff: string;
                        if (token.attributes.holderDiff < 0) {
                            holderDiff = 'decrease';
                        } else {
                            holderDiff = 'increase';
                        }
                        if (token.attributes.activeAddressDiff < 0) {
                            activeAddressDiff = 'decrease';
                        } else {
                            activeAddressDiff = 'increase';
                        }
                        if (token.attributes.transferVolumeDiff < 0) {
                            transferVolumeDiff = 'decrease';
                        } else {
                            transferVolumeDiff = 'increase';
                        }
                        if (token.attributes.transferCountDiff < 0) {
                            transferCountDiff = 'decrease';
                        } else {
                            transferCountDiff = 'increase';
                        }
                        if (token.attributes.marketCapDiff < 0) {
                            marketCapDiff = 'decrease';
                        } else {
                            marketCapDiff = 'increase';
                        }
                        return (
                            <div className="main-homepage-tokenranking-table-body" key={i}>
                                <div className="main-homepage-tokenranking-table-body-item table-body-item-number">
                                    {/* <img src="/img/icons/tag-ad.png" alt="" /> */}
                                    <span>{i + 1}</span>
                                </div>
                                <div className="main-homepage-tokenranking-table-body-item main-homepage-tokenranking-table-body-item-name">
                                    <div className="row m-0 p-0 justify-content-between w-100">
                                        <div className="col-6">
                                            <BoxALignItemsCenter className="h-100">
                                                <span className="main-homepage-tokenranking-table-logo">
                                                    <img src={token.attributes.crawl.icon} alt="" />
                                                </span>
                                                <span className="main-homepage-tokenranking-table-name ms-2">
                                                    {`${token.attributes.crawl.name} (${token.attributes.crawl.symbol})`}
                                                </span>
                                            </BoxALignItemsCenter>
                                        </div>
                                        <div className="col-6">
                                            <div className="w-100">
                                                <div className="main-homepage-tokenranking-table-body-item-user-number text-end">
                                                    <p>
                                                        {valueSelected === 'activeAddress' ? formatter.format(token.attributes.activeAddress)
                                                            : valueSelected === 'transferVolume' ? formatter.format(token.attributes.transferVolume)
                                                                : valueSelected === 'transferCount' ? formatter.format(token.attributes.transferCount)
                                                                    : valueSelected === 'marketCap' ? formatter.format(token.attributes.marketCap)
                                                                        : formatter.format(token.attributes.holder)}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`main-homepage-tokenranking-table-${valueSelected === 'activeAddress' ? activeAddressDiff
                                                        : valueSelected === 'transferVolume' ? transferVolumeDiff
                                                            : valueSelected === 'transferCount' ? transferCountDiff :
                                                                valueSelected === 'marketCap' ? marketCapDiff : holderDiff} text-end`}
                                                >
                                                    <p className="mb-0">
                                                        {valueSelected === 'activeAddress' ? (
                                                            <>
                                                                {((token.attributes.activeAddressDiff) * 100).toFixed(2)}% {activeAddressDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        ) : valueSelected === 'transferVolume' ? (
                                                            <>
                                                                {((token.attributes.transferVolumeDiff) * 100).toFixed(2)}% {transferVolumeDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        ) : valueSelected === 'transferCount' ? (
                                                            <>
                                                                {((token.attributes.transferCountDiff) * 100).toFixed(2)}% {transferCountDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        ) : valueSelected === 'marketCap' ? (
                                                            <>
                                                                {((token.attributes.marketCapDiff) * 100).toFixed(2)}% {marketCapDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {((token.attributes.holderDiff) * 100).toFixed(2)}% {holderDiff === 'increase' ? "↑" : "↓"}
                                                            </>
                                                        )}
                                                    </p>
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
