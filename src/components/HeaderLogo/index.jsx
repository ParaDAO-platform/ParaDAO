import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

import logo from "../../assets/img/logo.png";

import "./headerlogo.less";

const { Option } = Select;
const HeaderLogo = ({ props }) => {
  const { t, i18n } = useTranslation();
  const lang = [
    { key: "en", title: "Eg" },
    { key: "cn", title: "中" },
  ];

  
  const [activeLang, setActiveLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  const handleChangeLang = (value) => {
    setActiveLang(value);
    
    localStorage.setItem("lang", value);
    window.location.reload();
  };

  const goHome = () => {
    props.history.push("/");
  };

  return (
    <div className="headerlogo">
      <img src={logo} alt="" className="logo" onClick={goHome} />
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
  );
};
export default HeaderLogo;
