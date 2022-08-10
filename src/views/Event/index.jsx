import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import { message, Statistic, Pagination } from "antd";
import { getEventList } from "../../requests";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import formatMonenyNumber from "../../utils/formatMonenyNumber";
import digitalconversion from "../../utils/digitalconversion";
import defaultavatar from "../../assets/img/defaultavatar.png";
import boxrt from "../../assets/img/mechanism/boxrt.png";
import project from "../../assets/img/home/project.png";
import "./event.less";
const Event = (props) => {
  const { t } = useTranslation();
  const { src } = props.match.params;
  
  const rounds = [
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
  
  const [roundsActive, setRoundsActive] = useState(src ? src : "");
  
  const [establishedActive, setEstablishedActive] = useState("");
  
  const [dataList, setDataList] = useState([{ id: 0, investors: [] }]);
  
  const [total, setTotal] = useState(0);

  
  const pageRef = useRef({
    currentPage: 1,
    lastPage: 2,
    isRequest: true,
  });
  useEffect(() => {
    getInvestorsListData(roundsActive, establishedActive);
  }, []);

  const getInvestorsListData = (keyOne, keyTherr) => {
    const { currentPage } = pageRef.current;
    getEventList({
      stages: keyOne,
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
  const typeClick = (item) => {
    setRoundsActive(item.key);
    getInvestorsListData(item.key, establishedActive);
  };
  const establishedClick = (item) => {
    setEstablishedActive(item.key);
    getInvestorsListData(roundsActive, item.key);
  };
  const goDetails = (id) => {
    props.history.push("/event/details/" + id);
  };
  const listChange = (page) => {
    console.log("page", page);
    pageRef.current.currentPage = page;
    getEventList({
      stages: roundsActive,
      year: establishedActive,
      page: page,
      pagesize: 12,
    }).then((res) => {
      if (res.code === 1) {
        
        setDataList(res.data.data);
        
      }
    });
  };
  const { currentPage } = pageRef.current;
  return (
    <div className="event">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "", title: t("Event") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      />
      <div className="event_main">
        <div className="event_con">
          <div className="filter">
            <div className="filter_row">
              <div className="filter_row_left">
                <span className="filter_row_title">
                  {t("Rounds")}:<span className="filter_row_title_box"></span>
                </span>
              </div>
              <div className="filter_row_right">
                {rounds.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className={
                        roundsActive === item.key
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
          <div className="event_list">
            {/* {dataList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="company_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="title">
                    <img src={project} alt="" />
                    <span className="tit">
                      {item.project}
                    </span>
                  </div>
                  <div className="invest">
                    <div className="invest_item">
                      <div className="invest_item_title">
                      {t("latest valuation")}
                      </div>
                      <div className="invest_item_num">
                      {formatMonenyNumber(item.f)}
                      </div>
                    </div>
                    <div className="invest_item">
                      <div className="invest_item_title">
                        {t("current round")}
                      </div>
                      <div className="invest_item_num">{item.stages}</div>
                    </div>
                  </div>
                  <div className="xian"></div>
                  <div className="recent">
                    <span>{t("time")} : </span>
                    <span className="recent_info">{item.date}</span>
                  </div>
                  <div className="bom_box"></div>
                </div>
              );
            })} */}
            <div className="box_one"></div>
            <div className="box_two"></div>
            <div className="box_therr">
              <img src={boxrt} alt="" />
            </div>
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="td">{t("time")}</div>
                  <div className="td">{t("company name")}</div>
                  <div className="td">{t("Rounds")}</div>
                  <div className="td">{t("amount")}</div>
                  <div className="td">{t("investor")}</div>
                  <div className="td">{t("latest valuation")}</div>
                </div>
              </div>
              <div className="tbody">
                {dataList.map((item) => {
                  return (
                    <div
                      className="tr"
                      key={item.id}
                      onClick={() => goDetails(item.id)}
                    >
                      <div className="td">{item.date}</div>
                      <div className="td">{item.project}</div>
                      <div className="td">{item.stages}</div>
                      <div className="td">{digitalconversion(item.amount)}</div>
                      <div className="td">
                        {item.investors.map((m, i) => {
                          return i > 1 ? null : (
                            <div key={i} className="td_investor">
                              {m}
                            </div>
                          );
                        })}
                        {item.investors.length < 2 ? null : (
                          <div className="td_investor">...</div>
                        )}
                      </div>
                      <div className="td">{digitalconversion(item.f)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
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
export default Event;
