import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import PersonalCenter from "../../components/PersonalCenter";

import { Tabs, Modal, Upload, Input, message } from "antd";
import fj from "../../assets/img/text/fj.webp";
import { PlusCircleFilled } from "@ant-design/icons";
import searchimg from "../../assets/img/header/search_btn.png";
import add from "../../assets/img/user/add.png";
import searchmini from "../../assets/img/searchmini.png";
import hook from "../../assets/img/user/hook.png";
import {
  getProfessionalLists,
  getProfessionalAdd,
  getCompaniesFoundSearch,
  getProfessionalDel,
} from "../../requests";
import useDebounceHook from "../../utils/useDebounceHook";
import { BASE_URL } from "../../requests/api";

import "./authentication.less";
const { TabPane } = Tabs;
const { Dragger } = Upload;
const Authentication = (props) => {
  const { t } = useTranslation();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [whoPup, setWhoPup] = useState(1);
  
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [searchList, setSearchList] = useState([]);
  
  const [searchVal, setSearchVal] = useState("");
  
  const [isSearch, setIsSearch] = useState(true);
  
  const [entrepreneurList, setEntrepreneurList] = useState([]);
  
  const [investorsList, setInvestorsList] = useState([]);
  const searchDebounceVal = useDebounceHook(searchVal, 500);
  
  const [addImg, setAddImg] = useState("");
  
  const [email, setEmail] = useState("");
  
  const [nameObj, setNameObj] = useState({});

  useEffect(() => {
    getProfessionalListsData(1);
    getProfessionalListsData(2);
  }, []);
  useEffect(() => {
    if (!searchDebounceVal) return setSearchList([]);
    if (!isSearch) return setSearchList([]);
    getCompaniesFoundSearch({ type: whoPup, search: searchDebounceVal }).then(
      (res) => {
        if (res.code === 1 && res.data) {
          setSearchList(res.data);
        }
      }
    );
  }, [searchDebounceVal]);
  const emailChange = ({ target: { value } }) => {
    setEmail(value);
  };
  const getProfessionalListsData = (type) => {
    getProfessionalLists({ type }).then((res) => {
      console.log("列表", res);
      if (res.code === 1 && res.data) {
        if (type === 1) {
          setEntrepreneurList(res.data);
        } else {
          setInvestorsList(res.data);
        }
      }
    });
  };
  const showModal = (key) => {
    setWhoPup(key);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (!addImg) return message.warning(t("Please upload a picture"));
    if (whoPup === 1) {
      if (!nameObj.name)
        return message.warning(t("Please select a company name"));
    } else {
      if (!nameObj.name)
        return message.warning(t("Please select an institution name"));
    }
    if (!email) return message.warning(t("please enter your email"));
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email))
      return message.warning(t("E-mail format is incorrect"));
    getProfessionalAdd({
      type: whoPup,
      business_card: addImg,
      companies: nameObj.name,
      companies_id: nameObj.id,
      email: email,
    }).then((res) => {
      if (res.code === 1) {
        handleCancel();
        setIsModalVisible(false);
        showSuccess();
        if (whoPup === 1) {
          getProfessionalListsData(1);
        } else {
          getProfessionalListsData(2);
        }
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        message.error(res.msg);
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAddImg("");
    setNameObj({});
    setEmail("");
    setSearchVal("");
  };

  
  const uploadPicture = {
    name: "file",
    action: BASE_URL + "api/user/upload_file",
    headers: {
      token: localStorage.getItem("TOKEY"),
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";

      if (!isJpgOrPng) {
        message.error(t("The picture format"));
      }

      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isLt2M) {
        message.error(t("Image size cannot exceed"));
      }

      return isJpgOrPng && isLt2M;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        if (info.file.response.code === 1) {
          setAddImg(info.file.response.data);
        }
      }
    },
  };
  const showSuccess = () => {
    setIsSuccess(true);
  };
  const cancelSuccess = () => {
    setIsSuccess(false);
    setSearchVal("");
    setNameObj({});
  };
  const handleOkSuccess = () => {
    cancelSuccess();
  };

  const searchValChange = ({ target: { value } }) => {
    setSearchVal(value);
    setIsSearch(true);
  };
  const chooseItem = (item) => {
    setSearchVal(item.name);
    setNameObj(item);
    setIsSearch(false);
  };
  const refusalDelete = (id) => {
    getProfessionalDel({ id }).then((res) => {
      console.log("aaaaa", res);
      if (res.code === 1) {
        if (whoPup === 1) {
          getProfessionalListsData(1);
        } else {
          getProfessionalListsData(2);
        }
      }
    });
  };
  return (
    <div className="authentication">
      <HeaderPersonal props={props} />
      {/* <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/myinfo", title: t("my information") },
          { to: "", title: t("Professional identity certification") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      /> */}
      <div className="identity_con">
        <div className="con">
          <div className="left">
            {/* <div className="mini_box"></div>
            {t("Authentication")} */}
            <PersonalCenter props={props} />
          </div>
          <div className="right">
            <div className="right_top">
              <span>{t("my information")}</span>
              <span className="icon">&gt;</span>
              <span>{t("Professional identity certification")}</span>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab={t("entrepreneur")} key="1" className="tab">
                {entrepreneurList.map((item, i) => {
                  return (
                    <div key={i}>
                      {item.status === 2 ? (
                        <div className="business_card">
                          <img src={item.business_card} alt="" />
                        </div>
                      ) : null}
                      {item.status === 1 ? (
                        <div className="business_card business_card_mask">
                          <img src={item.business_card} alt="" />
                          <div className="card_mask">{t("under review")}</div>
                        </div>
                      ) : null}
                      {item.status === 3 ? (
                        <div className="business_card business_card_mask business_card_mask_failed">
                          <img src={item.business_card} alt="" />
                          <div className="card_mask">
                            <div>{t("add failed")}</div>
                            <div className="refusal_reasons">
                              {t(item.refusal_reasons)}
                            </div>
                            <div
                              className="refusal_btn"
                              onClick={() => refusalDelete(item.id)}
                            >
                              {t("delete")}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <div
                  className="business_card add_attest"
                  onClick={() => showModal(1)}
                >
                  <div className="mini_box"></div>
                  <div className="add_attest_text">
                    <PlusCircleFilled className="add_icon" />
                    <span>{t("Add Certified Entrepreneur")}</span>
                  </div>
                  <img src={searchimg} alt="" className="rb" />
                </div>
              </TabPane>
              <TabPane tab={t("Investors")} key="2" className="tab">
                {investorsList.map((item, i) => {
                  return (
                    <div key={i}>
                      {item.status === 2 ? (
                        <div className="business_card">
                          <img src={item.business_card} alt="" />
                        </div>
                      ) : null}
                      {item.status === 1 ? (
                        <div className="business_card business_card_mask">
                          <img src={item.business_card} alt="" />
                          <div className="card_mask">{t("under review")}</div>
                        </div>
                      ) : null}
                      {item.status === 3 ? (
                        <div className="business_card business_card_mask business_card_mask_failed">
                          <img src={item.business_card} alt="" />
                          <div className="card_mask">
                            <div>{t("add failed")}</div>
                            <div className="refusal_reasons">
                              {t(item.refusal_reasons)}
                            </div>
                            <div
                              className="refusal_btn"
                              onClick={() => refusalDelete(item.id)}
                            >
                              {t("delete")}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <div
                  className="business_card add_attest"
                  onClick={() => showModal(2)}
                >
                  <div className="mini_box"></div>
                  <div className="add_attest_text">
                    <PlusCircleFilled className="add_icon" />
                    <span>{t("Add Certified Entrepreneur")}</span>
                  </div>
                  <img src={searchimg} alt="" className="rb" />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer props={props} />

      {/* 认证弹窗 */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        centered={true}
        closable={false}
        footer={null}
        className="authentication_popup"
      >
        <div className="title">
          <div className="mini_box"></div>
          <span className="text">{t("add authentication")}</span>
        </div>
        <div className="add_img">
          <Dragger
            {...uploadPicture}
            className="add_img_dragger"
            showUploadList={false}
          >
            {addImg ? (
              <div className="show_add_img">
                <img src={addImg} alt="" />
              </div>
            ) : (
              <div className="dragger_con">
                <img src={add} alt="" />
                <p className="upload_text">
                  {t("Click or drag and drop the business card here to upload")}
                </p>
                <p className="sizi_text">
                  {t(
                    "The image size is limited to PNG, JPG, JPEG formats within 20M"
                  )}
                </p>
              </div>
            )}
          </Dragger>
        </div>
        <div className="certified_identity">{t("certified identity")}</div>
        <div className="choose">
          <div className="choose_left">{t("Authentication type")}</div>
          <div className="choose_right">
            {whoPup === 1 ? t("entrepreneur") : t("Investors")}
          </div>
        </div>
        <div className="choose_fu">
          <div className="choose choose_search">
            <div className="choose_left">
              {whoPup === 1 ? t("company name") : t("Institution name")}
            </div>
            <div className="choose_right">
              <div className="choose_right_con">
                <div className="choose_right_input_list">
                  <Input
                    placeholder={
                      whoPup === 1
                        ? t("Please enter company name")
                        : t("Please enter the institution name")
                    }
                    bordered={false}
                    allowClear
                    value={searchVal}
                    onChange={searchValChange}
                    prefix={
                      <img
                        src={searchmini}
                        alt=""
                        className="search_img_qian"
                      />
                    }
                    suffix={<img src={searchmini} className="search_img" />}
                  />
                </div>
                <div className="choose_right_list">
                  {searchList.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="search_item"
                        onClick={() => chooseItem(item)}
                      >
                        <img src={searchmini} alt="" className="search_img" />
                        <span>{item.name}</span>{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="choose">
          <div className="choose_left">{t("Enterprise mailbox")}</div>
          <div className="choose_right">
            <Input
              placeholder={t("Please enter business email")}
              bordered={false}
              value={email}
              onChange={emailChange}
            />
          </div>
        </div>
        <div className="hint">{t("hint")}</div>
        <p className="process">{t("Identity authentication process")}</p>
        <div className="btn">
          <div className="submit" onClick={handleOk}>
            {t("Submit review")}
          </div>
        </div>
      </Modal>

      {/* 提交成功后的弹窗 */}
      <Modal
        visible={isSuccess}
        onCancel={cancelSuccess}
        centered={true}
        closable={false}
        footer={null}
        className="success_popup"
      >
        <img src={hook} alt="" className="hook_img" />
        <p className="upload_successful_text">
          {t("Identity upload successful")}
        </p>
        <div className="btn" onClick={handleOkSuccess}>
          {t("OK (return after 5S)")}
        </div>
        <div className="bg_img"></div>
      </Modal>
    </div>
  );
};
export default Authentication;
