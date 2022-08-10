import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import soon from "../../assets/img/soon.png";

import "./comingsoon.less";
const ComingSoon = ({ props }) => {
  const { t } = useTranslation();
  useEffect(() => {}, []);
  return (
    <div className="comingsoon">
      <div className="soon_one"></div>
      <div className="soon_two"></div>
      <div className="soon_therr"></div>
      <div className="soon_four"></div>
      <div className="soon_box">
        <div className="text">{t("Coming soon")}</div>
        <img src={soon} alt="" />
      </div>
    </div>
  );
};
export default ComingSoon;
