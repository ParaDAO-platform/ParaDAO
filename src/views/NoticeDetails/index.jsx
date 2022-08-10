import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import { noticeDetails } from "../../requests";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./noticeDetails.less";

const NoticeDetails = (props) => {
  const { t } = useTranslation();
  const [noticeInfo, setnoticeInfo] = useState({});
  useEffect(() => {
    noticeDetails({ id: props.match.params.id }).then((res) => {
      setnoticeInfo(res.data);
    });
  }, []);
  return (
    <div className="notice_details">
      <HeaderPersonal props={props} />
      <div className="info_box">
        <div className="title">{noticeInfo.title}</div>
        <div className="time">
          {dayjs(noticeInfo.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")}
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: noticeInfo.content }}
        ></div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default NoticeDetails;
