import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxAlignItemsStart_FlexColumn,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import { Facebook, PlusCircle, Send, Twitter } from "react-feather";
import { message, Radio, Select, Space } from "antd";
import { ButtonBlue } from "@styles/styled-components/styledButton";
import { TitleGlobal } from "@components/common/Title";
import { ChangeEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import LoginPopup from "@components/navbar/LoginPopup";
import request from "@services/apiSSO";
import request0 from "@services/apiService";
import * as qs from "qs";
import useForm from "@utils/hook/useForm";
const { Option } = Select;

const Submit: NextPage = () => {
  const { input, handleChange }: any = useForm({
    Socials: [
      { name: "Facebook", url: "", image: null },
      { name: "Twitter", url: "", image: null },
      { name: "Telegram", url: "", image: null },
      { name: "Medium", url: "", image: null },
      { name: "Youtube", url: "", image: null },
      { name: "LinkedIn", url: "", image: null },
      { name: "Instagram", url: "", image: null },
    ],
    category: 1,
    dappChain: 1,
    detailDescription: "",
    email: "",
    hasToken: "",
    id: 1,
    images: null,
    isAdminOrOwner: false,
    isFullyOnChain: false,
    isOnCoingecko: false,
    projectName: "",
    reviewArticle: "",
    shortDescription: "",
    status: "",
    tags: [],
    thumbnail: "",
    tokenChain: "",
    tokenContract: "",
    tokenDecimal: "",
    tokenDescription: "",
    tokenLogo: "",
    tokenSymbol: "",
    website: "",
    referralProgram: "",
  });
  const [channelShown, setChannelShown] = useState([
    { name: "Facebook", icon: <Facebook /> },
    { name: "Twitter", icon: <Twitter /> },
    { name: "Telegram", icon: <Send /> },
  ]);
  const [channelPopup, setChannelPopup] = useState<boolean>(false);
  const [notLogin, setNotLogin] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const loginError = () => {
    if (notLogin) message.error("Please log in to continue");
  };
  const onChangeSocials = (
    e: ChangeEvent<HTMLInputElement>,
    channel: string
  ) => {
    const newSocs: Array<any> = input.Socials;
    newSocs.filter((soc) => soc.name === channel)[0].url = e.target.value;
    handleChange({
      target: { name: "Socials", value: newSocs },
    });
  };

  useEffect(() => {
    (async () => {
      // uncomment when deployed on dev since localhost can't access cookie
      await request
        .get(`/users/me`)
        .then((res: any) => {
          setNotLogin(false);
        })
        .catch(() => {
          setNotLogin(true);
        });
    })();
  }, []);

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    setIsVisible(notLogin);
  }, [notLogin]);

  return (
    <>
      <section className="main-submit">
        <div className="empty_space_height50" />
        <TitleGlobal>
          <h1 className="mb-0">Submit Dapp</h1>
        </TitleGlobal>
        <br />
        <h3>Identification</h3>
        <p className="text-secondary">
          Using an official email address within your organization will allow us
          to verify your admin role of your product. A verified admin will be
          able to submit changes, receive weekly profile stats, reply comments
          of other users, and unlock more functions on Dapp.com.
        </p>
        <br />
        <BoxWhiteShadow className="px-4 py-5">
          <h5 className="mb-3">Are You the Owner/Admin?</h5>
          <Radio.Group
            onChange={handleChange}
            value={input.isAdminOrOwner}
            className="mb-4"
            disabled={notLogin}
            name="isAdminOrOwner"
          >
            <Radio value={true}>Yes I’m the admin/owner.</Radio>
            <Radio value={false}>No. I’m just a supporter.</Radio>
          </Radio.Group>
          <div>
            <label className="label-input mb-3">Your Email Address</label>
            <input
              className="main-submit-email"
              type={"email"}
              placeholder="example@gmail.com"
              disabled={notLogin}
              value={input.email}
              onChange={handleChange}
              name="email"
            />
          </div>
        </BoxWhiteShadow>
        <br />
        <h3>Basic Information</h3>
        <BoxWhiteShadow className="px-4 py-5">
          <div className="row">
            <div className="col-lg-2 col-12">
              <div className="main-submit-avatar">
                <img src="/img/icons/icn-upload.png" alt="" />
                <br />
                <p>JPG,PNG with ratio of 1:1 300*300 or larger recommended</p>
                <input type="file" disabled={notLogin} />
              </div>
            </div>
            <div className="col-lg-10 col-12 mt-lg-0 mt-4">
              <BoxAlignItemsStart_FlexColumn className="justify-content-center h-100">
                <div className="w-100 mb-lg-4 mb-3">
                  <label className="label-input mb-3">Project Name</label>
                  <input
                    className="main-submit-project-name"
                    type={"text"}
                    placeholder="Project Name"
                    disabled={notLogin}
                    name="projectName"
                    onChange={handleChange}
                    value={input.projectName}
                  />
                </div>
                <div className="w-100">
                  <label className="label-input mb-3">Dapp Website</label>
                  <input
                    className="main-submit-project-name"
                    type={"text"}
                    placeholder="A URL to visit your product’s website."
                    disabled={notLogin}
                    name="website"
                    value={input.website}
                    onChange={handleChange}
                  />
                </div>
              </BoxAlignItemsStart_FlexColumn>
            </div>
            <div className="col-12 my-5">
              <h5>Preview Image</h5>
              <p className="text-secondary">
                High quality screenshot or preview image will attract more users
                and be featured by our editors. 4 Product Images Max
              </p>
              <div className="row p-0">
                <div className="col-lg-3 col-12">
                  <div className="main-submit-avatar-area">
                    <img src="/img/icons/icn-upload.png" alt="" />
                    <br />
                    <p>
                      JPG,PNG with ratio of 1:1 300*300 or larger recommended
                    </p>
                    <input type="file" disabled={notLogin} />
                  </div>
                </div>
                <div className="col-lg-3 col-12 mt-lg-0 mt-4">
                  <div className="main-submit-avatar-empty">
                    <input type="file" disabled={notLogin} />
                  </div>
                </div>
                <div className="col-lg-3 col-12 mt-lg-0 mt-4">
                  <div className="main-submit-avatar-empty">
                    <input type="file" disabled={notLogin} />
                  </div>
                </div>
                <div className="col-lg-3 col-12 mt-lg-0 mt-4">
                  <div className="main-submit-avatar-empty">
                    <input type="file" disabled={notLogin} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <h5>Category</h5>
              <Select
                disabled={notLogin}
                style={{ width: "100%" }}
                placeholder="Select one of our categories that best fit your product."
                onChange={(e) =>
                  handleChange({
                    target: {
                      value: e,
                      name: "category",
                      type: "select",
                    },
                  })
                }
                value={input.category}
              >
                <Option value={16}>Game</Option>
                <Option value={170}>Exchange</Option>
                <Option value={235}>Gambling</Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12 mt-lg-0 mt-4">
              <BoxALignItemsCenter className="mb-2">
                <h5 className="mb-0">Tags</h5>
                <span className="ms-3 text-green fontSize_09">
                  Maximum 5 Tags
                </span>
              </BoxALignItemsCenter>
              <Select
                disabled={notLogin}
                mode="tags"
                style={{ width: "100%" }}
                onChange={(e) => {
                  handleChange({
                    target: {
                      name: "tags",
                      type: "select",
                      value: e,
                    },
                  });
                }}
                showArrow
                placeholder="Select one of our categories that best fit your product."
              >
                <Option value={16}>Game</Option>
                <Option value={170}>Exchange</Option>
                <Option value={235}>Gambling</Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12 mt-lg-5 mt-4">
              <h5>Product Status</h5>
              <Select
                disabled={notLogin}
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleChange({
                    target: {
                      value: e,
                      name: "status",
                      type: "text",
                    },
                  })
                }
                showArrow
                placeholder="Select your product status"
              >
                <Option value="live">
                  <BoxALignItemsCenter>
                    <div className="dot live" />
                    <span className="ms-2">Live</span>
                  </BoxALignItemsCenter>
                </Option>
                <Option value="work">
                  <BoxALignItemsCenter>
                    <div className="dot work" />
                    <span className="ms-2">Work in progress</span>
                  </BoxALignItemsCenter>
                </Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12"></div>
            <div className="col-12 mt-lg-5 mt-4">
              <BoxALignCenter_Justify_ItemsBetween className="flex-lg-row flex-column align-items-start mb-4">
                <label className="label-input">Short Description</label>
                <span className="text-green">Max of 70 Characters</span>
              </BoxALignCenter_Justify_ItemsBetween>
              <textarea
                disabled={notLogin}
                style={{ width: "100%" }}
                maxLength={70}
                placeholder="This is to provide an idea of what does your product do. A good short summary will entice users to click and visit your page."
                value={input.shortDescription}
                onChange={handleChange}
                name="shortDescription"
              />
            </div>
            <div className="col-12 mt-lg-5 mt-4">
              <BoxALignCenter_Justify_ItemsBetween className="flex-lg-row flex-column align-items-start mb-3">
                <label className="label-input">Detail Description</label>
                <span className="text-green">Max of 500 Characters</span>
              </BoxALignCenter_Justify_ItemsBetween>
              <textarea
                disabled={notLogin}
                style={{ width: "100%" }}
                maxLength={500}
                placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page."
                value={input.detailDescription}
                onChange={handleChange}
                name="detailDescription"
              />
            </div>
            <div className="col-12 mt-lg-5 mt-4">
              <BoxALignItemsCenter className="flex-lg-row flex-column align-items-start mb-3">
                <label className="label-input mb-0">Product Status</label>
                <span className="ms-lg-4 ms-0 text-green">
                  Suggested E.g.
                  https://www.dappverse-tokenplay.com/article/beginners-guide-for-my-crypto-heroes
                </span>
              </BoxALignItemsCenter>
              <input
                disabled={notLogin}
                className="main-submit-product-status"
                type={"text"}
                placeholder="A url link to an article about your product that you want us to know."
                name="website"
                onChange={handleChange}
                value={input.website}
              />
            </div>
          </div>
        </BoxWhiteShadow>
        <br />
        <h3>Token Info</h3>
        <BoxWhiteShadow className="px-4 py-5">
          <h5 className="mb-3">
            Does your product has its tokens or cryptocurrencies?
          </h5>
          <Radio.Group
            disabled={notLogin}
            onChange={handleChange}
            name="hasToken"
            value={input.hasToken}
            className="mb-4"
          >
            <Radio value={true}>Yes we do.</Radio>
            <Radio value={false}>No we don’t.</Radio>
          </Radio.Group>
          <h5 className="mb-3">Token Logo</h5>
          <BoxALignItemsCenter className="mb-4">
            <div className="main-submit-avatar-logo">
              <img src="/img/icons/icn-upload-small.png" alt="" />
              <input type="file" disabled={notLogin} />
            </div>
            <span className="ms-3">
              JPG,PNG with ratio of 1:1. 48*48px or larger recommended. Must be
              less than 50.
            </span>
          </BoxALignItemsCenter>
          <br />
          <div className="row">
            <div className="col-lg-6 col-12">
              <h5 className="mb-3">
                On which blockchain do you issue your token?
              </h5>
              <Select
                disabled={notLogin}
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleChange({
                    target: {
                      value: e,
                      name: "tokenChain",
                      type: "select",
                    },
                  })
                }
                value={input.tokenChain}
                placeholder="Choose blockchain"
              >
                <Option value={2}>BNB Chain</Option>
                <Option value={1}>Ethereum</Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12 mt-lg-5 mt-4">
              <BoxALignItemsCenter className="mb-3">
                <h5 className="mb-0">Ticker of your token.</h5>
                <span className="ms-3 text-green">E.g. BTC</span>
              </BoxALignItemsCenter>
              <input
                disabled={notLogin}
                className="main-submit-ticker"
                onChange={handleChange}
                value={input.tokenSymbol}
                type={"text"}
                name="tokenSymbol"
              />
            </div>
            <div className="col-lg-6 col-12 mt-lg-5 mt-4">
              <label className="label-input mb-3">Token Contract</label>
              <input
                disabled={notLogin}
                className="main-submit-contract"
                type={"text"}
                placeholder="Smart Contract address of your token."
                name="tokenContract"
                value={input.tokenContract}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 col-12 mt-lg-5 mt-4">
              <label className="label-input mb-3">Decimal</label>
              <input
                disabled={notLogin}
                className="main-submit-decimal"
                type={"text"}
                placeholder="Decimal of your token."
                name="tokenDecimal"
                onChange={handleChange}
                value={input.tokenDecimal}
              />
            </div>
            <div className="col-12 mt-lg-5 mt-4">
              <BoxALignCenter_Justify_ItemsBetween className="flex-lg-row flex-column align-items-start mb-4">
                <label className="label-input">Token Description</label>
                <span className="text-green">Max of 200 Characters</span>
              </BoxALignCenter_Justify_ItemsBetween>
              <textarea
                disabled={notLogin}
                style={{ width: "100%" }}
                maxLength={200}
                placeholder="Token Description."
                onChange={handleChange}
                value={input.tokenDescription}
                name="tokenDescription"
              />
            </div>
            <div className="col-12 mt-lg-5 mt-4">
              <BoxALignItemsCenter className="flex-lg-row flex-column align-items-start mb-3">
                <label className="label-input mb-0">
                  Is your token listed on Coingecko?
                </label>
                <span className="ms-lg-4 ms-0 text-green">
                  Suggested E.g.
                  https://www.dappverse-tokenplay.com/article/beginners-guide-for-my-crypto-heroes
                </span>
              </BoxALignItemsCenter>
              <input
                value={input.isOnCoinGecko}
                onChange={handleChange}
                name="isOnCoinGecko"
                disabled={notLogin}
                className="main-submit-global"
                type={"text"}
                placeholder="Please provide the link to your token’s Coingecko profile."
              />
            </div>
          </div>
        </BoxWhiteShadow>
        <br />
        <h3>Token Info</h3>
        <p className="text-secondary">
          Dapp.com’s user will be able to see your product’s onchain stats via
          your smart contracts info if your product is blockchain based.
        </p>
        <BoxWhiteShadow className="px-4 py-5">
          <h5 className="mb-3">Is your product fully on-chain?</h5>
          <Radio.Group
            onChange={handleChange}
            value={input.isFullyOnChain}
            className="mb-4"
            disabled={notLogin}
            name="isFullyOnChain"
          >
            <Space direction="vertical">
              <Radio value={"yes"}>Yes, it is 100% on-chain.</Radio>
              <Radio value={"other"}>There are some off-chain element.</Radio>
              <Radio value={"no"}>No, it is not running on a blockchain.</Radio>
            </Space>
          </Radio.Group>
          <div className="row">
            <div className="col-lg-6 col-12 mt-lg-5 mt-4">
              <h5>Product Status</h5>
              <Select
                disabled={notLogin}
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleChange({
                    value: e,
                    name: "dappChain",
                    type: "select",
                  })
                }
                value={input.dappChain}
                placeholder="On which blockchain did you build your on-chain function?"
              >
                <Option value={2}>BNB Chain</Option>
                <Option value={1}>Ethereum</Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12"></div>
          </div>
        </BoxWhiteShadow>
        <br />
        <h3>Social Media ( optional )</h3>
        <p className="text-secondary">
          We track the growth of your product’s social media communities.
          Providing a full detail of your social media channels will improve
          your Dapp.com score and get a higher rank.
        </p>
        <BoxWhiteShadow className="px-4 py-5">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="main-submit-input-suffix">
                <span className="main-submit-input-suffix-logo">
                  <Facebook />
                </span>
                <input
                  disabled={notLogin}
                  type={"text"}
                  placeholder="E.g. https://www.facebook.com/dappverse.com/"
                  name="Socials"
                  value={
                    input.Socials.filter((soc: any) => soc.name === "Facebook")
                      .url
                  }
                  onChange={(e) => onChangeSocials(e, "Facebook")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 mt-lg-0 mt-4">
              <div className="main-submit-input-suffix">
                <span className="main-submit-input-suffix-logo">
                  <Twitter />
                </span>
                <input
                  disabled={notLogin}
                  type={"text"}
                  placeholder="Add your product's Twitter URL"
                  name="Socials"
                  value={
                    input.Socials.filter((soc: any) => soc.name === "Twitter")
                      .url
                  }
                  onChange={(e) => onChangeSocials(e, "Twitter")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 mt-4">
              <div className="main-submit-input-suffix">
                <span className="main-submit-input-suffix-logo">
                  <Send />
                </span>
                <input
                  disabled={notLogin}
                  type={"text"}
                  placeholder="Add your product's Telegram URL"
                  name="Socials"
                  value={
                    input.Socials.filter((soc: any) => soc.name === "Telegram")
                      .url
                  }
                  onChange={(e) => onChangeSocials(e, "Telegram")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 mt-4">
              <div className="main-submit-input-suffix">
                <span className="main-submit-input-suffix-logo">
                  <PlusCircle />
                </span>
                <input
                  disabled={notLogin}
                  type={"text"}
                  placeholder="Add channel"
                />
              </div>
            </div>
          </div>
        </BoxWhiteShadow>
        <br />
        <h3 className="mb-3">Affiliate/Referral Program</h3>
        <BoxWhiteShadow className="px-4 py-5">
          <h5 className="mb-3">
            Do you have an affiliate or referral program?
          </h5>
          <Radio.Group
            disabled={notLogin}
            onChange={handleChange}
            value={input.referralProgram}
            name="referralProgram"
            className="mb-4"
          >
            <Space direction="vertical">
              <Radio value={"Yes, here is an affiliate link for Dapp.com."}>
                Yes, here is an affiliate link for Dapp.com.
              </Radio>
              <Radio value={"Yes, but you will have to apply separately."}>
                Yes, but you will have to apply separately.
              </Radio>
              <Radio value={"Sorry, we don’t."}>Sorry, we don’t.</Radio>
            </Space>
          </Radio.Group>
        </BoxWhiteShadow>
        <br />
        <div className="main-submit-box">
          <ButtonBlue disabled={notLogin}>Submit your project</ButtonBlue>
        </div>
      </section>
      <LoginPopup
        isVisible={isVisible}
        setVisible={setIsVisible}
        onExit={loginError}
      />
    </>
  );
};

export default Submit;
