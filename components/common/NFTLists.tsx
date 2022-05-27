import React, { ReactElement } from 'react';
import { BoxALignCenter_Justify_ItemsBetween, BoxALignItemsCenter, BoxALignItemsCenterNFTItems, BoxRelativeImage, BoxRelativeImage_1, BoxRelativeImage_2, BoxRelativeImage_3 } from '@styles/styled-components/styledBox';
import { ADDRESS_TOP_BSC, URL_NFT } from '@config/index';
import { CurrencyAmountAdapter } from '@utils/chainAdapter';
import { BoxWhiteShadowItem } from '@styles/styled-components/styledBox';
import { Avatar, Tooltip } from 'antd';

export default function NFTLists({ data }: any): ReactElement {
    const currencySwitch = new CurrencyAmountAdapter();

    return (
        <>
            {data && data.map((asset: any, i: number) => {
                const priceAsc = asset.item && asset.item.sellOrders.length > 0 && [...asset.item.sellOrders].sort((a: any, b: any) => ((b.buyToken - a.buyToken) || (a.price - b.price)))[0].price;
                const buyTokenAsc = asset.item && asset.item.sellOrders.length > 0 && [...asset.item.sellOrders].sort((a: any, b: any) => ((b.buyToken - a.buyToken) || (a.price - b.price)))[0].buyToken;
                let imageUrl = asset.metadata.video;
                const imageType = imageUrl.split('.')[3];
                return (
                    <div
                        className="nft_main_item"
                        key={i}
                    >
                        <BoxWhiteShadowItem className="p-3">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                // href={`${URL_NFT}/token/${asset.item.token}:${asset.item.tokenId}`}
                            >
                                <BoxRelativeImage>
                                    <BoxRelativeImage_1>
                                        <BoxRelativeImage_2>
                                            <BoxRelativeImage_3>
                                                {imageType === 'mp4' ? (
                                                    <video
                                                        playsInline={true}
                                                        controls={false}
                                                        autoPlay={true}
                                                        loop={true}
                                                        muted
                                                        className="mw-100"
                                                        controlsList="nodownload"
                                                        poster="/img/frame/poster.png"
                                                        src={imageUrl}
                                                    />
                                                ) : (
                                                    <img alt="" src={imageUrl} loading="lazy" />
                                                )}
                                            </BoxRelativeImage_3>
                                        </BoxRelativeImage_2>
                                    </BoxRelativeImage_1>
                                </BoxRelativeImage>
                            </a>
                            <div className="clear-both"></div>
                            <div className="w-100 card_home_title mt-2">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // href={`${URL_NFT}/token/${asset.item.token}:${asset.item.tokenId}`}
                                >
                                    <Tooltip title={asset.metadata.name}>
                                        <a className="fw-bold">{asset.metadata.name}</a>
                                    </Tooltip>
                                </a>
                            </div>
                            {asset.item && asset.item.sellOrders.length > 0 ? (
                                <>
                                    <BoxALignCenter_Justify_ItemsBetween className="BoxALignCenter_Justify_ItemsBetween mt-2">
                                        <p className="fontSize_09 fw-bold">
                                            <Avatar
                                                src={buyTokenAsc === ADDRESS_TOP_BSC ? currencySwitch.top_logo_currency_amount : currencySwitch.logo_currency_amount}
                                                style={{ width: "25px", height: "25px" }}
                                                className="border_toggle p-1 me-1"
                                            />{priceAsc}<span className="text_description"> {buyTokenAsc === ADDRESS_TOP_BSC ? currencySwitch.top_currency_amount : currencySwitch.currency_amount}</span>
                                        </p>
                                        <BoxALignItemsCenterNFTItems className="bg-primary rounded p-1 pe-2 ps-2 fw-bold">
                                            <img src="/img/icons/edtionIcon.svg" alt="" className="edition_icon_home" />
                                            <span className="ms-1 mb-0 text-white fontSize_08" key={i}>
                                                {/* {`${asset.item.sellOrders.reduce((acc, cur) => acc + cur.stock, 0)}/${asset.item.supply}`} */}
                                                1
                                            </span>
                                        </BoxALignItemsCenterNFTItems>
                                    </BoxALignCenter_Justify_ItemsBetween>
                                </>
                            ) : (
                                <BoxALignCenter_Justify_ItemsBetween className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="text_description fontSize_09 fw-bold">
                                        Not for sale
                                    </p>
                                    {/* <TextWhiteToggle className="mb-0 text_description fontSize_09 fw-bold">
                                        {`${asset.item.supply} editions`}
                                    </TextWhiteToggle> */}
                                </BoxALignCenter_Justify_ItemsBetween>
                            )}
                            <div className="mt-3 mb-3">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // href={`${URL_NFT}/user/${asset.item.owners[0]}`}
                                >
                                    <Tooltip title={`Owner: ${asset.item.owners[0].substring(0, 6) + "..." + asset.item.owners[0].substring(38)}`}>
                                        <Avatar src={`https://avatars.dicebear.com/v2/jdenticon/${asset.item.owners[0]}.svg`} className="avatar_ownerImg" style={{ width: "32px", height: "32px", cursor: "pointer" }} />
                                    </Tooltip>
                                </a>
                            </div>
                        </BoxWhiteShadowItem>
                    </div>
                )
            })}
        </>
    )
}
