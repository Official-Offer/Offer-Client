import { FacebookFilled, TwitterOutlined, UserOutlined, YoutubeFilled } from '@ant-design/icons';
import { BoxALignCenter_Justify_ItemsBetween, BoxALignItemsCenter, BoxAlignItemsEnd_FlexColumn, BoxALignItemsStart, BoxBlueBold, BoxBlueBorderRounded, BoxWhiteShadow } from '@styles/styled-components/styledBox';
import { Button, ButtonBorderBlueTransparent, ButtonBlue } from '@styles/styled-components/styledButton';
import { File, Heart, MessageSquare, Share2, User } from 'react-feather';
import { TabMain, TabMain_Sub } from '@styles/styled-components/styledTabs';
import { useRouter } from 'next/router';
import { Avatar, Rate } from 'antd';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const BlockchainDetails: NextPage = () => {
    const router = useRouter();
    const AppStatistical = dynamic(() => import("@components/main/app").then((mod: any) => mod.AppStatistical));
    const SplineChart = dynamic(() => import("@components/main/app").then((mod: any) => mod.SplineChart));
    const AppSlide = dynamic(() => import("@components/main/app").then((mod: any) => mod.AppSlide));

    return (
        <section className="blockchain-details">
            <div className="empty_space_height50" />
            <div className="row m-0 p-0">
                <div className="blockchain-details-left col-lg-9 col-12">
                    <BoxALignItemsCenter className="blockchain-details-combine">
                        <div className="blockchain-details-combine-left">
                            <img className="app-logo" src="/img/logo.png" alt="" />
                        </div>
                        <div className="blockchain-details-combine-right">
                            <BoxALignItemsCenter className="blockchain-details-combine-right-name">
                                <h3 className="mb-0">Tokenplay</h3>
                                <BoxALignItemsCenter className="status-label main">
                                    <div className="dot" />
                                    <span className="ms-2">Main network</span>
                                </BoxALignItemsCenter>
                            </BoxALignItemsCenter>
                            <BoxALignItemsCenter className="blockchain-details-combine-right-rating">
                                <Rate allowHalf defaultValue={2.5} />
                                <p className="ms-3 mb-0">
                                    2.5
                                    <span className="ms-2">5 Ratings</span>
                                </p>
                            </BoxALignItemsCenter>
                            <div>
                                <Link href={'#'}>
                                    <a>Edit This App</a>
                                </Link>
                            </div>
                        </div>
                    </BoxALignItemsCenter>
                    <BoxALignItemsCenter className="blockchain-details-category flex-wrap">
                        <BoxALignItemsCenter className="me-3">
                            <img className="icon" src="/img/coin/eth.png" alt="" />
                            <strong>Ethereum</strong>
                        </BoxALignItemsCenter>
                        <BoxALignItemsCenter className="me-3">
                            <img className="icon" src="/img/icons/icn-exchange.png" alt="" />
                            <strong>Exchange</strong>
                        </BoxALignItemsCenter>
                    </BoxALignItemsCenter>
                    <div className="blockchain-details-description">
                        <p>
                            1.1% up to 7% daily profit 10 levels referral rewards up to 15% 0.1% Extra holding bonus per day 0.1% Extra contract balance bonus for each 1 Million Trx deposit in contract 210% total return without referral bonus Min deposit 1 Trx , no max deposit limit , no withdraw limit Stable and Long term platform with verified and open source smart contract Fantastic plans for future , TS token will share with our community and will list in top10 exchanges THE FUTURE IS NOW
                        </p>
                    </div>
                    <BoxALignItemsCenter className="blockchain-details-tags flex-wrap">
                        <BoxBlueBorderRounded className="py-2 px-3 me-3">
                            <span>Token Swap</span>
                        </BoxBlueBorderRounded>
                        <BoxBlueBorderRounded className="py-2 px-3 me-3">
                            <span>Liquidity Pool</span>
                        </BoxBlueBorderRounded>
                        <BoxBlueBorderRounded className="py-2 px-3 me-3">
                            <span>Defi</span>
                        </BoxBlueBorderRounded>
                    </BoxALignItemsCenter>
                    <BoxALignItemsCenter className="blockchain-details-social">
                        <ButtonBlue type="button">
                            View Website
                        </ButtonBlue>
                        <BoxALignItemsCenter className="ms-5">
                            <span className="me-3">Social: </span>
                            <a href="#" className="blockchain-details-social-facebook">
                                <FacebookFilled style={{ fontSize: '2rem' }} />
                            </a>
                            <a href="#" className="blockchain-details-social-twitter">
                                <TwitterOutlined style={{ fontSize: '2rem' }} />
                            </a>
                            <a href="#" className="blockchain-details-social-youtube">
                                <YoutubeFilled style={{ fontSize: '1.5rem' }} />
                            </a>
                        </BoxALignItemsCenter>
                    </BoxALignItemsCenter>
                </div>
                <div className="blockchain-details-right col-lg-3 col-12 p-0">
                    <BoxAlignItemsEnd_FlexColumn>
                        <BoxALignItemsCenter className="mb-2">
                            <User color='#1DBBBD' />
                            <span className="ms-2">8 followers</span>
                        </BoxALignItemsCenter>
                        <ButtonBlue className="rounded-pill mb-3">
                            Follow
                        </ButtonBlue>
                        <BoxALignItemsCenter className="mb-5">
                            <Button className="blockchain-details-right-follow">
                                <BoxALignItemsCenter>
                                    <File color='#1DBBBD' />
                                    <span className="ms-2">Collect</span>
                                </BoxALignItemsCenter>
                            </Button>
                            <Button className="blockchain-details-right-follow">
                                <BoxALignItemsCenter>
                                    <Heart color='#1DBBBD' />
                                    <span className="ms-2">Collect</span>
                                </BoxALignItemsCenter>
                            </Button>
                            <Button className="blockchain-details-right-follow">
                                <BoxALignItemsCenter>
                                    <Share2 color='#1DBBBD' />
                                    <span className="ms-2">Collect</span>
                                </BoxALignItemsCenter>
                            </Button>
                        </BoxALignItemsCenter>
                        <div className="w-100">
                            <AppSlide />
                        </div>
                    </BoxAlignItemsEnd_FlexColumn>
                </div>
                {/* <div className="empty_space_height50" /> */}
                <div className="blockchain-details-left col-lg-9 col-12 mt-lg-5 mt-2">
                    <div className="blockchain-details-dashboard">
                        <BoxALignItemsCenter>
                            <h3>{`TronSaving's`} Dashboards</h3>
                            <BoxALignItemsCenter className="status-label main ms-4">
                                <span>On-Chain</span>
                            </BoxALignItemsCenter>
                            <a href='#' className="blockchain-details-dashboard-viewContract ms-4">
                                View 1 Smart contracts
                            </a>
                        </BoxALignItemsCenter>
                        <br />
                        <BoxWhiteShadow className="p-4">
                            <div>
                                <TabMain>
                                    <span className="d-inline-flex position-relative">
                                        <Link href={`/app/${router.query.blockchain}?days=7`}>
                                            <TabMain_Sub className={`fontSize_08 ${!router.query.days || router.query.days === '7' ? 'active' : ''}`}>
                                                7D
                                            </TabMain_Sub>
                                        </Link>
                                    </span>
                                    <span className="d-inline-flex position-relative">
                                        <Link href={`/app/${router.query.blockchain}?days=30`}>
                                            <TabMain_Sub className={`fontSize_08 ${router.query.days === '30' ? 'active' : ''}`}>
                                                30D
                                            </TabMain_Sub>
                                        </Link>
                                    </span>
                                    <span className="d-inline-flex position-relative">
                                        <Link href={`/app/${router.query.blockchain}?days=90`}>
                                            <TabMain_Sub className={`fontSize_08 ${router.query.days === '90' ? 'active' : ''}`}>
                                                90D
                                            </TabMain_Sub>
                                        </Link>
                                    </span>
                                </TabMain>
                            </div>
                            <br />
                            <AppStatistical />
                            <br />
                            <div className="row mt-5">
                                <div className="col-lg-6 col-12 blockchain-details-dashboard-users">
                                    <h5 className="mb-0">Users</h5>
                                    <SplineChart />
                                    <BoxALignItemsStart>
                                        <div className="dot" />
                                        <div className="ms-2">
                                            <p className="title">Users</p>
                                            <div className="exp-item">
                                                <span className="name">24h: </span>
                                                <span className="value">5</span>
                                                <span className="increase">66.67%↑</span>
                                            </div>
                                            <div className="exp-item">
                                                <span className="name">Total: </span>
                                                <span className="value">2,543</span>
                                                <span className="time">(36 days)</span>
                                            </div>
                                            <div className="exp-item">
                                                <span className="name">ATH: </span>
                                                <span className="value">8</span>
                                                <span className="time">(Feb 17, 2022)</span>
                                            </div>
                                        </div>
                                    </BoxALignItemsStart>
                                </div>
                                <div className="col-lg-6 col-12 blockchain-details-dashboard-volume">
                                    <h5 className="mb-0">Volume</h5>
                                    <SplineChart />
                                    <BoxALignItemsStart>
                                        <div className="dot" />
                                        <div className="ms-2">
                                            <p className="title">Volume</p>
                                            <div className="exp-item">
                                                <span className="name">24h: </span>
                                                <span className="value">5</span>
                                                <span className="increase">66.67%↑</span>
                                            </div>
                                            <div className="exp-item">
                                                <span className="name">Total: </span>
                                                <span className="value">2,543</span>
                                                <span className="time">(36 days)</span>
                                            </div>
                                            <div className="exp-item">
                                                <span className="name">ATH: </span>
                                                <span className="value">8</span>
                                                <span className="time">(Feb 17, 2022)</span>
                                            </div>
                                        </div>
                                    </BoxALignItemsStart>
                                </div>
                                <div className="col-lg-6 col-12 blockchain-details-dashboard-transactions">
                                    <h5 className="mb-0">Transactions</h5>
                                    <SplineChart />
                                    <BoxALignItemsStart>
                                        <div className="dot" />
                                        <div className="ms-2">
                                            <p className="title">Transactions</p>
                                            <div className="exp-item">
                                                <span className="name">24h: </span>
                                                <span className="value">5</span>
                                                <span className="decrease">66.67%↑</span>
                                            </div>
                                            <div className="exp-item">
                                                <span className="name">Total: </span>
                                                <span className="value">2,543</span>
                                                <span className="time">(36 days)</span>
                                            </div>
                                            <div className="exp-item">
                                                <span className="name">ATH: </span>
                                                <span className="value">8</span>
                                                <span className="time">(Feb 17, 2022)</span>
                                            </div>
                                        </div>
                                    </BoxALignItemsStart>
                                </div>
                                <div className="col-lg-6 col-12 blockchain-details-dashboard-submit">
                                    <div className="blockchain-details-dashboard-submit-img">
                                        <p className="fw-bold mb-1 fontSize_1-1">Want More Dashboards</p>
                                        <p className="mb-0 fontSize_09">Submit Your Request To Us</p>
                                        <div className="mt-auto">
                                            <ButtonBlue className="fw-bold">
                                                Submit
                                            </ButtonBlue>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BoxWhiteShadow>
                    </div>
                </div>
                <div className="blockchain-details-right col-lg-3 col-12 p-0 mt-lg-5 mt-2">
                    <div className="blockchain-details-right-banner">
                        <img className="mw-100" src="/img/banner/banner_main.png" alt="" />
                    </div>
                    <br />
                    <div className="blockchain-details-right-topic">
                        <h3 className="mb-3">Related Topic</h3>
                        <div className="row">
                            <div className="col-lg-6 col-12 blockchain-details-right-topic-item">
                                <a href="#" className="">
                                    <p className="name">High-risk</p>
                                    <p className="count">{`536 Apps >`}</p>
                                </a>
                            </div>
                            <div className="col-lg-6 col-12 blockchain-details-right-topic-item">
                                <a href="#" className="">
                                    <p className="name">BNB Chain</p>
                                    <p className="count">{`536 Apps >`}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="empty_space_height50" />
                <div className="blockchain-details-left col-lg-9 col-12">
                    <BoxALignItemsCenter>
                        <h3>Reviews</h3>
                        <span className="ms-4">
                            4.2/5.0
                        </span>
                        <span className="ms-4">
                            5 Ratings
                        </span>
                    </BoxALignItemsCenter>
                    <BoxWhiteShadow className="p-4 blockchain-details-comment">
                        {[0, 1, 2, 3].map((comment, i) => {
                            return (
                                <div className="blockchain-details-comment-box" key={i}>
                                    <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                                        <BoxALignItemsCenter>
                                            <Avatar style={{ backgroundColor: '#1DBBBD' }} icon={<UserOutlined />} />
                                            <span className="blockchain-details-comment-box-name">Joseph Reyes</span>
                                            <Rate allowHalf defaultValue={2.5} />
                                        </BoxALignItemsCenter>
                                        <span className="blockchain-details-comment-box-time">Mar 17 , 2021</span>
                                    </BoxALignCenter_Justify_ItemsBetween>
                                    <p className="blockchain-details-comment-box-description">
                                        {`Don't buy into this scam, I've only lost $100 thankfully. Withdraw button doesn't work. Consider yourself warned.`}
                                    </p>
                                    <div>
                                        <Button>
                                            <BoxALignItemsCenter>
                                                <MessageSquare color="#1DBBBD" />
                                                <span className="ms-2 text-green">Comment</span>
                                            </BoxALignItemsCenter>
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                        <ButtonBorderBlueTransparent className="w-100 rounded-pill py-2">
                            View more
                        </ButtonBorderBlueTransparent>
                        <br /><br />
                        <div>
                            <Button className="text-green">
                                Rating and Reviews
                            </Button>
                        </div>
                    </BoxWhiteShadow>
                </div>
            </div>
        </section>
    )
}

export default BlockchainDetails;