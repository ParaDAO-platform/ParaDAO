import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Drawer } from "antd";
import { getLogout } from "../../requests";
import { Auth } from "../../requests/auth.js";

import avatar from "../../assets/img/header/avatar.png";
import account from "../../assets/img/headerlist/account.png";
import accountac from "../../assets/img/headerlist/accountac.png";

import data from "../../assets/img/headerlist/data.png";
import dataac from "../../assets/img/headerlist/dataac.png";

import homepage from "../../assets/img/headerlist/homepage.png";
import homepageac from "../../assets/img/headerlist/homepageac.png";
import member from "../../assets/img/headerlist/member.png";
import memberac from "../../assets/img/headerlist/memberac.png";
import fasystem from "../../assets/img/headerlist/fasystem.png.png";
import fasystemac from "../../assets/img/headerlist/fasystemac.png";

import "./userdrawer.less";
const UserDrawer = ({ props, userInfo }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const menu = [
    {
      key: "/personalcenter",
      title: t("personal center"),
      icon: homepage,
      acIcon: homepageac,
    },
    {
      key: "/dashboard",
      title: t("data tracking"),
      icon: data,
      acIcon: dataac,
    },
    {
      key: "/membercenter/mymember",
      title: t("Member Centre"),
      icon: member,
      acIcon: memberac,
    },
    {
      key: "/famanagementcenter",
      title: t("FA management system"),
      icon: fasystem,
      acIcon: fasystemac,
    },
    
    
    
    
    
    
  ];
  
  const [activeMenu, setActiveMenu] = useState("");
  
  const [mouseActive, setMouseActive] = useState("");
  useEffect(() => {}, []);
  useEffect(() => {
    let arr = props.location.pathname.split("/");
    let newPath = "/" + arr[1];
    setActiveMenu(newPath);
  }, [props.location.pathname]);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  
  const signOut = () => {
    getLogout();
    Auth.clear();
    localStorage.removeItem("userInfo");
    window.location = "/";
  };
  const mouseEnterMent = (item) => {
    setMouseActive(item.key);
  };
  const mouseLeaveMent = () => {
    setMouseActive("");
  };
  const menuClick = (item) => {
    setActiveMenu(item.key);
  };
  return (
    <div className="userdrawer">
      <div className="userdrawer_title" onClick={showDrawer}>
        {t("personal center")}
      </div>
      <Drawer
        placement="right"
        onClose={onClose}
        visible={visible}
        closable={false}
        className="userdrawer_drawer"
      >
        <div className="user_info">
          <div className="user_info_left">
            <img src={userInfo.avatar ? userInfo.avatar : avatar} alt="" />
          </div>
          <div className="user_info_right">
            <div className="user_title">
              <div className="title_min_box"></div>
              <div className="title_t">
                {userInfo.nickname}123123123132312323123
              </div>
            </div>
            <div
              className={
                userInfo.kyc === 2
                  ? "certification"
                  : "certification not_certified"
              }
            >
              {userInfo.kyc === 2 ? t("verified") : t("not certified")}
            </div>
          </div>
        </div>
        <div className="xian"></div>
        <div className="user_list">
          <div className="list_min_box"></div>

          {menu.map((ele) => {
            return ele.key === "/personalcenter" ? (
              <NavLink
                className="menu_list"
                activeClassName="menu_list_active"
                key={ele.key}
                to={ele.key}
                onMouseEnter={() => mouseEnterMent(ele)}
                onMouseLeave={() => mouseLeaveMent()}
                onClick={() => {
                  menuClick(ele);
                }}
              >
                <div className="menu_list_item">
                  <div className="menu_list_left">
                    <img
                      src={
                        activeMenu === ele.key || mouseActive === ele.key
                          ? ele.acIcon
                          : ele.icon
                      }
                      alt=""
                      className="list_img"
                    />
                    <span>{ele.title}</span>
                  </div>
                  <div className="menu_list_right">
                    {userInfo.kyc === 2 ? (
                      <span className="kyc">KYC</span>
                    ) : null}
                  </div>
                </div>
              </NavLink>
            ) : (
              <NavLink
                className="menu_list"
                activeClassName="menu_list_active"
                key={ele.key}
                to={ele.key}
                onMouseEnter={() => mouseEnterMent(ele)}
                onMouseLeave={() => mouseLeaveMent()}
                onClick={() => {
                  menuClick(ele);
                }}
              >
                <img
                  src={
                    activeMenu === ele.key || mouseActive === ele.key
                      ? ele.acIcon
                      : ele.icon
                  }
                  alt=""
                  className="list_img"
                />
                <span>{ele.title}</span>
              </NavLink>
            );
          })}
        </div>
        <div className="sign_out" onClick={signOut}>
          {t("sign out")}
        </div>
      </Drawer>
    </div>
  );
};
export default UserDrawer;
