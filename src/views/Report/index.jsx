import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import ComingSoon from "../../components/ComingSoon";

import "./report.less";
const Report = (props) => {
  const { t } = useTranslation();
  useEffect(() => {}, []);
  return (
    <div className="report">
      <HeaderPersonal props={props} />
      <div className="report_con">
        <ComingSoon props={props} />
      </div>
      <Footer props={props} />
    </div>
  );
};
export default Report;
