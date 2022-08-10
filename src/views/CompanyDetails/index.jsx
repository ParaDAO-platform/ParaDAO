import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import EchartsGraph from "../../components/EchartsGraph";
import {
  getCompaniesDetails,
  getCompaniesFollow,
  addTrack,
  cancelTrack,
  downPdfCompany,
  graphData,
  getUserInfo,
} from "../../requests";
import { Statistic, Typography } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  TagOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import formatMonenyNumber from "../../utils/formatMonenyNumber";
import digitalconversion from "../../utils/digitalconversion";
import project from "../../assets/img/home/project.png";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import minboxtwo from "../../assets/img/mechanism/minboxtwo.png";
import miniboxtherr from "../../assets/img/mechanism/miniboxtherr.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import graphPng from "../../assets/img/tubiao.png";
import graphPngActive from "../../assets/img/tubiao2.png";
import util from "../../utils/utils";
import "./companydetails.less";

const { Paragraph } = Typography;
const CompanyDetails = (props) => {
  let id = props.match.params.ids;
  const { t } = useTranslation();
  
  const [companyInfo, setCompanyInfo] = useState({
    fundraising_rounds: [],
    investors: [],
    relevant: [],
    founder: [],
  });
  const [followInfo, setFollowInfo] = useState({ is_follow: false, number: 0 });
  const [isTrack, setIsTrack] = useState(false);
  
  const [isShowGraph, setisShowGraph] = useState(false);
  const [graphDataInfo, setgraphDataInfo] = useState({});

  useEffect(() => {
    getInvestorsDetailsData();
    graphData({ id: id }).then((res) => {
      setgraphDataInfo({ ...res.data });
    });
  }, []);
  const getInvestorsDetailsData = () => {
    getCompaniesDetails({ id }).then((res) => {
      console.log(res);
      if (res.code === 1) {
        setCompanyInfo(res.data);
        setIsTrack(res.data.is_tracking === 0 ? false : true);
        setFollowInfo({
          is_follow: res.data.is_follow === 0 ? false : true,
          number: res.data.follow_number,
        });
      }
    });
  };
  const goDetails = (id) => {
    props.history.push("/company/details/" + id);
    window.location.reload();
  };
  
  const follow = () => {
    getCompaniesFollow({ id: companyInfo.id }).then((res) => {
      console.log("res", res);
      if (res.code === 1) {
        setFollowInfo(res.data);
      }
    });
  };
  
  const track = () => {
    if (isTrack) {
      cancelTrack({ type: 1, id: companyInfo.id }).then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          setIsTrack(false);
        }
      });
    } else {
      addTrack({ type: 1, id: companyInfo.id }).then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          setIsTrack(true);
        }
      });
    }
  };
  const goCompany = (type) => {
    props.history.push("/company/" + type);
  };

  const goFigure = (id) => {
    props.history.push("/figure/details/" + id);
  };
  const goMechanism = (id) => {
    props.history.push("/mechanism/details/" + id);
  };
  const goEvent = (id) => {
    props.history.push("/event/details/" + id);
  };
  const downFile = (id) => {
    downPdfCompany({ id }).then((res) => {
      if (res) {
        util.pdfDow(res, t("Company") + companyInfo.company);
      }
    });
  };
  const showGraphFn = () => {
    getUserInfo().then((res) => {
      if (res.code === 1) {
        setisShowGraph(!isShowGraph);
      }
    });
  };
  return (
    <div className="companydetails">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/company", title: t("Company") },
          { to: "", title: companyInfo.company || t("Details") },
        ]}
        style={{ maxWidth: "19.20rem", padding: "0 1.5rem" }}
      />
      <div className="companydetails_con">
        <div className="companydetails_left">
          <div className="companydetails_left_con">
            <div className="left_top">
              <div className="left_top_info">
                <img
                  src={companyInfo.logo ? companyInfo.logo : defaultavatar}
                  alt=""
                />
                <div className="left_title">{companyInfo.company}</div>
              </div>
              <div className="flex">
                {/* 显示关系图 */}
                <div className="left_top_track" onClick={showGraphFn}>
                  <img
                    className="animation_rotate"
                    style={{ width: ".24rem" }}
                    src={isShowGraph ? graphPngActive : graphPng}
                    alt=""
                  />
                </div>
                {/* 数据追踪 */}
                <div className="left_top_track" onClick={track}>
                  {isTrack ? (
                    <TagOutlined style={{ color: "#ce3964" }} />
                  ) : (
                    <TagOutlined />
                  )}
                </div>
                <div className="left_top_follow" onClick={follow}>
                  {followInfo.is_follow ? (
                    <HeartFilled style={{ color: "#ce3964" }} />
                  ) : (
                    <HeartOutlined />
                  )}
                  <span className="follow_number">{followInfo.number}</span>
                </div>
              </div>
            </div>
            <div className="category">
              <div
                className="category_item"
                onClick={() => goCompany(companyInfo.stages)}
              >
                {companyInfo.stages}
              </div>
              <div
                className="category_item"
                onClick={() => downFile(companyInfo.id)}
              >
                {t("Download")}
              </div>
            </div>
            <div
              style={{
                width: "9.8rem",
                display: isShowGraph ? "block" : "none",
              }}
            >
              <EchartsGraph
                props={props}
                graph={graphDataInfo}
                type="gongsi"
                isShowGraph={isShowGraph}
              />
            </div>
            <div className="agency_presentation">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">{t("Company Profile")}</div>
              <div className="text">
                {companyInfo.desc}
                {/* {companyInfo.introduction.map((item, i) => {
                  return <p key={i}>{item}</p>;
                })} */}
                <div className="text_rwo">
                  <div className="text_left">
                    <div className="text_title">
                      {t("Institutional website")}:
                    </div>
                    <div className="text_title">Twitter:</div>
                    <div className="text_title">{t("location")}:</div>
                    <div className="text_title">{t("year founded")}:</div>
                    {/* <div className="text_title">{t("investment amount")}:</div> */}
                    <div className="text_title">{t("stock code")}:</div>
                    <div className="text_title">{t("ecosystem")}:</div>
                    <div className="text_title">Discord/Telegram:</div>
                  </div>

                  <div className="text_right">
                    <div className="text_txt">
                      {companyInfo.website ? (
                        <a href={companyInfo.website} target="_blank" rel="noreferrer">
                          {companyInfo.website}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text_txt">
                      {companyInfo.twitter ? (
                        <a href={companyInfo.twitter} target="_blank" rel="noreferrer">
                          {companyInfo.twitter}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text_txt">
                      {companyInfo.location ? companyInfo.location : "-"}
                    </div>
                    <div className="text_txt">
                      {companyInfo.year_founded
                        ? companyInfo.year_founded
                        : "-"}
                    </div>
                    {/* <div className="text_txt">
                      {companyInfo.funding_received
                        ? companyInfo.funding_received
                        : "-"}
                    </div> */}
                    <div className="text_txt">
                      {companyInfo.ticker ? companyInfo.ticker : "-"}
                    </div>
                    <div className="text_txt">
                      {companyInfo.ecosystem ? companyInfo.ecosystem : "-"}
                    </div>
                    <div className="text_txt">
                      {companyInfo.discord_or_telegram ? (
                        <a
                          href={companyInfo.discord_or_telegram}
                          target="_blank" rel="noreferrer"
                        >
                          {companyInfo.discord_or_telegram}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {companyInfo.founder.length > 0 ? (
              <div className="team_introduction">
                <div className="lt_box"></div>
                <div className="lb_box"></div>
                <div className="rb_box">
                  <img src={minboxbgone} alt="" />
                </div>
                <div className="min_box"></div>
                <div className="title">{t("team introduction")}</div>
                <div className="list">
                  {companyInfo.founder.map((item, i) => {
                    return (
                      <div
                        className="introduction_item"
                        key={i}
                        onClick={
                          item.id
                            ? () => {
                                goFigure(item.id);
                              }
                            : null
                        }
                      >
                        <div className="img">
                          <img
                            src={item.logo ? item.logo : defaultavatartwo}
                            alt=""
                          />
                        </div>
                        <div className="item_right">
                          <div className="title_item">{item.name}</div>
                          <div className="text_item">
                            {item.introduction ? item.introduction : "-"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="investment_company">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxtwo} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">{t("investor")}</div>
              <div className="list">
                {companyInfo.investors.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="investment_item"
                      onClick={() => goMechanism(item.id)}
                    >
                      <div className="item_top">
                        <img
                          src={item.logo ? item.logo : defaultavatar}
                          alt=""
                        />
                        <div className="investment_item_title">
                          {item.investor}
                        </div>
                      </div>
                      <div className="item_bom">
                        <div className="item_bom_line"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="recent_investment">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={miniboxtherr} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">
                <span>{t("recent financing")}</span>
                <span>
                  {t("Cumulative financing")}$
                  {digitalconversion(companyInfo.funding_received)}
                </span>
              </div>
              <div className="list">
                {companyInfo.fundraising_rounds.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="recent_item"
                      onClick={
                        item.id
                          ? () => {
                              goEvent(item.id);
                            }
                          : null
                      }
                    >
                      <div className="recent_item_left">
                        <div className="dian"></div>
                        <div className="box"></div>
                      </div>
                      <div className="recent_item_right">
                        <div className="time">
                          <span className="time">{item.created}</span>
                          <span className="stages">{item.name}</span>
                        </div>
                        <div className="text">
                          {t("get investment", {
                            num: digitalconversion(item.number),
                          })}
                          {/* ${item.number} {t("invest")}{" "}
                          <img
                            src={item.logo ? item.logo : defaultavatar}
                            alt=""
                          />
                          <span className="name">{item.project}</span> */}
                        </div>
                        <div className="user"></div>
                        <div className="investors">
                          <span className="institutions">
                            {t("All investment institutions")}:
                          </span>
                          {item.investors.map((item, i) => {
                            return (
                              <span className="investors_item" key={i}>
                                <span>{item}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="companydetails_right">
          <div className="title">{t("Related")}</div>
          <div className="list">
            {companyInfo.relevant.map((item) => {
              return (
                <div
                  key={item.id}
                  className="company_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="title">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                    <span className="tit">
                      {item.company}
                      {/* <span>{item.investor}</span>
                      <span className="tit_icon">
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
                        {t("total financing")}
                      </div>
                      <div className="invest_item_num">
                        {digitalconversion(item.funding_received)}
                      </div>
                    </div>
                    <div className="invest_item">
                      <div className="invest_item_title">
                        {t("current round")}
                      </div>
                      <div className="invest_item_num">{item.round}</div>
                    </div>
                  </div>
                  <div className="xian"></div>
                  <div className="recent">
                    <span>{t("Established")}</span>
                    <span className="recent_info">{item.create_time}</span>
                  </div>
                  <div className="bom_box"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default CompanyDetails;
