import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import {
    meetingDetails,
} from "../../requests";
import { Statistic, Typography } from "antd";
import { HeartOutlined, HeartFilled, PushpinFilled } from "@ant-design/icons";
import formatMonenyNumber from "../../utils/formatMonenyNumber";
import digitalconversion from "../../utils/digitalconversion";
import project from "../../assets/img/home/project.png";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import minboxtwo from "../../assets/img/mechanism/minboxtwo.png";
import miniboxtherr from "../../assets/img/mechanism/miniboxtherr.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import util from"../../utils/utils";
import "./meetingDetails.less";

const { Paragraph } = Typography;
const MeetingDetails = (props) => {
  let id = props.match.params.id;
  const { t } = useTranslation();
  
  const [companyInfo, setCompanyInfo] = useState({
    fundraising_rounds: [],
    investors: [],
    relevant: [],
    founder: [],
  });
  
  const [meetingInfo, setMeetingInfo] = useState({});
  const [followInfo, setFollowInfo] = useState({ is_follow: false, number: 0 });
  const [isTrack, setIsTrack] = useState(false);

  useEffect(() => {
    getMeetingDetailsData();
  }, []);
  const getMeetingDetailsData = () => {
    console.log(id)
    meetingDetails({ id }).then((res) => {
      console.log(res);
      if (res.code === 1) {
        setMeetingInfo(res.data);
        
        
        
        
      }
    });
  };
  
  const follow = () => {
    
    
    
    
    
    
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
    
    
    
  };
  return (
    <div className="meetingdetails">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/activity", title: t("Activity") },
          { to: "", title: meetingInfo.name || t("Details") },
        ]}
        style={{ maxWidth: "19.20rem", padding: "0 1.5rem" }}
      />
      <div className="meetingdetails_con">
        <div className="meetingdetails_left">
          <div className="meetingdetails_left_con">
            <div className="left_top">
              <div className="left_top_info">
                {/* <img
                  src={meetingInfo.logo ? meetingInfo.logo : defaultavatar}
                  alt=""
                /> */}
                <div className="left_title">{meetingInfo.name}</div>
              </div>
            </div>
            <div className="meeting_time">
              {meetingInfo.start_date} - {meetingInfo.end_date}
            </div>
            <div className="agency_presentation">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxbgone} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">&nbsp;</div>
              <div className="text">
                {/* {companyInfo.introduction.map((item, i) => {
                  return <p key={i}>{item}</p>;
                })} */}
                <div className="text_rwo">
                  <div className="text_left">
                    <div className="text_title">
                      {t("meeting address")}:
                    </div>
                    <div className="text_title">{t("meeting link")}:</div>
                    <div className="text_title">Twitter:</div>
                    <div className="text_title">Other:</div>
                  </div>

                  <div className="text_right">
                    <div className="text_txt">
                      {meetingInfo.country ? (
                        <span>{meetingInfo.city} , {meetingInfo.country}</span>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text_txt">
                      {meetingInfo.link ? (
                        <a href={meetingInfo.link} target="_blank" rel="noreferrer">
                          {meetingInfo.link}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text_txt">
                    {meetingInfo.twitter ? (
                        <a href={meetingInfo.twitter} target="_blank" rel="noreferrer">
                          {meetingInfo.twitter}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text_txt">
                    {meetingInfo.other ? (
                        <a href={meetingInfo.other} target="_blank" rel="noreferrer">
                          {meetingInfo.other}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="investment_company">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxtwo} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">participant</div>
              <div className="list">
                {meetingInfo.participant ? meetingInfo.participant :  "-"}
              </div>
            </div>
            <div className="investment_company">
              <div className="lt_box"></div>
              <div className="lb_box"></div>
              <div className="rb_box">
                <img src={minboxtwo} alt="" />
              </div>
              <div className="min_box"></div>
              <div className="title">Speaker</div>
              <div className="list">
                {meetingInfo.speaker ? meetingInfo.speaker :  "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default MeetingDetails;
