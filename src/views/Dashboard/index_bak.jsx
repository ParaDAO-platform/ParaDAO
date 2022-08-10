import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderLogo from "../../components/HeaderLogo";
import Footer from "../../components/Footer";
import { Input, Statistic } from "antd";
import useDebounceHook from "../../utils/useDebounceHook";
import { Bar, Column } from "@ant-design/plots";

import searchicon from "../../assets/img/personalcenter/search.svg";

import "./dashboard.less";
const Dashboard = (props) => {
  const { t } = useTranslation();
  // 公司列表
  const [companyList, setCompanyList] = useState([
    {
      id: 0,
      title: "LootRush",
    },
    {
      id: 1,
      title: "Untamed Planet",
    },
    {
      id: 2,
      title: "Klein Finance",
    },
    {
      id: 3,
      title: "Angular Finance",
    },
    {
      id: 4,
      title: "InfiniGods",
    },
  ]);
  // 展示的公司列表
  const [shwoCompanyList, setShwoCompanyList] = useState(companyList);
  // 选中的公司
  const [activeCompany, setActiveCompany] = useState(0);
  // 搜索输入框内容
  const [searchVal, setSearchVal] = useState("");
  //  当前轮次
  const [currentRound, setCurrentRound] = useState("D轮");
  // 总投资机构数量
  const [investmentInstitutions, setInvestmentInstitutions] = useState(1000);
  // 总融资金额
  const [financing, setFinancing] = useState(150511);
  // 市值
  const [marketValue, setMarketValue] = useState(10000);
  // 融资事件
  const [financingEventList, setFinancingEventList] = useState([
    { id: 0, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 1, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 2, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 3, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 4, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 5, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 6, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 7, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
    { id: 8, time: "1653297979", a: "A轮", b: "名称", c: "4500000" },
  ]);

  // 搜索延迟内容
  const debounceText = useDebounceHook(searchVal, 200);

  const data = [
    {
      type: "天使轮",
      sales: 38,
    },
    {
      type: "A轮",
      sales: 52,
    },
    {
      type: "B轮",
      sales: 61,
    },
    {
      type: "C轮",
      sales: 145,
    },
    {
      type: "D轮",
      sales: 48,
    },
    {
      type: "E轮",
      sales: 38,
    },
    {
      type: "F轮",
      sales: 38,
    },
    {
      type: "H轮",
      sales: 38,
    },
  ];
  const config = {
    data: data,
    xField: "sales",
    yField: "type",
    // seriesField: "type",
    // color: ({ type }) => {
    //   return type === "美容洗护" ? "#FAAD14" : "#5B8FF9";
    // },
    // legend: false,
    meta: {
      type: {
        alias: "轮次",
      },
      sales: {
        alias: "数量",
      },
    },
  };

  const dataTwo = [
    {
      name: "AAAAA",
      月份: "1月",
      月均降雨量: 18.9,
    },
    {
      name: "AAAAA",
      月份: "2月",
      月均降雨量: 28.8,
    },
    {
      name: "AAAAA",
      月份: "3月",
      月均降雨量: 39.3,
    },
    {
      name: "AAAAA",
      月份: "4月",
      月均降雨量: 81.4,
    },
    {
      name: "AAAAA",
      月份: "5月",
      月均降雨量: 47,
    },
    {
      name: "AAAAA",
      月份: "6月",
      月均降雨量: 20.3,
    },
    {
      name: "AAAAA",
      月份: "7月",
      月均降雨量: 24,
    },
    {
      name: "AAAAA",
      月份: "8月",
      月均降雨量: 35.6,
    },
    {
      name: "BBBBB",
      月份: "1月",
      月均降雨量: 12.4,
    },
    {
      name: "BBBBB",
      月份: "2月",
      月均降雨量: 23.2,
    },
    {
      name: "BBBBB",
      月份: "3月",
      月均降雨量: 34.5,
    },
    {
      name: "BBBBB",
      月份: "4月",
      月均降雨量: 99.7,
    },
    {
      name: "BBBBB",
      月份: "5月",
      月均降雨量: 52.6,
    },
    {
      name: "BBBBB",
      月份: "6月",
      月均降雨量: 35.5,
    },
    {
      name: "BBBBB",
      月份: "7月",
      月均降雨量: 37.4,
    },
    {
      name: "BBBBB",
      月份: "8月",
      月均降雨量: 42.4,
    },
  ];
  const configTwo = {
    data: dataTwo,
    isGroup: true,
    xField: "月份",
    yField: "月均降雨量",
    seriesField: "name",
    /** 设置颜色 */
    color: ["#5087ec", "#68bbc4"],
    /** 设置间距 */
    marginRatio: 0,
    columnStyle: {
      lineWidth: 0,
    },
  };

  useEffect(() => {}, []);
  useEffect(() => {
    let arr = [];
    companyList.forEach((item) => {
      if (item.title.toLowerCase().indexOf(debounceText.toLowerCase()) !== -1) {
        arr.push(item);
      }
      setShwoCompanyList(arr);
    });
  }, [debounceText]);
  const searchValChange = ({ target: { value } }) => {
    setSearchVal(value);
  };

  return (
    <div className="dashboard">
      <HeaderLogo props={props} />
      <div className="dashboard_con">
        <div className="con_left">
          <div className="search">
            <Input
              placeholder={t("Please enter company name")}
              prefix={<img src={searchicon} className="search_icon" />}
              className="search_input"
              bordered={false}
              value={searchVal}
              onChange={searchValChange}
            />
          </div>
          <div className="con_left_list">
            {shwoCompanyList.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    activeCompany === item.id
                      ? "con_left_list_item con_left_list_item_active"
                      : "con_left_list_item"
                  }
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="con_right">
          <div className="one_line">
            <div className="one_box">
              <Statistic
                title={t("current round")}
                value={currentRound}
                className="one_box_stat"
              />
            </div>
            <div className="one_box">
              <Statistic
                title={t("Total number of investment institutions")}
                value={investmentInstitutions}
                className="one_box_stat"
              />
            </div>
            <div className="one_box">
              <Statistic
                title={t("total financing amount")}
                value={financing}
                className="one_box_stat"
              />
            </div>
            <div className="one_box">
              <Statistic
                title={t("market value")}
                value={marketValue}
                className="one_box_stat"
              />
            </div>
          </div>
          <div className="two_line">
            <div className="round_amount">
              <div className="two_top">
                <div className="two_left">{t("Amount of financing round")}</div>
              </div>
              <div className="charts">
                <Bar {...config} />
              </div>
            </div>
            <div className="financing_funds">
              <div className="two_top">
                <div className="two_left">{t("Amount of financing")}</div>
                <div className="two_right">
                  <span>{t("Moon")}</span>
                  <span>{t("Season")}</span>
                  <span>{t("Year")}</span>
                </div>
              </div>
              <div className="charts">
                <Column {...configTwo} />
              </div>
            </div>
          </div>
          <div className="therr_line">
            <div className="financing_event">
              <div className="title">{t("financing event")}</div>
              <div className="event_con">
                {financingEventList.map((item) => {
                  return (
                    <div key={item.id} className="event_item">
                      <div className="event_item_left"></div>
                      <div className="event_item_right"></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="projects">
              <div className="title">
                {t("Projects and Technology Development Events")}
              </div>
            </div>
            <div className="operational">
              <div className="title">{t("Operational Development Events")}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default Dashboard;
