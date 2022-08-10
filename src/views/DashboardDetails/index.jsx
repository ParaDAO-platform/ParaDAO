import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import { dataBoardDetails } from "../../requests";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./dashboardDetails.less";

const DashboardDetails = (props) => {
  const { t } = useTranslation();
  const [dataInfo, setdataInfo] = useState({});
  useEffect(() => {
    dataBoardDetails({ id: props.match.params.id }).then((res) => {
      setdataInfo(res.data);
    });
  }, []);
  return (
    <div className="dashboard_details">
      <HeaderPersonal props={props} />
      <div className="info_box">
        <div className="title">{dataInfo.name}</div>
        <div className="time">
          {dayjs(dataInfo.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")}
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: dataInfo.content }}></div>
      </div>
    </div>
  );
};
export default DashboardDetails;
