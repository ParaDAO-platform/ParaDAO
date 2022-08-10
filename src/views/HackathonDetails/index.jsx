import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import { getHackerSongDetails, getHackerSongFollow } from "../../requests";
import { Statistic, Typography } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import formatMonenyNumber from "../../utils/formatMonenyNumber";
import digitalconversion from "../../utils/digitalconversion";
import project from "../../assets/img/home/project.png";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import minboxtwo from "../../assets/img/mechanism/minboxtwo.png";
import miniboxtherr from "../../assets/img/mechanism/miniboxtherr.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import demo from "../../assets/img/company/demo.png";
import demovideo from "../../assets/img/company/demovideo.png";
import facebook from "../../assets/img/company/facebook.png";
import githup from "../../assets/img/company/githup.png";
import lian from "../../assets/img/company/lian.png";
import hourglass from "../../assets/img/company/hourglass.png";

import "./hackathondetails.less";

const { Paragraph } = Typography;
const HackathonDetails = (props) => {
  let id = props.match.params.ids;
  const { t } = useTranslation();
  
  const [companyInfo, setCompanyInfo] = useState({
    technique_field: [],
    chain: [],
    project_description: [],
    relevant: [],
    grant_status: [],
  });
  const [followInfo, setFollowInfo] = useState({ is_follow: false, number: 0 });

  useEffect(() => {
    getInvestorsDetailsData();
  }, []);
  const getInvestorsDetailsData = () => {
    getHackerSongDetails({ id }).then((res) => {
      console.log(res);
      if (res.code === 1) {
        setCompanyInfo(res.data);
        setFollowInfo({
          is_follow: res.data.is_follow === 0 ? false : true,
          number: res.data.follow_number,
        });
      }
    });
  };
  const goHackathon = (id) => {
    props.history.push("/company/hackathondetails/" + id);
    window.location.reload();
  };
  
  const follow = () => {
    getHackerSongFollow({ id: companyInfo.id }).then((res) => {
      console.log("res", res);
      if (res.code === 1) {
        setFollowInfo(res.data);
      }
    });
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
  return (
    <div className="companydetails">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/activity", title: t("Activity") },
          { to: "", title: companyInfo.name || t("Details") },
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
                <div className="left_title">{companyInfo.name}</div>
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
            <div className="companydetails_field">
              {companyInfo.technique_field.map((n, i) => {
                return <span key={i}>{n}</span>;
              })}
            </div>
            {companyInfo.grant_status[1] ? (
              <div className="grant">
                <img src={hourglass} alt="" />
                <span className="grant_title">
                  {t("Participating in Grant")}:
                </span>
                <span className="grant_text">
                  {companyInfo.grant_status[1]}
                </span>
              </div>
            ) : null}

            <div className="agency_presentation">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="chain">
                <img src={lian} alt="" className="chain_img" />
                {companyInfo.chain.map((item, i) => {
                  return (
                    <span key={i} className="chain_box">
                      <span>{item}</span>
                      <span className="chain_dian"></span>
                    </span>
                  );
                })}
              </div>
              <div className="con">
                {companyInfo.github_page ? (
                  <a
                    href={companyInfo.github_page}
                    className="link"
                    target="_blank" rel="noreferrer"
                  >
                    <img src={githup} alt="" />
                    <span>Github</span>
                  </a>
                ) : null}
                {companyInfo.demo_link ? (
                  <a
                    href={companyInfo.demo_link}
                    className="link"
                    target="_blank" rel="noreferrer"
                  >
                    <img src={demo} alt="" />
                    <span>Demo</span>
                  </a>
                ) : null}
                {companyInfo.demo_video ? (
                  <a
                    href={companyInfo.demo_video}
                    className="link"
                    target="_blank" rel="noreferrer"
                  >
                    <img src={demovideo} alt="" />
                    <span>Demo Video</span>
                  </a>
                ) : null}
                {companyInfo.facebook ? (
                  <a
                    href={companyInfo.facebook}
                    className="link"
                    target="_blank" rel="noreferrer"
                  >
                    <img src={facebook} alt="" />
                    <span>Facebook</span>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="agency_presentation">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">{t("Vision")}</div>
              <div className="text">{companyInfo.vision}</div>
            </div>
            <div className="agency_presentation">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">{t("Description")}</div>
              <div className="text">
                {companyInfo.logo ? (
                  <img src={companyInfo.logo} alt="" className="text_img" />
                ) : null}
                {companyInfo.project_description.map((item, i) => {
                  return <p key={i}>{item}</p>;
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
                  className="hackathon_item"
                  key={item.id}
                  onClick={() => goHackathon(item.id)}
                >
                  <div className="item_top">
                    <div className="img">
                      <img src={item.logo} alt="" />
                    </div>
                    <div className="item_top_right">
                      <div className="item_top_right_one">{item.name}</div>
                      <div className="item_top_right_two">
                        {item.technique_field.map((n, i) => {
                          return <span key={i}>{n}</span>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="item_text">
                    {item.project_description.map((m, i) => {
                      return <p key={i}>{m}</p>;
                    })}
                  </div>
                  <div className="xian"></div>
                  <div className="sprocket">
                    {item.chain.map((x, i) => {
                      return (
                        <span key={i} className="sprocket_span">
                          <span>{x}</span>
                          <span className="sprocket_item"></span>
                        </span>
                      );
                    })}
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
export default HackathonDetails;
