import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./personalcenter.less";
const PersonalCenter = ({ props }) => {
  const { t } = useTranslation();
  const menu = [
    {
      key: "/personalcenter/myinfo",
      title: t("my information"),
    },
    {
      key: "/personalcenter/mylibrary",
      title: t("upload and download"),
    },
    {
      key: "/personalcenter/myfocus",
      title: t("my focus"),
    },
    {
      key: "/personalcenter/myscores",
      title: t("My scores"),
    },
    {
      key: "/personalcenter/mybrowsinghistory",
      title: t("Browsing history"),
    },
    {
      key: "/personalcenter/messagecenter",
      title: t("Message Center"),
    },
    {
      key: "/personalcenter/basicsettings",
      title: t("Basic Settings"),
    },
  ];

  useEffect(() => {}, []);

  return (
    <div className="personalcenter">
      <div className="personalcenter_top">
        <div className="mini_box"></div>
        {t("personal center")}
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
export default PersonalCenter;
