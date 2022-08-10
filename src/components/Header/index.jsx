import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select, Input } from "antd";
import { Auth } from "../../requests/auth";
import { getUserInfo, getLogout } from "../../requests";
import UserDrawer from "../UserDrawer";

import logo from "../../assets/img/logo.png";
import arrow from "../../assets/img/header/arrow.png";
import banner from "../../assets/img/header/banner.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import companyicon from "../../assets/img/menuicon/companyicon.png";
import companyiconactive from "../../assets/img/menuicon/companyiconactive.png";
import eventicon from "../../assets/img/menuicon/eventicon.png";
import eventiconactive from "../../assets/img/menuicon/eventiconactive.png";
import figureicon from "../../assets/img/menuicon/figureicon.png";
import figureiconactiveatar from "../../assets/img/menuicon/figureiconactive.png";
import homeicon from "../../assets/img/menuicon/homeicon.png";
import homeiconactive from "../../assets/img/menuicon/homeiconactive.png";
import libraryicon from "../../assets/img/menuicon/libraryicon.png";
import libraryiconactive from "../../assets/img/menuicon/libraryiconactive.png";
import mechanismicon from "../../assets/img/menuicon/mechanismicon.png";
import mechanismiconactive from "../../assets/img/menuicon/mechanismiconactive.png";
import report from "../../assets/img/menuicon/report.png";
import reportactive from "../../assets/img/menuicon/reportactive.png";
import activity from "../../assets/img/menuicon/activity.png";
import activityactive from "../../assets/img/menuicon/activityactive.png";
import searchimg from "../../assets/img/searchimg.png";
import caiboximg from "../../assets/img/cai_box.png";

import "./header.less";

const { Option } = Select;

const Header = ({ props }) => {
  const { t, i18n } = useTranslation();
  const lang = [
    { key: "en", title: "Eg" },
    { key: "cn", title: "中" },
  ];

  const menu = [
    {
      key: "/",
      title: t("Home"),
      icon: homeicon,
      iconActive: homeiconactive,
    },
    {
      key: "/library",
      title: t("Library"),
      icon: libraryicon,
      iconActive: libraryiconactive,
    },
    {
      key: "/mechanism",
      title: t("Mechanism"),
      icon: mechanismicon,
      iconActive: mechanismiconactive,
    },
    {
      key: "/company",
      title: t("Company"),
      icon: companyicon,
      iconActive: companyiconactive,
    },
    {
      key: "/figure",
      title: t("Figure"),
      icon: figureicon,
      iconActive: figureiconactiveatar,
    },
    {
      key: "/event",
      title: t("Event"),
      icon: eventicon,
      iconActive: eventiconactive,
    },
    {
      key: "/activity",
      title: t("Activity"),
      icon: activity,
      iconActive: activityactive,
    },
    {
      key: "/report",
      title: t("Report"),
      icon: report,
      iconActive: reportactive,
    },
  ];
  
  const [activeLang, setActiveLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  
  const [activeMenu, setActiveMenu] = useState(props.location.pathname);
  
  const [isLogin, setIsLogin] = useState(false);
  
  const [userInfo, setUserInfo] = useState({});
  
  const [mouseActive, setMouseActive] = useState("");

  useEffect(() => {
    if (Auth.token) {
      getUserInfoData();
      setIsLogin(true);
    }
  }, []);
  useEffect(() => {
    let arr = activeMenu.split("/");
    let newPath = "/" + arr[1];
    setActiveMenu(newPath);
  }, [props.location.pathname]);

  
  
  
  const handleChangeLang = (value) => {
    setActiveLang(value);
    
    localStorage.setItem("lang", value);
    window.location.reload();
  };
  const goLogin = () => {
    props.history.push("/login");
  };
  const goHome = () => {
    props.history.push("/");
  };
  const getUserInfoData = () => {
    getUserInfo().then((res) => {
      if (res.code === 1) {
        setUserInfo(res.data);
      }
    });
  };
  const mouseEnterMent = (obj) => {
    setMouseActive(obj.key);
  };
  const mouseLeaveMent = () => {
    setMouseActive("");
  };
  const keyDownFn = ({ target: { value } }) => {
    props.history.push(`/home/list/${value}`);
  };
  return (
    <div className="header">
      <div className="header_left">
        <div className="logo" onClick={goHome}>
          <img src={logo} alt="" />
        </div>
        <div className="info">
          <div className="menu">
            <div className="menu_con">
              {menu.map((item, i) => {
                return (
                  <Link
                    key={i}
                    className={
                      activeMenu === item.key
                        ? "menu_item menu_item_active"
                        : "menu_item"
                    }
                    to={item.key}
                    onMouseEnter={() => mouseEnterMent(item)}
                    onMouseLeave={() => mouseLeaveMent()}
                  >
                    <img
                      src={
                        mouseActive === item.key || activeMenu === item.key
                          ? item.iconActive
                          : item.icon
                      }
                      alt=""
                    />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="information">
            <div className="title">
              <div className="title_box"></div>
              <div className="title_blockchain">
                {/* {t("Fundarising In Web")} */}
                Fundraising In Web 3.0
              </div>
            </div>
            {/* <div className="text">{t("Fundarising In Web")}</div> */}
            <div className="search">
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
            </div>
          </div>
        </div>
      </div>
      <div className="header_right">
        <div className="color_box">
          {/* <div className="color_box_one"></div>
          <div className="color_box_two"></div>
          <div className="color_box_therr"></div>
          <div className="color_box_four"></div> */}
          <img src={banner} alt="" className="color_box_img" />
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
    </div>
  );
};
export default Header;
