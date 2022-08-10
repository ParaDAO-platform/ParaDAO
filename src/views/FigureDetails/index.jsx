import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import EchartsGraph from "../../components/EchartsGraph";
import { getPersonageDetails, getPersonageFollow,personageGraphData,getUserInfo } from "../../requests";
import { Statistic, Typography } from "antd";
import { HeartOutlined, HeartFilled ,DotChartOutlined} from "@ant-design/icons";
import digitalconversion from "../../utils/digitalconversion";
import project from "../../assets/img/home/project.png";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import minboxtwo from "../../assets/img/mechanism/minboxtwo.png";
import miniboxtherr from "../../assets/img/mechanism/miniboxtherr.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import graphPng from "../../assets/img/tubiao.png";
import graphPngActive from "../../assets/img/tubiao2.png";
import "./figuredetails.less";

const { Paragraph } = Typography;

const FigureDetails = (props) => {
  let id = props.match.params.ids;
  const { t } = useTranslation();
   
 const [isShowGraph, setisShowGraph] = useState(false);
 const [graphDataInfo, setgraphDataInfo] = useState({});
  
  const [figureInfo, setFigureInfo] = useState({
    fundraising_round: [],
    introduction: [],
    tags: [],
    workExperience: [],
    domain: {},
    relevant: [],
  });
  const [followInfo, setFollowInfo] = useState({ is_follow: false, number: 0 });

  useEffect(() => {
    getInvestorsDetailsData();
    personageGraphData({id:id}).then(res=>{
      setgraphDataInfo({ ...res.data });
    })
  }, []);
  const getInvestorsDetailsData = () => {
    getPersonageDetails({ id }).then((res) => {
      console.log(res);
      if (res.code === 1) {
        setFigureInfo(res.data);
        setFollowInfo({
          is_follow: res.data.is_follow === 0 ? false : true,
          number: res.data.follow_number,
        });
      }
    });
  };
  const goDetails = (id) => {
    props.history.push("/figure/details/" + id);
    window.location.reload();
  };
  
  const follow = () => {
    getPersonageFollow({ id: figureInfo.id }).then((res) => {
      console.log("res", res);
      if (res.code === 1) {
        setFollowInfo(res.data);
      }
    });
  };
  const goMechanism = (type) => {
    props.history.push("/figure/" + type);
  };

  const goCompany = (id) => {
    props.history.push("/company/details/" + id);
  };

  const goEvent = (id) => {
    props.history.push("/event/details/" + id);
  };
  const showGraphFn = () =>{
    
    getUserInfo().then((res) => {
      if (res.code === 1) {
        setisShowGraph(!isShowGraph)
      }
    });
  }
  return (
    <div className="figuredetails">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/figure", title: t("Figure") },
          { to: "", title: figureInfo.name || t("Details") },
        ]}
        style={{ maxWidth: "19.20rem", padding: "0 1.5rem" }}
      />
      <div className="companydetails_con">
        <div className="companydetails_left">
          <div className="companydetails_left_con">
            <div className="left_top">
              <div className="left_top_info">
                <img
                  src={
                    figureInfo.person_head
                      ? figureInfo.person_head
                      : defaultavatartwo
                  }
                  alt=""
                />
                <div className="left_title">{figureInfo.person_name}</div>
              </div>
              <div className="flex">
                {/* 显示关系图 */}
              <div
                  className="left_top_track"
                  onClick={showGraphFn}
                >
                  <img className="animation_rotate" style={{width:".24rem"}} src={isShowGraph ? graphPngActive : graphPng} alt="" />
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
              {figureInfo.tags.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="category_item"
                    onClick={() => goMechanism(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="link_icon">
              {figureInfo.domain.twitter ? (
                <a
                  className="twitter"
                  href={figureInfo.domain.twitter}
                  target="_blank" rel="noreferrer"
                ></a>
              ) : null}
              {figureInfo.domain.discord ? (
                <a
                  className="discord"
                  href={figureInfo.domain.discord}
                  target="_blank" rel="noreferrer"
                ></a>
              ) : null}
              {figureInfo.domain.linkedin ? (
                <a
                  className="in"
                  href={figureInfo.domain.linkedin}
                  target="_blank" rel="noreferrer"
                ></a>
              ) : null}
            </div>
            <div
              style={{ width: "9.8rem", display: isShowGraph ? "block" : "none" }}
            >
              <EchartsGraph props={props} graph={graphDataInfo} type="renwu" isShowGraph={isShowGraph} />
            </div>
            <div className="agency_presentation">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">{t("Character introduction")}</div>
              <div className="text">
                {figureInfo.introduction.map((item, i) => {
                  return <p key={i}>{item}</p>;
                })}
                {/* <div className="text_rwo">
                  <div className="text_left">
                    <div className="text_title">
                      {t("Institutional website")}:
                    </div>
                    <div className="text_title">Twitter:</div>
                    <div className="text_title">{t("location")}:</div>
                    <div className="text_title">{t("year founded")}:</div>
                    <div className="text_title">{t("stock code")}:</div>
                    <div className="text_title">{t("ecosystem")}:</div>
                    <div className="text_title">Discord/Telegram:</div>
                  </div>

                  <div className="text_right">
                    <div className="text_txt">
                      {figureInfo.website ? figureInfo.website : "-"}
                    </div>
                    <div className="text_txt">
                      {figureInfo.twitter ? figureInfo.twitter : "-"}
                    </div>
                    <div className="text_txt">
                      {figureInfo.location ? figureInfo.location : "-"}
                    </div>
                    <div className="text_txt">
                      {figureInfo.year_founded ? figureInfo.year_founded : "-"}
                    </div>
                    <div className="text_txt">
                      {figureInfo.ticker ? figureInfo.ticker : "-"}
                    </div>
                    <div className="text_txt">
                      {figureInfo.ecosystem ? figureInfo.ecosystem : "-"}
                    </div>
                    <div className="text_txt">
                      {figureInfo.discord_or_telegram
                        ? figureInfo.discord_or_telegram
                        : "-"}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="investment_company">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxtwo} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">
                {t("Affiliated companies and institutions")}
              </div>
              <div className="list">
                {figureInfo.workExperience.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="investment_item"
                      onClick={
                        item.id
                          ? () => {
                              goCompany(item.id);
                            }
                          : null
                      }
                    >
                      <div className="item_top">
                        <img
                          src={item.logo ? item.logo : defaultavatar}
                          alt=""
                        />
                        <div className="investment_item_title">{item.name}</div>
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
                <span>{t("Investment and financing case")}</span>
                {/* <span>
                  {t("Cumulative financing")}$
                  {formatMonenyNumber(figureInfo.funding_received)}
                </span> */}
              </div>
              <div className="list">
                {figureInfo.fundraising_round.map((item, i) => {
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
                          <span className="time">{item.date}</span>
                          <span className="stages">{item.project}</span>
                        </div>
                        <div className="text">
                          {t("get investment", {
                            num: digitalconversion(item.amount),
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
            {figureInfo.relevant.map((item) => {
              return (
                <div
                  key={item.id}
                  className="figure_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="img">
                    <img
                      src={
                        item.person_head ? item.person_head : defaultavatartwo
                      }
                      alt=""
                    />
                  </div>
                  <div className="item_right">
                    <span className="item_right_title">{item.person_name}</span>
                    <span className="item_right_text">
                      {item.person_summary}
                    </span>
                  </div>
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
export default FigureDetails;
