import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import { Input, Statistic, Pagination } from "antd";
import useDebounceHook from "../../utils/useDebounceHook";
import { Bar, Column } from "@ant-design/plots";
import dayjs from "dayjs";
import img1 from "../../assets/img/dashboard/img1.png";
import img1_active from "../../assets/img/dashboard/img1_active.png";
import img2 from "../../assets/img/dashboard/img2.png";
import img2_active from "../../assets/img/dashboard/img2_active.png";
import test1 from "../../assets/img/dashboard/test1.png";
import test2 from "../../assets/img/dashboard/test2.png";
import { getTrackList, getTrackTotal, dataBoardLists } from "../../requests";
import "./dashboard.less";
const Dashboard = (props) => {
  const { t } = useTranslation();
  const tabMenu = [
    {
      id: 1,
      title: t("Mechanism"),
    },
    {
      id: 2,
      title: t("Company"),
    },
  ];
  
  const [mechanismData, setmechanismData] = useState([]);
  
  const [companyData, setcompanyData] = useState([]);
  
  const [boardData, setboardData] = useState([]);
  
  const [statistical, setstatistical] = useState([
    {
      id: 1,
      title: t("Mechanism"),
      num: 2,
    },
    {
      id: 2,
      title: t("Company"),
      num: 5,
    },
    
    
    
    
    
  ]);
  
  const [trackTotal, setTrackTotal] = useState({
    companies: 0,
    investors: 0,
  });
  
  const [activeTab, setActiveTab] = useState(0);
  
  const [activeSubTab, setActiveSubTab] = useState(tabMenu[0].id);
  
  const [dynamicPage, setDynamicPage] = useState(1);
  
  const [dynamicToTal, setDynamicToTal] = useState(0);
  
  const [kanbanPage, setKanbanPage] = useState(1);
  
  const [kanbanTotal, setKanbanTotal] = useState(1);
  useEffect(async () => {
    getTrackList({ type: 1 }).then((res) => {
      setcompanyData([...res.data.data]);
      setKanbanTotal(res.data.total);
    });
    getTrackList({ type: 2 }).then((res) => {
      setmechanismData([...res.data.data]);
      setDynamicToTal(res.data.total);
    });
    getTrackTotal().then((res) => {
      setTrackTotal({ ...res.data });
    });
    await dataBoardLists({ type: 1 }).then((res) => {
      setboardData([...boardData, ...res.data]);
    });
    await dataBoardLists({ type: 2 }).then((res) => {
      setboardData((newVal, old) => {
        return [...newVal, ...res.data];
      });
    });
  }, []);
  const changeTab = (num) => {
    setActiveTab(num);
  };
  const changeSubTab = (num) => {
    setActiveSubTab(num);
  };
  const goCompanyDetails = (id) => {
    props.history.push("/company/details/" + id);
  };
  const goMechanismDetails = (id) => {
    props.history.push("/mechanism/details/" + id);
  };
  const goBoardDataDetails = (id) => {
    props.history.push("/dashboardDetails/" + id);
  };
  const dynamicChange = (page) => {
    setDynamicPage(page);
    getTrackList({ type: 2, page: page }).then((res) => {
      setmechanismData([...res.data.data]);
    });
  };
  const kanbanChange = (page) => {
    setKanbanPage(page);
    getTrackList({ type: 1, page: page }).then((res) => {
      setcompanyData([...res.data.data]);
    });
  };
  return (
    <div className="dashboard">
      <HeaderPersonal props={props} />
      <div className="content_box">
        <div className="dashboard_tab">
          <div
            className={!activeTab ? "title_box active" : "title_box"}
            onClick={() => changeTab(0)}
          >
            {/* <img src={!activeTab ? img1_active : img1} alt="" /> */}
            <span>{t("Track dynamic")}</span>
          </div>
          <div
            className={activeTab ? "title_box active" : "title_box"}
            onClick={() => changeTab(1)}
          >
            {/* <img src={activeTab ? img2_active : img2} alt="" /> */}
            <span>{t("Data Board")}</span>
          </div>
        </div>
        <div className="flex_box">
          <div className="flex_box_con">
            <div
              className="left_box"
              style={{ display: !activeTab ? "block" : "none" }}
            >
              <div className="tab_box">
                {tabMenu.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={
                        activeSubTab === item.id
                          ? "title_box active"
                          : "title_box"
                      }
                      onClick={() => changeSubTab(item.id)}
                    >
                      <span>{item.title}</span>
                    </div>
                  );
                })}
              </div>
              {/* 机构 */}
              <div
                className="mechanism_box"
                style={{ display: activeSubTab === 1 ? "block" : "none" }}
              >
                {mechanismData.map((item, i) => {
                  return (
                    <div className="item" key={i}>
                      <div className="img_box">
                        <img className="img" src={item.logo} alt="" />
                      </div>
                      <div className="flex_content">
                        <div className="title_box">
                          <div
                            className="title"
                            onClick={() => goMechanismDetails(item.id)}
                          >
                            {item.name}
                          </div>
                          <div className="time">
                            {dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}
                          </div>
                        </div>
                        <div className="message_box">
                          <span>{item.stages}</span>
                          <span>{item.project}</span>
                          <span>{item.amount}</span>
                          {/* <div>
                          {t("total investment")}
                          <span>{item.portfolio_companies_count}</span>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* 公司 */}
              <div
                className="company_box"
                style={{ display: activeSubTab === 2 ? "block" : "none" }}
              >
                {companyData.map((item, i) => {
                  return (
                    <div className="item" key={i}>
                      <div className="img_box">
                        <img className="img" src={item.logo} alt="" />
                      </div>
                      <div className="flex_content">
                        <div className="title_box">
                          <div
                            className="title"
                            onClick={() => goCompanyDetails(item.id)}
                          >
                            {item.name}
                          </div>
                          <div className="time">
                            {dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}
                          </div>
                        </div>
                        <div className="message_box">
                          <span>{item.stages}</span>
                          <span>{item.amount}</span>
                          <span className="mechanism">
                            <div className="mechanism_con">
                              {item.project.map((ele, i) => {
                                return (
                                  <span key={i}>
                                    <span>{ele}</span>
                                    <span className="douhao">, </span>
                                  </span>
                                );
                              })}
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="left_box"
              style={{ display: activeTab ? "block" : "none" }}
            >
              <div className="boardbox">
                {boardData.map((item) => {
                  return (
                    <div
                      className="item"
                      key={item.id}
                      onClick={() => goBoardDataDetails(item.id)}
                    >
                      <img src={item.cover} alt="" />
                      <div className="box">
                        <div className="title">{item.name}</div>
                        <div className="desc">{item.desc}</div>
                        <div className="bottom_box">
                          <span className="time">
                            {dayjs(item.created_at * 1000).format("YYYY-MM-DD")}
                          </span>
                          <span className="read_num">
                            {item.browse_n}
                            {t("read")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="right_box">
              <div className="title">{t("Track record")}</div>
              <div className="statistical_box">
                {statistical.map((item) => {
                  return (
                    <div key={item.id}>
                      <div>{item.title}</div>
                      <div className="num">
                        {item.id == 2
                          ? trackTotal.companies
                          : trackTotal.investors}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="pagination">
            {activeSubTab === 1 ? (
              <Pagination
                current={dynamicPage}
                total={dynamicToTal}
                onChange={dynamicChange}
              />
            ) : null}
            {activeSubTab === 2 ? (
              <Pagination
                current={kanbanPage}
                total={kanbanTotal}
                onChange={kanbanChange}
              />
            ) : null}
          </div>
        </div>
        <div className="line-back"></div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default Dashboard;
