import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import zhCN from "antd/es/locale/zh_CN";
import en_US from "antd/es/locale/en_US";
import { ConfigProvider } from "antd";

const lang = localStorage.getItem("lang") || "en";
ReactDOM.render(
  <ConfigProvider locale={lang === "cn" ? zhCN : en_US}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
