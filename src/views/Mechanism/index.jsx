import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import { message, Statistic, Pagination } from "antd";
import { getInvestorsList, getSearchInvestors } from "../../requests";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import SearchInput from "../../components/SearchInput";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import digitalconversion from "../../utils/digitalconversion";
import defaultavatar from "../../assets/img/defaultavatar.png";

import "./mechanism.less";
import { log } from "@craco/craco/lib/logger";
const Mechanism = (props) => {
  const { t } = useTranslation();
  const { src } = props.match.params;
  
  const invest = [
    { id: 30, title: t("unlimited"), key: "" },
    {
      id: 0,
      title: "Seed",
      key: "Seed",
    },
    {
      id: 1,
      title: "Series A",
      key: "Series A",
    },
    {
      id: 2,
      title: "Strategic",
      key: "Strategic",
    },
    {
      id: 3,
      title: "Series B",
      key: "Series B",
    },
    {
      id: 4,
      title: "Treasury Diversification",
      key: "Treasury Diversification",
    },
    {
      id: 5,
      title: "Series D",
      key: "Series D",
    },
    {
      id: 6,
      title: "Pre-Seed",
      key: "Pre-Seed",
    },
    {
      id: 7,
      title: "Extended Seed",
      key: "Extended Seed",
    },
    {
      id: 8,
      title: "Series C",
      key: "Series C",
    },
    {
      id: 9,
      title: "Pre-IPO",
      key: "Pre-IPO",
    },
    {
      id: 10,
      title: "Pre-Series A",
      key: "Pre-Series A",
    },
    {
      id: 11,
      title: "Unknown",
      key: "Unknown",
    },
    {
      id: 12,
      title: "Extended Series B",
      key: "Extended Series B",
    },
    {
      id: 13,
      title: "Post-IPO",
      key: "Post-IPO",
    },
    {
      id: 14,
      title: "Growth",
      key: "Growth",
    },
    {
      id: 15,
      title: "Pre-IDO",
      key: "Pre-IDO",
    },
    {
      id: 16,
      title: "Series E",
      key: "Series E",
    },
    {
      id: 17,
      title: "ICO",
      key: "ICO",
    },
    {
      id: 18,
      title: "Community Raise",
      key: "Community Raise",
    },
    {
      id: 19,
      title: "Post-IPO Debt",
      key: "Post-IPO Debt",
    },
    {
      id: 20,
      title: "Series H",
      key: "Series H",
    },
    {
      id: 21,
      title: "Series G",
      key: "Series G",
    },
    {
      id: 22,
      title: "Series F",
      key: "Series F",
    },
    {
      id: 23,
      title: "Equity Crowdfunding",
      key: "Equity Crowdfunding",
    },
    {
      id: 24,
      title: "Extended Series D",
      key: "Extended Series D",
    },
    {
      id: 25,
      title: "Extended Series A",
      key: "Extended Series A",
    },
    {
      id: 26,
      title: "Debt Financing",
      key: "Debt Financing",
    },
    {
      id: 27,
      title: "Pre-Series B",
      key: "Pre-Series B",
    },
    {
      id: 28,
      title: "Extended Series C",
      key: "Extended Series C",
    },
    {
      id: 29,
      title: "IPO",
      key: "IPO",
    },
  ];
  
  const type = [
    { id: 0, title: t("unlimited"), key: "" },
    { id: 1, title: t("Fund"), key: "Fund" },
    { id: 2, title: t("angel agency"), key: "Angel Investor" },
    { id: 3, title: "DAO", key: "DAO" },
    { id: 4, title: "Lab", key: "Lab" },
    { id: 5, title: t("Corporate"), key: "Corporate" },
    { id: 6, title: t("Foundation"), key: "Foundation" },
  ];
  
  const established = [
    { id: 0, title: t("unlimited"), key: "" },
    { id: 1, title: "2022", key: "2022" },
    { id: 2, title: "2021", key: "2021" },
    { id: 3, title: "2020", key: "2020" },
    { id: 4, title: "2019", key: "2019" },
    { id: 5, title: "2018", key: "2018" },
    { id: 6, title: "2017", key: "2017" },
    { id: 7, title: "2016", key: "2016" },
  ];
  
  const [investActive, setInvestActive] = useState("");
  
  const [typeActive, setTypeActive] = useState(src ? src : "");
  
  const [establishedActive, setEstablishedActive] = useState("");
  
  const [dataList, setDataList] = useState([]);
  const [total, setTotal] = useState(0);
  
  const pageRef = useRef({
    currentPage: 1,
    lastPage: 2,
    isRequest: true,
  });
  useEffect(() => {
    getInvestorsListData(investActive, typeActive, establishedActive);
  }, []);

  const getInvestorsListData = (keyOne, keyTwo, keyTherr) => {
    const { currentPage } = pageRef.current;
    getInvestorsList({
      stages: keyOne,
      type: keyTwo,
      year: keyTherr,
      page: currentPage,
      pagesize: 12,
    }).then((res) => {
      console.log("res", res);
      if (res.code === 1) {
        setDataList(res.data.data);
        pageRef.current.lastPage = res.data.last_page;
        setTotal(res.data.total);
      }
    });
  };

  const investClick = (item) => {
    setInvestActive(item.key);
    getInvestorsListData(item.key, typeActive, establishedActive);
  };
  const typeClick = (item) => {
    setTypeActive(item.key);
    getInvestorsListData(investActive, item.key, establishedActive);
  };
  const establishedClick = (item) => {
    setEstablishedActive(item.key);
    getInvestorsListData(investActive, typeActive, item.key);
  };
  const goDetails = (id) => {
    props.history.push("/mechanism/details/" + id);
  };
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const listChange = (page) => {
    console.log("page", page);
    pageRef.current.currentPage = page;
    pageRef.current.isRequest = false;
    getInvestorsList({
      stages: investActive,
      type: typeActive,
      year: establishedActive,
      page: page,
      pagesize: 12,
    }).then((res) => {
      if (res.code === 1) {
        setDataList(res.data.data);
        setTotal(res.data.total);
      }
    });
  };
  const { currentPage } = pageRef.current;
  return (
    <div className="mechanism">
      <HeaderPersonal props={props} />
      
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "", title: t("Mechanism") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      />
      <div className="search">
            <SearchInput
              props={props}
              setDataList={setDataList}
              getInterface={getSearchInvestors}
              getList={getInvestorsList}
              setTotal={setTotal}
              setOneActive={setInvestActive}
              setTwoActive={setTypeActive}
              setTherrActive={setEstablishedActive}
            />
          </div>

      <div className="mechanism_main">
        <div className="mechanism_con">
          
          <div className="filter">
            <div className="filter_row">
              <div className="filter_row_left">
                <span className="filter_row_title">
                  {t("Investment stage")}
                  <span className="filter_row_title_box"></span>
                </span>
              </div>
              <div className="filter_row_right">
                {invest.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className={
                        investActive === item.key
                          ? "filter_row_item filter_row_item_active"
                          : "filter_row_item"
                      }
                      onClick={() => investClick(item)}
                    >
                      {item.title}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="filter_row">
              <div className="filter_row_left">
                <span className="filter_row_title">
                  {t("type")}
                  <span className="filter_row_title_box"></span>
                </span>
              </div>
              <div className="filter_row_right">
                {type.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className={
                        typeActive === item.key
                          ? "filter_row_item filter_row_item_active"
                          : "filter_row_item"
                      }
                      onClick={() => typeClick(item)}
                    >
                      {item.title}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="filter_row">
              <div className="filter_row_left">
                <span className="filter_row_title">
                  {t("Established")}
                  <span className="filter_row_title_box"></span>
                </span>
              </div>
              <div className="filter_row_right">
                {established.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className={
                        establishedActive === item.key
                          ? "filter_row_item filter_row_item_active"
                          : "filter_row_item"
                      }
                      onClick={() => establishedClick(item)}
                    >
                      {item.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mechanism_list">
            {dataList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="mechanism_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="title">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                    <span className="tit">
                      {item.investor}
                      {/* <span>{item.investor}</span> */}
                      {/* <span
                        className="tit_icon"
                        onClick={() => follow(item.id)}
                      >
                        {item.is_follow ? (
                          <HeartFilled style={{ color: "#ce3964" }} />
                        ) : (
                          <HeartOutlined />
                        )}
                      </span> */}
                    </span>
                  </div>
                  <div className="invest">
                    <div className="invest_item">
                      <div className="invest_item_title">
                        {t("Investments this year")}
                      </div>
                      <div className="invest_item_num">
                        {item.nowyearnumber}
                      </div>
                    </div>
                    <div className="invest_item">
                      <div className="invest_item_title">
                        {t("total investment")}
                      </div>
                      <div className="invest_item_num">
                        {item.portfolio_companies_count}
                      </div>
                    </div>
                    {/* <div className="invest_item">
                      <div className="invest_item_title">
                        {t("next round rate")}
                      </div>
                      <div className="invest_item_num">
                        {item.nextRoundRate}
                      </div>
                    </div> */}
                  </div>
                  <div className="xian"></div>
                  <div className="recent">
                    <span>{t("Recent investments")}</span>
                    <span className="recent_info">
                      {item.newFundraising.project} $
                      {digitalconversion(item.newFundraising.amount)}{" "}
                      {item.newFundraising.stages}
                    </span>
                  </div>
                  <div className="bom_box"></div>
                </div>
              );
            })}
          </div>
          <div className="page_box">
            <Pagination
              current={currentPage}
              pageSize={12}
              total={total}
              showSizeChanger={false}
              onChange={listChange}
            />
          </div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default Mechanism;
