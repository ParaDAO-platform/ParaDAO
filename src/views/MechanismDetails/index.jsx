import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import EchartsGraph from "../../components/EchartsGraph";
import {
  getInvestorsDetails,
  getFollow,
  addTrack,
  cancelTrack,
  downPdfInvestors,
  investorsGraphData,
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
import util from "../../utils/utils";
import project from "../../assets/img/home/project.png";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import minboxtwo from "../../assets/img/mechanism/minboxtwo.png";
import miniboxtherr from "../../assets/img/mechanism/miniboxtherr.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import graphPng from "../../assets/img/tubiao.png";
import graphPngActive from "../../assets/img/tubiao2.png";
import "./mechanismdetails.less";

const { Paragraph } = Typography;
const MechanismDetails = (props) => {
  let id = props.match.params.ids;
  const { t } = useTranslation();
  
  const [mechanismInfo, setMechanismInfo] = useState({
    company_list: [],
    fundraising_stages: [],
    relevant: [],
    introduction: [],
  });
  const [followInfo, setFollowInfo] = useState({ is_follow: false, number: 0 });
  const [isTrack, setIsTrack] = useState(false);
  
  const [isShowGraph, setisShowGraph] = useState(false);
  const [graphDataInfo, setgraphDataInfo] = useState({});
  useEffect(() => {
    getInvestorsDetailsData();

    investorsGraphData({ id: id }).then((res) => {
      setgraphDataInfo({ ...res.data });
    });
  }, []);
  const getInvestorsDetailsData = () => {
    getInvestorsDetails({ id }).then((res) => {
      console.log(res);
      if (res.code === 1) {
        setMechanismInfo(res.data);
        setIsTrack(res.data.is_tracking === 0 ? false : true);
        setFollowInfo({
          is_follow: res.data.is_follow === 0 ? false : true,
          number: res.data.follow_number,
        });
      }
    });
  };
  const goDetails = (id) => {
    props.history.push("/mechanism/details/" + id);
    window.location.reload();
  };
  
  const follow = () => {
    getFollow({ id: mechanismInfo.id }).then((res) => {
      console.log("res", res);
      if (res.code === 1) {
        setFollowInfo(res.data);
      }
    });
  };
  
  const track = () => {
    if (isTrack) {
      cancelTrack({ type: 2, id: mechanismInfo.id }).then((res) => {
        if (res.code === 1) {
          setIsTrack(false);
        }
      });
    } else {
      addTrack({ type: 2, id: mechanismInfo.id }).then((res) => {
        if (res.code === 1) {
          setIsTrack(true);
        }
      });
    }
  };
  const goMechanism = (type) => {
    props.history.push("/mechanism/" + type);
  };
  const goCompany = (id) => {
    props.history.push("/company/details/" + id);
  };

  const goEvent = (id) => {
    props.history.push("/event/details/" + id);
  };
  const downFile = (id) => {
    downPdfInvestors({ id }).then((res) => {
      if (res) {
        util.pdfDow(res, t("Mechanism") + mechanismInfo.investor);
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
    <div className="mechanismdetails">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/mechanism", title: t("Mechanism") },
          { to: "", title: mechanismInfo.investor },
        ]}
        style={{ maxWidth: "19.20rem", padding: "0 1.5rem" }}
      />
      <div className="mechanismdetails_con">
        <div className="mechanismdetails_left">
          <div className="mechanismdetails_left_con">
            <div className="left_top">
              <div className="left_top_info">
                <img
                  src={mechanismInfo.logo ? mechanismInfo.logo : defaultavatar}
                  alt=""
                />
                <div className="left_title">{mechanismInfo.investor}</div>
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
                onClick={() => goMechanism(mechanismInfo.type)}
              >
                {mechanismInfo.type}
              </div>
              <div
                className="category_item"
                onClick={() => downFile(mechanismInfo.id)}
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
                type="jigou"
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
              <div className="title">{t("Agency presentation")}</div>
              <div className="text">
                {mechanismInfo.introduction.map((item, i) => {
                  return <p key={i}>{item}</p>;
                })}
                <div className="text_rwo">
                  <div className="text_left">
                    <div className="text_title">
                      {t("Institutional website")}:
                    </div>
                    <div className="text_title">Twitter:</div>
                    <div className="text_title">{t("actively investing")}:</div>
                    <div className="text_title">{t("location")}:</div>
                    <div className="text_title">{t("year founded")}:</div>
                    <div className="text_title">{t("aum")}:</div>
                    <div className="text_title">{t("email address")}:</div>
                    <div className="text_title">{t("linkedIn")}:</div>
                  </div>

                  <div className="text_right">
                    <div className="text_txt ">
                      {mechanismInfo.website ? (
                        <a href={mechanismInfo.website} target="_blank" rel="noreferrer">
                          {mechanismInfo.website}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text_txt">
                      {mechanismInfo.twitter ? (
                        <a href={mechanismInfo.twitter} target="_blank" rel="noreferrer">
                          {mechanismInfo.twitter}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text_txt">
                      {mechanismInfo.actively_investing
                        ? mechanismInfo.actively_investing
                        : "-"}
                    </div>
                    <div className="text_txt">
                      {mechanismInfo.location ? mechanismInfo.location : "-"}
                    </div>
                    <div className="text_txt">
                      {mechanismInfo.year_founded
                        ? mechanismInfo.year_founded
                        : "-"}
                    </div>
                    <div className="text_txt">
                      {mechanismInfo.aum ? mechanismInfo.aum : "-"}
                    </div>
                    <div className="text_txt">
                      {mechanismInfo.email_address
                        ? mechanismInfo.email_address
                        : "-"}
                    </div>
                    <div className="text_txt">
                      {mechanismInfo.linkedIn ? (
                        <a href={mechanismInfo.linkedIn} target="_blank" rel="noreferrer">
                          {mechanismInfo.linkedIn}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="team_introduction">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">{t("team introduction")}</div>
              <div className="list">
                {mechanismInfo.teamIntroduction.map((item) => {
                  return (
                    <div className="introduction_item" key={item.id}>
                      <div className="img">
                        <img src={item.url} alt="" />
                      </div>
                      <div className="item_right">
                        <div className="title_item">{item.title}</div>
                        <div className="text_item">{item.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}
            <div className="investment_company">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxtwo} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">{t("investment company")}</div>
              <div className="list">
                {mechanismInfo.company_list.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="investment_item"
                      onClick={() => {
                        goCompany(item.id);
                      }}
                    >
                      <div className="item_top">
                        <img
                          src={item.logo ? item.logo : defaultavatar}
                          alt=""
                        />
                        <div className="investment_item_title">
                          {item.company}
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
              <div className="title">{t("recentInvestment")}</div>
              <div className="list">
                {mechanismInfo.fundraising_stages.map((item, i) => {
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
                        <div className="time">{item.date}</div>
                        <div className="text">
                          ${digitalconversion(item.amount)} {t("invest")}{" "}
                          <img
                            src={item.logo ? item.logo : defaultavatar}
                            alt=""
                          />
                          <span className="name">{item.project}</span>
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
        <div className="mechanismdetails_right">
          <div className="title">{t("Related")}</div>
          <div className="list">
            {mechanismInfo.relevant.map((item) => {
              return (
                <div
                  key={item.id}
                  className="mechanism_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="title">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                    <span className="tit">{item.investor}</span>
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
                    <Paragraph ellipsis={true} className="recent_info">
                      {item.newFundraising.project} $
                      {digitalconversion(item.newFundraising.amount)}{" "}
                      {item.newFundraising.stages}
                    </Paragraph>
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
export default MechanismDetails;
