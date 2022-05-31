import React, { ReactElement } from 'react';
<<<<<<< HEAD
import { BoxALignCenter_Justify_ItemsBetween, BoxALignItemsCenter, BoxRelativeImage, BoxRelativeImage_1, BoxRelativeImage_2, BoxRelativeImage_3 } from '@styles/styled-components/styledBox';
=======
import { BoxALignCenter_Justify_ItemsBetween, BoxALignItemsCenter, BoxALignItemsCenterNFTItems, BoxRelativeImage, BoxRelativeImage_1, BoxRelativeImage_2, BoxRelativeImage_3 } from '@styles/styled-components/styledBox';
>>>>>>> origin/dev
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
<<<<<<< HEAD
                let imageUrl = asset.metadataNft.imageUrl;
=======
                let imageUrl = asset.metadata.video;
>>>>>>> origin/dev
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
<<<<<<< HEAD
                                href={`${URL_NFT}/token/${asset.metadataNft.nftContractAddress}:${asset.metadataNft.tokenId}`}
=======
                                // href={`${URL_NFT}/token/${asset.item.token}:${asset.item.tokenId}`}
>>>>>>> origin/dev
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
<<<<<<< HEAD
                                                        src={asset.metadataNft.imageUrl}
                                                    />
                                                ) : (
                                                    <img alt="" src={asset.metadataNft.imageUrl} loading="lazy" />
=======
                                                        src={imageUrl}
                                                    />
                                                ) : (
                                                    <img alt="" src={imageUrl} loading="lazy" />
>>>>>>> origin/dev
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
<<<<<<< HEAD
                                    href={`${URL_NFT}/token/${asset.metadataNft.nftContractAddress}:${asset.metadataNft.tokenId}`}
                                >
                                    <Tooltip title={asset.metadataNft.name}>
                                        <a className="fw-bold">{asset.metadataNft.name}</a>
=======
                                    // href={`${URL_NFT}/token/${asset.item.token}:${asset.item.tokenId}`}
                                >
                                    <Tooltip title={asset.metadata.name}>
                                        <a className="fw-bold">{asset.metadata.name}</a>
>>>>>>> origin/dev
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
<<<<<<< HEAD
                                        <BoxALignItemsCenter className="bg-primary rounded p-1 pe-2 ps-2 fw-bold">
=======
                                        <BoxALignItemsCenterNFTItems className="bg-primary rounded p-1 pe-2 ps-2 fw-bold">
>>>>>>> origin/dev
                                            <img src="/img/icons/edtionIcon.svg" alt="" className="edition_icon_home" />
                                            <span className="ms-1 mb-0 text-white fontSize_08" key={i}>
                                                {/* {`${asset.item.sellOrders.reduce((acc, cur) => acc + cur.stock, 0)}/${asset.item.supply}`} */}
                                                1
                                            </span>
<<<<<<< HEAD
                                        </BoxALignItemsCenter>
=======
                                        </BoxALignItemsCenterNFTItems>
>>>>>>> origin/dev
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
<<<<<<< HEAD
                                    href={`${URL_NFT}/user/${asset.owner}`}
                                >
                                    <Tooltip title={`Owner: ${asset.owner.substring(0, 6) + "..." + asset.owner.substring(38)}`}>
                                        <Avatar src={`https://avatars.dicebear.com/v2/jdenticon/${asset.owner}.svg`} className="avatar_ownerImg" style={{ width: "32px", height: "32px", cursor: "pointer" }} />
=======
                                    // href={`${URL_NFT}/user/${asset.item.owners[0]}`}
                                >
                                    <Tooltip title={`Owner: ${asset.item.owners[0].substring(0, 6) + "..." + asset.item.owners[0].substring(38)}`}>
                                        <Avatar src={`https://avatars.dicebear.com/v2/jdenticon/${asset.item.owners[0]}.svg`} className="avatar_ownerImg" style={{ width: "32px", height: "32px", cursor: "pointer" }} />
>>>>>>> origin/dev
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
