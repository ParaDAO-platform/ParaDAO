import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logobom from "../../assets/img/logobom.png";
import telegram from "../../assets/img/telegram.png";
import twitter from "../../assets/img/twitter.png";
import faq from "../../assets/img/FAQ.png";

import "./footer.less";
const Footer = ({ props }) => {
  const { t } = useTranslation();
  const menu = [
    {
      key: "/",
      title: t("Home"),
    },
    {
      key: "/library",
      title: t("Library"),
    },
    {
      key: "/mechanism",
      title: t("Mechanism"),
    },
    {
      key: "/company",
      title: t("Company"),
    },
    {
      key: "/figure",
      title: t("Figure"),
    },
    {
      key: "/event",
      title: t("Event"),
    },
    {
      key: "/report",
      title: t("Report"),
    },
  ];
  
  const [activeMenu, setActiveMenu] = useState(props.location.pathname);
  useEffect(() => {}, []);

  useEffect(() => {
    let arr = activeMenu.split("/");
    let newPath = "/" + arr[1];
    setActiveMenu(newPath);
  }, [props.location.pathname]);
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_con">
          <div className="con_left">
            <img src={logobom} alt="" />
          </div>
          <div className="con_right">
            <div className="right_top">
              <a href="#" target="_blank">
                <img src={faq} alt="" />
              </a>
              <a href="#" target="_blank">
                <img src={telegram} alt="" />
              </a>
              <a href="#" target="_blank">
                <img src={twitter} alt="" />
              </a>
            </div>
            <div className="right_bom">
              {menu.map((item, i) => {
                return (
                  <Link
                    key={i}
                    to={item.key}
                    className={
                      activeMenu === item.key
                        ? "right_bom_item right_bom_item_active"
                        : "right_bom_item"
                    }
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bom">
        <span>&copy;2022 &nbsp;&nbsp; Para DAO</span>
      </div>
    </div>
  );
};
export default Footer;
