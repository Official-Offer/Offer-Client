import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxAlignItemsStart_FlexColumn,
  BoxWhiteShadow,
  Channel,
  BoxWhiteGreenShadow,
  BoxALignCenter_Justify_ItemsEnd,
} from "@styles/styled-components/styledBox";
import {
  Facebook,
  PlusCircle,
  Send,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
} from "react-feather";
import { Form, message, notification, Radio, Select, Space } from "antd";
import {
  BigButtonSmallText,
  ButtonBlue,
} from "@styles/styled-components/styledButton";
import { TitleGlobal } from "@components/common/Title";
import { ChangeEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import LoginPopup from "@components/navbar/LoginPopup";
import request from "@services/apiSSO";
import request0 from "@services/apiService";
import * as qs from "qs";
import useForm from "@utils/hook/useForm";
import axios from "axios";
import { URL_API_ADMIN } from "config/index";
import { Modal } from "antd";
import validateEmail from "@utils/validateEmail";
import { EmailIcon } from "react-share";
import validateAddress from "@utils/validateAddress";
const { Option } = Select;

const Submit: NextPage = () => {
  const { input, handleChange }: any = useForm({
    isOwnerOrAdmin: true,
    email: "",
    thumbnail: "",
    projectName: "",
    website: "",
    images: [null, null, null, null],
    category: "",
    tags: [],
    status: "live",
    shortDescription: "",
    detailDescription: "",
    reviewArticle: "",
    hasToken: true,
    tokenLogo: null,
    tokenChain: " ",
    tokenSymbol: "",
    tokenContract: "",
    tokenDecimal: "",
    tokenDescription: "",
    isOnCoingecko: "",
    isFullyOnChain: "yes",
    dappChain: " ",
    Socials: [
      { name: "Facebook", url: "", image: null },
      { name: "Twitter", url: "", image: null },
      { name: "Telegram", url: "", image: null },
      { name: "Medium", url: "", image: null },
      { name: "Youtube", url: "", image: null },
      { name: "LinkedIn", url: "", image: null },
      { name: "Instagram", url: "", image: null },
    ],
    referralProgram: "Sorry, we don’t.",
  });

  const [channelShown, setChannelShown] = useState([
    {
      name: "Facebook",
      icon: <img src="/img/media/facebook.png" className="main-submit-media" />,
      placeholder: "E.g. https://www.facebook.com/dappverse.com/",
      shown: true,
    },
    {
      name: "Twitter",
      icon: <img src="/img/media/twitter.png" className="main-submit-media" />,
      shown: true,
      placeholder: "Add your product's Twitter URL",
    },
    {
      name: "Telegram",
      icon: <img src="/img/media/telegram.png" className="main-submit-media" />,
      shown: true,
      placeholder: "Add your product's Telegram URL",
    },
    {
      name: "Medium",
      icon: <img src="/img/media/telegram.png" className="main-submit-media" />,
      shown: false,
      placeholder: "Add your product's Medium URL",
    },
    {
      name: "Youtube",
      icon: (
        <Youtube
          fill="#058499"
          color="#fff"
          size={34}
          className="main-submit-media"
        />
      ),
      shown: false,
      placeholder: "Add your product's Youtube URL",
    },
    {
      name: "LinkedIn",
      icon: (
        <Linkedin
          fill="#058499"
          color="#fff"
          size={34}
          className="main-submit-media"
        />
      ),
      shown: false,
      placeholder: "Add your product's Linkedin URL",
    },
    {
      name: "Instagram",
      icon: (
        <Instagram
          fill="#058499"
          color="#fff"
          size={34}
          className="main-submit-media"
        />
      ),
      shown: false,
      placeholder: "Add your product's Instagram URL",
    },
  ]);
  const channelNotShown = [
    { name: "Medium", src: "/img/icons/channel_medium.png", index: 3 },
    { name: "Youtube", src: "/img/icons/channel_youtube.png", index: 4 },
    { name: "LinkedIn", src: "/img/icons/channel_in.png", index: 5 },
    { name: "Instagram", src: "/img/icons/channel_instagram.png", index: 6 },
  ];
  const [channelPopup, setChannelPopup] = useState<boolean>(false);
  const [notLogin, setNotLogin] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [tags, setTags] = useState<any>([]);
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

  const onCloseChannel = () => setChannelPopup(false);
  const onAddNewChannel = () => {
    onCloseChannel();
  };
  const onClickChannel = (index: any) => {
    const newState = channelShown;
    newState[index].shown = true;
    setChannelShown(newState);
  };

  const ChannelPopup = () => (
    <Modal title="Add Channel" visible={channelPopup} onCancel={onCloseChannel}>
      <div className="main-submit-channel-wrap">
        {channelNotShown.map((channel, i) => (
          <Channel
            src={channel.src}
            alt={channel.name}
            key={i}
            onClick={() => onClickChannel(channel.index)}
          />
        ))}
      </div>
      <BigButtonSmallText onClick={onAddNewChannel}>Add</BigButtonSmallText>
    </Modal>
  );
  const [failed, setFailed] = useState<any>();
  const checkImage = (
    value: any,
    name: any,
    minWidth: number,
    minHeight: number
  ) => {
    let flag = true;
    const reader = new FileReader();
    if (!(value instanceof Blob)) return false;
    reader.readAsDataURL(value);
    reader.onload = (e: any) => {
      const image: any = new Image();
      image.src = e.target?.result;
      image.onload = function () {
        const height = this.height;
        const width = this.width;
        if (width < minWidth || height < minHeight) {
          message.error(
            `Image must be at least ${minHeight} pixels high and ${minWidth} pixels wide.`
          );
          setFailed(name);
        } else if (width !== height) {
          message.error(`Image must be of ratio 1:1.`);
          setFailed(name);
        } else {
          setFailed(null);
        }
      };
    };
    return flag;
  };

  const onUploadImageToField = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value: any;
    if (!e.target.files || e.target.files.length === 0) {
      value = undefined;
    } else {
      value = e.target.files[0];
    }
    //check image size first
    //size 48x48 for token logo, 300x300 else
    const minWidth = field === "tokenLogo" ? 48 : 300;
    const minHeigth = field === "tokenLogo" ? 48 : 300;
    if (!checkImage(value, field, minWidth, minHeigth)) return;
    handleChange({
      target: {
        name: field,
        value: value, //chnage null to value
        type: "file",
      },
    });
  };

  const onUploadImagesToField = (e: ChangeEvent<HTMLInputElement>, i: any) => {
    //push images to the four boxes
    let value;
    if (!e.target.files || e.target.files.length === 0) {
      value = undefined;
    } else {
      value = e.target.files[0];
    }
    //check size image
    if (!checkImage(value, "images", 300, 300)) return;
    const newState: Array<any> = input.images;
    if (value) newState[i] = value; //change null value
    handleChange({
      target: {
        name: "images",
        value: newState,
        type: "images",
      },
    });
  };

  const onChangeTags = (e: any) => {
    if (e.length > 5) {
      message.error("Maximum of 5 tags, bruhhh");
      return;
    }
    handleChange({
      target: {
        name: "tags",
        type: "select",
        value: e,
      },
    });
  };

  const rawImgToBase64 = (raw: any) => {
    // convert to b64 to display on input, still send raw file to server
    if (!raw || raw == "") return null;
    // return URL.createObjectURL(raw.files[0]);
    return URL.createObjectURL(raw);
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const data: any = {};
    const keys = Object.keys(input);
    //validate input data
    let flag = false;
    for (let i = 0; i < keys.length; i++) {
      // check unfilled fields, ignore optional fields
      if (
        input[keys[i]] === "" &&
        ![
          "reviewArticle",
          "detailDescription",
          "shortDescription",
          "dappChain",
          "tokenChain",
          "isOnCoingecko",
        ].includes(keys[i])
      ) {
        message.error(`Field ${keys[i]} cannot be empty`);
        setError(keys[i]);
        return;
      }
      // check if detail description, if filled, must be at least 100 and at most 500 chars
      else if (
        keys[i] === "detailDescription" &&
        (input[keys[i]].length < 100 || input[keys[i]].length > 500) &&
        input[keys[i]].length > 0
      ) {
        message.error(
          `Detail description must be longer at 100 characters and less than 500 characters`
        );
        return;
      }
      // check if short description, if filled, must be at least 10 and at most 100 chars
      else if (
        keys[i] === "shortDescription" &&
        (input[keys[i]].length < 10 || input[keys[i]].length > 100) &&
        input[keys[i]].length > 0
      ) {
        message.error(
          `Short description must be longer at 10 characters and less than 100 characters`
        );
        return;
      }
      //check token description length
      else if (
        keys[i] === "tokenDescription" &&
        (input[keys[i]].length < 10 || input[keys[i]].length > 200) &&
        input[keys[i]].length > 0
      ) {
        message.error(
          `Token description must be longer at 10 characters and less than 200 characters`
        );
        return;
      }
      // check email
      else if (keys[i] == "email" && !validateEmail(input[keys[i]])) {
        message.error("Must be an email");
        setError(keys[i]);
        return;
      }
      //check existed email
      else if (keys[i] == "email") {
        const query = qs.stringify(
          {
            populate: "*",
            filters: {
              email: {
                $eq: input[keys[i]],
              },
            },
          },
          {
            encodeValuesOnly: true,
          }
        );
        const result = await axios
          .get(`${URL_API_ADMIN}/submit-dapps?${query}`)
          .then((res) => {
            if (res.data.data?.length > 0) {
              //email already used
              message.error("Already used email.");
              flag = true;
            }
          })
          .catch(() => {
            message.error("Something is wrong, damn it.");
            flag = true;
          });
      }
      //check contract
      else if (keys[i] === "tokenContract") {
        if (!validateAddress(input[keys[i]])) {
          message.error("Invalid Address");
          return;
        }
        //check existed contract
        else {
          const query = qs.stringify(
            {
              populate: "*",
              filters: {
                tokenContract: {
                  $eq: input[keys[i]],
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          );
          const result = await axios
            .get(`${URL_API_ADMIN}/submit-dapps?${query}`)
            .then((res) => {
              if (res.data.data?.length > 0) {
                //email already used
                message.error("Already used contract.");
                flag = true;
              }
            })
            .catch(() => {
              message.error("Something is wrong, damn it.");
              flag = true;
            });
        }
      }
      // check image of correct size
      else if (keys[i] === failed) {
        message.error(`${failed} image doesn't meet the standard`);
        return;
      }
      //check images field have at least 1 image
      else if (keys[i] == "images" && input[keys[i]].length < 1) {
        message.error("You must submit at least 1 Preview image");
        return;
      }

      // flag is raised, return
      if (flag) return;
      if (["thumbnail", "tokenLogo"].includes(keys[i])) {
        if (input[keys[i]])
          formData.append(
            `files.${keys[i]}`,
            input[keys[i]],
            input[keys[i]].name
          );
      } else if (keys[i] == "images") {
        input[keys[i]].forEach((file: any) => {
          if (file) formData.append(`files.${keys[i]}`, file, file.name);
        });
      } else if (input[keys[i]] !== " ") {
        // unchoosen chain id
        data[keys[i]] = input[keys[i]];
      }
    }
    formData.append("data", JSON.stringify(data));
    const res = await axios
      .post(`${URL_API_ADMIN}/submit-dapps`, formData) //change {data: input} to formdata
      .then((res) => {
        notification.open({
          message: "Success 🥳",
          description: "Your Dapp has been successfully submitted! ",
          duration: 3,
        });
      })
      .catch((err: Error) =>
        notification.open({
          message: "Error 🤢",
          description: err.message,
          duration: 3,
        })
      );
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

  const countNonNull = (arr: Array<any>) => {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) res++;
    }
    return res;
  };

  const onDeleteImage = (name: string) => {
    handleChange({
      target: {
        name,
        value: null,
        type: "file",
      },
    });
  };
  const onDeleteLastImage = () => {
    const newState: Array<any> = [...input.images];
    const findFirstNonNullIndex = (arr: Array<any>) => {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== null) return i;
      }
      return -1;
    };
    newState[findFirstNonNullIndex(newState)] = null;
    handleChange({
      target: {
        name: "images",
        value: newState,
        type: "images",
      },
    });
  };
  return (
    <>
      <section className="main-submit">
        <div className="empty_space_height50" />
        <h1 className="mb-0 super-title">Submit Dapp</h1>
        <br />
        <h3 className="main-submit-section-header">Identification</h3>
        <p className="text-secondary top">
          Using an official email address within your organization will allow us
          to verify your admin role of your product. A verified admin will be
          able to submit changes, receive weekly profile stats, reply comments
          of other users, and unlock more functions on Dapp.com.
        </p>
        <br />
        <BoxWhiteGreenShadow className="px-4 py-5">
          <h5 className="mb-3 kindoftitle">Are You the Owner/Admin?</h5>
          <Radio.Group
            onChange={handleChange}
            value={input.isOwnerOrAdmin}
            className="mb-4"
            disabled={notLogin}
            name="isOwnerOrAdmin"
          >
            <Radio value={true}>Yes I’m the admin/owner.</Radio>
            <Radio value={false}>No. I’m just a supporter.</Radio>
          </Radio.Group>
          <div>
            <label className="label-input mb-3 kindoftitle">
              Your Email Address
            </label>
            <input
              className="main-submit-email"
              type={"email"}
              placeholder="name@gmail.com"
              disabled={notLogin}
              value={input.email}
              onChange={handleChange}
              name="email"
            />
          </div>
        </BoxWhiteGreenShadow>
        <br />
        <h3 className="main-submit-section-header">Basic Information</h3>
        <BoxWhiteGreenShadow className="px-4 py-5">
          <div className="row">
            <div className="col-lg-2 col-12">
              <div className="main-submit-avatar">
                {rawImgToBase64(input.thumbnail) ? (
                  <div className="img-wrapper">
                    <BoxALignCenter_Justify_ItemsEnd>
                      <span
                        className="x"
                        onClick={() => onDeleteImage("thumbnail")}
                      >
                        x
                      </span>
                    </BoxALignCenter_Justify_ItemsEnd>
                    <img
                      className="upload-img"
                      src={`${rawImgToBase64(input.thumbnail)}`}
                    />
                  </div>
                ) : (
                  <>
                    {" "}
                    <img src="/img/icons/icn-upload.png" alt="" />
                    <br />
                    <p>
                      JPG,PNG with ratio of 1:1 300*300 or larger recommended
                    </p>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      disabled={notLogin}
                      name="thumbnail"
                      onChange={(e) => onUploadImageToField(e, "thumbnail")}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-10 col-12 mt-lg-0 mt-4">
              <BoxAlignItemsStart_FlexColumn className="justify-content-center h-100">
                <div className="w-100 mb-lg-4 mb-3">
                  <label className="label-input mb-3 kindoftitle">
                    Project Name
                  </label>
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
                  <label className="label-input mb-3 kindoftitle">
                    Dapp Website
                  </label>
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
              <h5 className="kindoftitle">Preview Image</h5>
              <p className="text-secondary light-grey">
                High quality screenshot or preview image will attract more users
                and be featured by our editors. 4 Product Images Max
              </p>
              <div className="row p-0">
                {[0, 1, 2, 3].map((_, i) => (
                  <div className="col-lg-3 col-12" key={i}>
                    <div className="main-submit-avatar-area">
                      {countNonNull(input.images) >= i && (
                        <>
                          {rawImgToBase64(input.images[i]) ? (
                            <div className="img-wrapper">
                              {countNonNull(input.images) == i + 1 && (
                                <BoxALignCenter_Justify_ItemsEnd>
                                  <span
                                    className="x"
                                    onClick={onDeleteLastImage}
                                  >
                                    x
                                  </span>
                                </BoxALignCenter_Justify_ItemsEnd>
                              )}
                              <img
                                src={
                                  rawImgToBase64(input.images[i]) ||
                                  "/img/icons/icn-upload.png"
                                }
                                className="upload-img-wide"
                                alt=""
                              />
                            </div>
                          ) : (
                            <>
                              <img src={"/img/icons/icn-upload.png"} alt="" />
                              <input
                                accept="image/png, image/jpeg, image/jpg"
                                type="file"
                                disabled={notLogin}
                                onChange={(e) => onUploadImagesToField(e, i)}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <h5 className="kindoftitle">Category</h5>
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
                // value={input.category}
              >
                <Option value={7}>Game</Option>
                <Option value={8}>Exchange</Option>
                <Option value={6}>Gambling</Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12 mt-lg-0 mt-4">
              <BoxALignItemsCenter className="mb-2">
                <h5 className="mb-0 kindoftitle">Tags</h5>
                <span className="ms-3 text-green green fontSize_09">
                  Maximum 5 Tags
                </span>
              </BoxALignItemsCenter>
              <Select
                value={input.tags}
                disabled={notLogin}
                mode="tags"
                style={{ width: "100%" }}
                onChange={onChangeTags}
                showArrow
                placeholder="Select one of our categories that best fit your product."
              >
                <Option value={16}>Game</Option>
                <Option value={170}>Exchange</Option>
                <Option value={235}>Gambling</Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12 mt-lg-5 mt-4">
              <h5 className="kindoftitle">Product Status</h5>
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
            {input.isOwnerOrAdmin && (
              <div className="col-12 mt-lg-5 mt-4">
                <BoxALignCenter_Justify_ItemsBetween className="flex-lg-row flex-column align-items-start mb-4">
                  <label className="label-input kindoftitle">
                    Short Description
                  </label>
                  <span className="text-green green">Max of 70 Characters</span>
                </BoxALignCenter_Justify_ItemsBetween>
                <div className="main-submit-text-wrapper ">
                  <textarea
                    className="main-submit-trans-text"
                    disabled={notLogin}
                    style={{ width: "100%" }}
                    maxLength={70}
                    placeholder="This is to provide an idea of what does your product do. A good short summary will entice users to click and visit your page."
                    value={input.shortDescription}
                    onChange={handleChange}
                    name="shortDescription"
                  />
                  <div
                    className={`main-submit-char-counter${
                      (input.shortDescription.length < 10 ||
                        input.shortDescription.length > 100) &&
                      input.shortDescription.length > 0
                        ? "-error"
                        : ""
                    }`}
                  >
                    {input.shortDescription.length}/100
                  </div>
                </div>
              </div>
            )}
            {input.isOwnerOrAdmin && (
              <div className="col-12 mt-lg-5 mt-4">
                <BoxALignCenter_Justify_ItemsBetween className="flex-lg-row flex-column align-items-start mb-3">
                  <label className="label-input kindoftitle">
                    Detail Description
                  </label>
                  <span className="text-green green">
                    Max of 500 Characters
                  </span>
                </BoxALignCenter_Justify_ItemsBetween>
                <div className="main-submit-text-wrapper">
                  <textarea
                    className="main-submit-text-description main-submit-trans-text"
                    disabled={notLogin}
                    style={{ width: "100%" }}
                    maxLength={500}
                    placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page."
                    value={input.detailDescription}
                    onChange={handleChange}
                    name="detailDescription"
                  />
                  <div
                    className={`main-submit-char-counter${
                      (input.detailDescription.length < 100 ||
                        input.detailDescription.length > 500) &&
                      input.detailDescription.length > 0
                        ? "-error"
                        : ""
                    }`}
                  >
                    {input.detailDescription.length}/500
                  </div>
                </div>
              </div>
            )}
            <div className="col-12 mt-lg-5 mt-4">
              <BoxALignItemsCenter className="flex-lg-row flex-column align-items-start mb-3">
                <label className="label-input mb-0 kindoftitle">
                  Product Review Article
                </label>
                <span className="ms-lg-4 ms-0 text-green suggested">
                  Suggested E.g.
                  https://www.dappverse-tokenplay.com/article/beginners-guide-for-my-crypto-heroes
                </span>
              </BoxALignItemsCenter>
              <input
                disabled={notLogin}
                className="main-submit-product-status"
                type={"text"}
                placeholder="A url link to an article about your product that you want us to know."
                name="reviewArticle"
                onChange={handleChange}
                value={input.reviewArticle}
              />
            </div>
          </div>
        </BoxWhiteGreenShadow>
        <br />
        <h3 className="main-submit-section-header">Token Info</h3>
        <BoxWhiteGreenShadow className="px-4 py-5">
          <h5 className="mb-3 kindoftitle">
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
          {input.isOwnerOrAdmin && (
            <>
              <h5 className="mb-3 kindoftitle">Token Logo</h5>
              <BoxALignItemsCenter className="mb-4">
                <div className="main-submit-avatar-logo">
                  {rawImgToBase64(input.tokenLogo) ? (
                    <div className="img-wrapper">
                      <BoxALignCenter_Justify_ItemsEnd>
                        <span
                          className="x"
                          onClick={() => onDeleteImage("tokenLogo")}
                        >
                          x
                        </span>
                      </BoxALignCenter_Justify_ItemsEnd>
                      <img
                        src={`${rawImgToBase64(input.tokenLogo)}`}
                        alt=""
                        className="upload-img"
                      />
                    </div>
                  ) : (
                    <>
                      {" "}
                      <img src="/img/icons/icn-upload-small.png" alt="" />
                      <input
                        accept="image/png, image/jpeg, image/jpg"
                        type="file"
                        disabled={notLogin}
                        onChange={(e) => onUploadImageToField(e, "tokenLogo")}
                      />
                    </>
                  )}
                </div>
                <span className="ms-3">
                  JPG,PNG with ratio of 1:1. 48*48px or larger recommended. Must
                  be less than 50.
                </span>
              </BoxALignItemsCenter>
            </>
          )}
          <br />
          <div className="row">
            <div className="col-lg-6 col-12 mt-lg-5 mt-4">
              <h5 className="label-input mb-3 kindoftitle">
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
                // value={input.tokenChain}
                placeholder="Choose blockchain"
              >
                <Option value={2}>BNB Chain</Option>
                <Option value={1}>Ethereum</Option>
              </Select>
            </div>
            {input.isOwnerOrAdmin && (
              <div className="col-lg-6 col-12 mt-lg-5 mt-4">
                <BoxALignItemsCenter className="mb-3">
                  <h5 className="mb-0 kindoftitle">Ticker of your token.</h5>
                  <span className="ms-3 text-green">E.g. BTC</span>
                </BoxALignItemsCenter>
                <input
                  disabled={notLogin}
                  className="main-submit-ticker"
                  onChange={handleChange}
                  value={input.tokenSymbol}
                  type={"text"}
                  name="tokenSymbol"
                  placeholder="BNB"
                />
              </div>
            )}
            {input.isOwnerOrAdmin && (
              <div className="col-lg-6 col-12 mt-lg-5 mt-4">
                <label className="label-input mb-3 kindoftitle">
                  Token Contract
                </label>
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
            )}
            {input.isOwnerOrAdmin && (
              <div className="col-lg-6 col-12 mt-lg-5 mt-4">
                <label className="label-input mb-3 kindoftitle">Decimal</label>
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
            )}
            {input.isOwnerOrAdmin && (
              <div className="col-12 mt-lg-5 mt-4">
                <BoxALignCenter_Justify_ItemsBetween className="flex-lg-row flex-column align-items-start mb-4">
                  <label className="label-input kindoftitle">
                    Token Description
                  </label>
                  <span className="text-green green">
                    Max of 200 Characters
                  </span>
                </BoxALignCenter_Justify_ItemsBetween>
                <div className="main-submit-text-wrapper">
                  <textarea
                    className="main-submit-text-description main-submit-trans-text"
                    disabled={notLogin}
                    style={{ width: "100%" }}
                    maxLength={200}
                    placeholder="Token Description."
                    onChange={handleChange}
                    value={input.tokenDescription}
                    name="tokenDescription"
                  />
                  <div
                    className={`main-submit-char-counter${
                      (input.tokenDescription.length < 10 ||
                        input.tokenDescription.length > 200) &&
                      input.tokenDescription.length > 0
                        ? "-error"
                        : ""
                    }`}
                  >
                    {input.tokenDescription.length}/200
                  </div>
                </div>
              </div>
            )}
            <div className="col-12 mt-lg-5 mt-4">
              <BoxALignItemsCenter className="flex-lg-row flex-column align-items-start mb-3">
                <label className="label-input mb-0 kindoftitle">
                  Is your token listed on Coingecko?
                </label>
                <span className="ms-lg-4 ms-0 text-green green">
                  Suggested E.g.
                  https://www.dappverse-tokenplay.com/article/beginners-guide-for-my-crypto-heroes
                </span>
              </BoxALignItemsCenter>
              <input
                value={input.isOnCoingecko}
                onChange={handleChange}
                name="isOnCoingecko"
                disabled={notLogin}
                className="main-submit-global"
                type={"text"}
                placeholder="Please provide the link to your token’s Coingecko profile."
              />
            </div>
          </div>
        </BoxWhiteGreenShadow>
        <br />
        <h3 className="main-submit-section-header kindoftitle">
          Smart Contracts Info
        </h3>
        <p className="text-secondary">
          Dapp.com’s user will be able to see your product’s onchain stats via
          your smart contracts info if your product is blockchain based.
        </p>
        <BoxWhiteGreenShadow className="px-4 py-5">
          <h5 className="mb-3 kindoftitle">Is your product fully on-chain?</h5>
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
              <h5 className="kindoftitle">
                On which blockchain did you build your on-chain function
              </h5>
              <Select
                disabled={notLogin}
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleChange({
                    target: { value: e, name: "dappChain", type: "select" },
                  })
                }
                // value={input.dappChain}
                placeholder="On which blockchain did you build your on-chain function?"
              >
                <Option value={2}>BNB Chain</Option>
                <Option value={1}>Ethereum</Option>
              </Select>
            </div>
            <div className="col-lg-6 col-12"></div>
          </div>
        </BoxWhiteGreenShadow>
        <br />
        <h3 className="main-submit-section-header">
          Social Media ( optional )
        </h3>
        <p className="text-secondary">
          We track the growth of your product’s social media communities.
          Providing a full detail of your social media channels will improve
          your Dapp.com score and get a higher rank.
        </p>
        <BoxWhiteGreenShadow className="px-4 py-5">
          <div className="row">
            <>
              {channelShown
                .filter((channel) => channel.shown)
                .map((channel, i) => (
                  <div className={`col-lg-6 col-12 ${i > 1 && "mt-4"}`} key={i}>
                    <div className="main-submit-input-suffix">
                      <span className="main-submit-input-suffix-logo green">
                        {channel.icon}
                      </span>
                      <input
                        disabled={notLogin}
                        type={"text"}
                        placeholder={channel.placeholder}
                        name="Socials"
                        value={
                          input.Socials.filter(
                            (soc: any) => soc.name === channel.name
                          ).url
                        }
                        onChange={(e) => onChangeSocials(e, channel.name)}
                      />
                    </div>
                  </div>
                ))}
              <div className="col-lg-6 col-12 mt-4">
                <div
                  style={{
                    display: channelShown.every((channel) => channel.shown)
                      ? "none"
                      : "flex",
                  }}
                  className="main-submit-input-suffix"
                  onClick={() => setChannelPopup(true)}
                >
                  <span className="main-submit-input-suffix-logo">
                    {/* <PlusCircle className="green" fill="#058499" color="#fff" /> */}
                    <img
                      src="/img/media/plus-circle.png"
                      className="main-submit-media"
                    />
                  </span>
                  <input
                    disabled={true}
                    type={"text"}
                    placeholder="Add channel"
                  />
                </div>
              </div>
            </>
          </div>
        </BoxWhiteGreenShadow>
        <br />
        <h3 className="main-submit-section-header mb-3">
          Affiliate/Referral Program
        </h3>
        <BoxWhiteGreenShadow className="px-4 py-5">
          <h5 className="mb-3 kindoftitle">
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
        </BoxWhiteGreenShadow>
        <br />
        <div className="main-submit-box">
          <ButtonBlue disabled={notLogin} onClick={onSubmitForm}>
            Submit your project
          </ButtonBlue>
        </div>
      </section>
      <LoginPopup
        isVisible={isVisible}
        setVisible={setIsVisible}
        onExit={loginError}
      />
      <ChannelPopup />
    </>
  );
};

export default Submit;
