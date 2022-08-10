import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select, Input } from "antd";
import { Auth } from "../../requests/auth";
import { getUserInfo, getLogout } from "../../requests";
import UserDrawer from "../UserDrawer";

import logo from "../../assets/img/logo.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import searchimg from "../../assets/img/searchimg.png";
import caiboximg from "../../assets/img/cai_box.png";
import "./headerpersonal.less";

const { Option } = Select;
const HeaderPersonal = ({ props }) => {
  const { t, i18n } = useTranslation();
  const lang = [
    { key: "en", title: "Eg" },
    { key: "cn", title: "中" },
  ];

  
  const [activeLang, setActiveLang] = useState(
    localStorage.getItem("lang") || "en"
  );
  
  const [isLogin, setIsLogin] = useState(false);
  
  const [userInfo, setUserInfo] = useState({});

  const [showSearchInput, setShowSearchInput] = useState(true);
  const pathName = [
    "/home/list/:key?",
    "/mechanism/:src?",
    "/company/:src?",
    "/figure/:src?",
    "/activity/:src?",
  ];
  useEffect(() => {
    if (Auth.token) {
      getUserInfoData();
      setIsLogin(true);
    }
  }, []);
  useEffect(() => {
    pathName.forEach(item=>{
      if(item === props.match.path) {
        setShowSearchInput(false) ;
        return;
      }
    })
  }, [props]);

  const handleChangeLang = (value) => {
    setActiveLang(value);
    
    localStorage.setItem("lang", value);
    window.location.reload();
  };
  const getUserInfoData = () => {
    getUserInfo().then((res) => {
      if (res.code === 1) {
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }
    });
  };

  const goHome = () => {
    props.history.push("/");
  };

  const goLogin = () => {
    props.history.push("/login");
  };
  const keyDownFn = ({ target: { value } }) => {
    props.history.push(`/home/list/${value}`);
  };
  return (
    <div className="headerpersonal">
      <div className="flex_box">
        <div className="logo" onClick={goHome}>
            <img src={logo} alt="" />
          </div>
        {/* <div className="search" style={{display:showSearchInput ? "block" : "none"}}>
          <div className="input">
            <Input
              prefix={<img src={searchimg} alt="" className="searchimg" />}
              className="search_input"
              placeholder={t("Find you want")}
              bordered={false}
              onPressEnter={keyDownFn}
              allowClear
            />
            <img src={caiboximg} alt="" className="cai_box" />
          </div>
        </div> */}
      </div>
      <div className="personal_info">
        {isLogin ? (
          <>
            <div className="personal">
              <img
                src={userInfo.avatar ? userInfo.avatar : defaultavatar}
                alt=""
              />
              <span>{userInfo.nickname}</span>
            </div>
            {/* <UserDrawer props={props} userInfo={userInfo} /> */}
          </>
        ) : (
          <div className="sign_in" onClick={goLogin}>
            {t("Sign in")}
          </div>
        )}
        <div className="lang">
          <Select
            defaultValue={activeLang}
            className="lang_select"
            onChange={handleChangeLang}
          >
            {lang.map((item, i) => {
              return (
                <Option key={i} value={item.key}>
                  {item.title}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};
export default HeaderPersonal;
