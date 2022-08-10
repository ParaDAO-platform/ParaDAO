import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import { getEventDetails } from "../../requests";
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

import "./eventdetails.less";

const { Paragraph } = Typography;
const EventDetails = (props) => {
  let id = props.match.params.ids;
  const { t } = useTranslation();
  
  const [eventInfo, setEventInfo] = useState({
    fundraising_rounds: [],
    investors: [],
    relevant: [],
    founder: [],
  });

  useEffect(() => {
    getInvestorsDetailsData();
  }, []);
  const getInvestorsDetailsData = () => {
    getEventDetails({ id }).then((res) => {
      console.log(res);
      if (res.code === 1) {
        setEventInfo(res.data);
      }
    });
  };
  const goDetails = (id) => {
    props.history.push("/mechanism/details/" + id);
    window.location.reload();
  };

  const goMechanism = (type) => {
    props.history.push("/event/" + type);
  };
  return (
    <div className="eventdetails">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/event", title: t("Event") },
          { to: "", title: eventInfo.project || t("Details") },
        ]}
        style={{ maxWidth: "19.20rem", padding: "0 1.5rem" }}
      />
      <div className="eventdetails_con">
        <div className="eventdetails_left">
          <div className="eventdetails_left_con">
            <div className="agency_presentation">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">
                {t("closes financing", {
                  name: eventInfo.project,
                  num: eventInfo.amount
                    ? digitalconversion(eventInfo.amount)
                    : 0,
                })}
              </div>
              {/* <div className="source">
                <span>{t("event source")}:</span>
                <a href="">1212</a>
              </div> */}
              <div className="text">{eventInfo.description}</div>
              <div className="box_info">
                <div className="box_item">
                  <div className="box_item_top">{eventInfo.stages}</div>
                  <div className="box_item_bom">{t("Rounds")}</div>
                </div>
                <div className="box_item">
                  <div className="box_item_top">
                    {eventInfo.amount ? digitalconversion(eventInfo.amount) : 0}
                  </div>
                  <div className="box_item_bom">{t("investment amount")}</div>
                </div>
              </div>
              <div className="investment_company">
                <div className="min_box"></div>
                <div className="title">{t("Investors in this round")}</div>
                <div className="list">
                  {eventInfo.investors.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="investment_item"
                        onClick={() => goDetails(item.id)}
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
                  {eventInfo.amount ? digitalconversion(eventInfo.amount) : 0}
                </span>
              </div>
              <div className="list">
                <div className="recent_item">
                  <div className="recent_item_left">
                    <div className="dian"></div>
                    <div className="box"></div>
                  </div>
                  <div className="recent_item_right">
                    <div className="time">
                      <span className="time">{eventInfo.date}</span>
                      <span className="stages">{eventInfo.project}</span>
                    </div>
                    <div className="text">
                      {t("get investment", {
                        num: eventInfo.amount
                          ? digitalconversion(eventInfo.amount)
                          : 0,
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
                      {eventInfo.investors.map((item, i) => {
                        return (
                          <span className="investors_item" key={i}>
                            <span>{item.investor}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* {eventInfo.fundraising_rounds.map((item, i) => {
                  return (
                    
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>
        <div className="eventdetails_right">
          <div className="title">{t("Related")}</div>
          <div className="list">
            {eventInfo.relevant.map((item) => {
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
export default EventDetails;
