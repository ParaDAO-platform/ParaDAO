import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./memberCenter.less";
const MemberCenter = ({ props }) => {
  const { t } = useTranslation();
  const menu = [
    {
      key: "/membercenter/mymember",
      title: t("my member"),
    },
    {
      key: "/membercenter/accountmanagement",
      title: t("Sub-account management"),
    },
  ];

  useEffect(() => {}, []);

  return (
    <div className="personalcenter">
      <div className="personalcenter_top">
        <div className="mini_box"></div>
        {t("Member Centre")}
      </div>
      <div className="personalcenter_menu">
        {menu.map((ele) => {
          return (
            <NavLink
              className="menu_list"
              activeClassName="menu_list_active"
              key={ele.key}
              to={ele.key}
            >
              <span>{ele.title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default MemberCenter;
