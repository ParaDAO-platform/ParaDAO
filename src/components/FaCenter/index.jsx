import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./facenter.less";
const FaCenter = ({ props }) => {
  const { t } = useTranslation();
  const menu = [
    {
      key: "/famanagementcenter/overview",
      title: t("Overview"),
    },
    {
      key: "/famanagementcenter/serviceitems",
      title: t("service items"),
    },
  ];
  
  
  useEffect(() => {}, []);
  
  
  
  
  
  
  
  
  return (
    <div className="facenter">
      <div className="facenter_top">
        <div className="mini_box"></div>
        {t("FA management system")}
      </div>
      <div className="facenter_menu">
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
export default FaCenter;
