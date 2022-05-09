import React, { FC } from "react";
import { Facebook, Linkedin, Send, Twitter, Youtube } from "react-feather";
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { MediumOutlined } from "@ant-design/icons";
import { IconsCircle } from "@styles/styled-components/styledButton";
import Link from "next/link";

export const FooterHome: FC = () => {
    return (
        <footer id="footer_home">
            <div className="container">
                <div className="row pb-5">
                    <div className="col-lg-5 col-12">
                        <div className="col-2">
                            <img alt="" src="/img/logo_footer.png" className="w-100" />
                        </div>
                        <br />
                        <br />
                        <h3 className="text-green fontSize_1_5_res fw-bold mb-2">
                            Tokenplay
                        </h3>
                        <p className="text-white fontSize_1">
                            Tokenplay is a project of TECHFARM PTE. LTD. <br />
                            Registration No: 202143467E <br />
                            Registered Office: 1 RAFFLES PLACE #40-02 ONE RAFFLES PLACE
                            SINGAPORE (048616)
                        </p>
                        <p className="text-green mt-3 fontSize_1-1">
                            <span className="text-green">
                                <i className="fa fa-paper-plane"></i>
                            </span>
                            <span className="text-white ms-2">contact@tokenplay.app</span>
                        </p>
                    </div>
                    <div className="col-lg-2 col-12 footer_home_pc">
                        <h4 className="fw-bold text-green">About us</h4>
                        <ul className="mt-2" style={{ listStyle: "none" }}>
                            <li>
                                <Link
                                    href="https://tokenplay.medium.com/about-token-play-smart-blockchain-game-ecosystem-74b1c830f64b"
                                    passHref
                                >
                                    <a className="text-white" target="_blank">
                                        About
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://docs.google.com/forms/d/1yaFSKe4T6vh00ncQ0YQOhXq2oJtKBVsbSVmTQFBnCKk/edit"
                                    passHref
                                >
                                    <a className="text-white" target="_blank">
                                        Apply as an Artist
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://tokenplay.app/game-product" passHref>
                                    <a className="text-white" target="_blank">
                                        Play Game
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://nft.tokenplay.app/" passHref>
                                    <a className="text-white" target="_blank">
                                        Marketplace
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://t.me/tokenplaycommunityofficial" passHref>
                                    <a className="text-white" target="_blank">
                                        Channel Community
                                    </a>
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="https://bscscan.com/token/0x728f8d003109d7b895cc5805ffc973de2bad9def" passHref>
                                    <a target="_blank">
                                        <TextDescriptionToggle>Contract</TextDescriptionToggle>
                                    </a>
                                </Link>
                            </li> */}
                            <li>
                                <Link
                                    href="https://docs.google.com/spreadsheets/d/1B6f4T8gOHnf0x3rW6n6K91tilVeqU23I/edit#gid=681877334"
                                    passHref
                                >
                                    <a className="text-white" target="_blank">
                                        How it works
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="col-12 mt-4 mb-5 footer_home_mobile">

                    </div> */}
                    <div className="col-lg-5 col-12">
                        <h4 className="text-white fw-bold">
                            Join Newsletter
                        </h4>
                        <p className="text-white fontSize_1-1" style={{ marginTop: "30px" }}>
                            Subscribe our newsletter to get more free design course and
                            resource
                        </p>
                        <div className="d-flex justify-content-around mt-4">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.facebook.com/TokenPlayStore"
                            >
                                <IconsCircle className="icon_facebook">
                                    <Facebook width={'1.3em'} height={'1.3em'} />
                                </IconsCircle>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.youtube.com/channel/UCx-Cof1NUHy513f9TYY63PQ"
                            >
                                <IconsCircle className="icon_youtube">
                                    <Youtube width={'1.3em'} height={'1.3em'} />
                                </IconsCircle>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://t.me/tokenplaycommunityofficial"
                            >
                                <IconsCircle className="icon_telegram">
                                    <Send width={'1.3em'} height={'1.3em'} />
                                </IconsCircle>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://t.me/tokenplaychannel"
                            >
                                <IconsCircle className="icon_telegram">
                                    <Send width={'1.3em'} height={'1.3em'} />
                                </IconsCircle>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/company/token-play/"
                            >
                                <IconsCircle className="icon_linkedIn">
                                    <Linkedin width={'1.3em'} height={'1.3em'} />
                                </IconsCircle>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://twitter.com/tokenplay2"
                            >
                                <IconsCircle className="icon_twitter">
                                    <Twitter width={'1em'} height={'1em'} />
                                </IconsCircle>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://tokenplay.medium.com/"
                            >
                                <IconsCircle className="icon_dribble">
                                    <MediumOutlined />
                                </IconsCircle>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row pb-5 footer_home_mobile">

                </div>
                <BoxALignCenter_Justify_ItemsCenter className="border_footer_top pt-4 pb-1">
                    <p className="text-white m-0 fw-bold">
                        Copyright © 2021 Tokenplay. All rights reserved
                    </p>
                    {/* <div className="d-flex align-items-center display_none_res415">
            <p className="m-0">We use cookies for better service.</p>{" "}
            &nbsp;&nbsp;&nbsp;
            <button className="btn border-0 text-primary p-0">Accept</button>
          </div> */}
                </BoxALignCenter_Justify_ItemsCenter>
            </div>
            {/* <div className="land" /> */}
        </footer>
    );
};