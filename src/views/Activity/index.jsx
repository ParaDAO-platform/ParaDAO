import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import Footer from "../../components/Footer";
import SearchInput from "../../components/SearchInput";
import { message, Statistic, Pagination, Tooltip } from "antd";
import {
  getHackerSong,
  getSearchHackeSong,
  meetingLists,
} from "../../requests";
import defaultavatar from "../../assets/img/defaultavatar.png";
import boxrt from "../../assets/img/mechanism/boxrt.png";
import "./activity.less";
const Activity = (props) => {
  const { t } = useTranslation();
  const { src } = props.match.params;
  
  const [activityActive, setActivityActive] = useState(src ? src : "");
  
  const [hackathonList, setHackathonList] = useState([]);
  
  const [meetingList, setMeetingList] = useState([]);
  const [total, setTotal] = useState(0);
  
  const pageRef = useRef({
    currentPage: 1,
    lastPage: 2,
    isRequest: true,
  });
  useEffect(() => {
    getHackerSongData();
  }, []);

  const activityClick = (key) => {
    setActivityActive(key);
    pageRef.current.currentPage = 1;
    pageRef.current.isRequest = true;
  };
  
  const hackathonClick = (key) => {
    activityClick(key);
    getHackerSongData();
  };
  
  const meetingClick = (key) => {
    activityClick(key);
    meetingListsData();
  };
  const meetingListsData = () => {
    meetingLists({
      pagesize: 1000,
    }).then((res) => {
      console.log("aaaaaaaaa", res);
      if (res.code === 1) {
        setMeetingList(res.data.data);
        setTotal(res.data.total);
      }
    });
  };
  const getHackerSongData = () => {
    getHackerSong({
      pagesize: 12,
    }).then((res) => {
      if (res.code === 1) {
        setHackathonList(res.data.data);
        setTotal(res.data.total);
      }
    });
  };
  const listChange = (page) => {
    console.log("page", page);
    pageRef.current.currentPage = page;
    pageRef.current.isRequest = false;
    if (activityActive === "meeting") {
      meetingLists({
        pagesize: 12,
        page: page,
      }).then((res) => {
        if (res.code === 1) {
          setMeetingList(res.data.data);
          setTotal(res.data.total);
        }
      });
    } else {
      getHackerSong({
        page: page,
        pagesize: 12,
      }).then((res) => {
        console.log();
        if (res.code === 1) {
          setHackathonList(res.data.data);
          setTotal(res.data.total);
        }
      });
    }
  };
  const goHackathon = (id) => {
    props.history.push("/company/hackathondetails/" + id);
  };
  const goMeeting = (id) => {
    props.history.push("/meetingDetails/" + id);
  };
  const { currentPage } = pageRef.current;
  return (
    <div className="activity">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "", title: t("Activity") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      />
      <div className="search">
          <SearchInput
            props={props}
            setDataList={setHackathonList}
            getInterface={getSearchHackeSong}
            getList={getHackerSong}
            setTotal={setTotal}
            setOneActive={setActivityActive}
          />
        </div>
      <div className="activity_con">
        
        <div className="filter">
          <div className="filter_row">
            <div className="filter_row_left">
              <span className="filter_row_title">
                {t("Activity")}：<span className="filter_row_title_box"></span>
              </span>
            </div>
            <div className="filter_row_right">
              <span
                className={
                  activityActive === ""
                    ? "filter_row_item filter_row_item_active"
                    : "filter_row_item"
                }
                onClick={() => activityClick("")}
              >
                {t("unlimited")}
              </span>
              <span
                className={
                  activityActive === "hackathon"
                    ? "filter_row_item filter_row_item_active"
                    : "filter_row_item"
                }
                onClick={() => hackathonClick("hackathon")}
              >
                {t("Hackathon")}
              </span>
              <span
                className={
                  activityActive === "meeting"
                    ? "filter_row_item filter_row_item_active"
                    : "filter_row_item"
                }
                onClick={() => meetingClick("meeting")}
              >
                {t("meeting")}
              </span>
            </div>
          </div>
        </div>
        <div
          className="activity_list"
          style={{ display: activityActive === "meeting" ? "none" : "flex" }}
        >
          {hackathonList.map((item) => {
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
        <div
          className="meeting_list"
          style={{ display: activityActive === "meeting" ? "flex" : "none" }}
        >
          <div className="box_one"></div>
          <div className="box_two"></div>
          <div className="box_therr">
            <img src={boxrt} alt="" />
          </div>
          <div className="table">
            <div className="thead">
              <div className="tr">
                <div className="td">{t("Name")}</div>
                <div className="td">{t("Start Date")}</div>
                <div className="td">{t("End Date")}</div>
                <div className="td">{t("City")}</div>
                <div className="td">{t("Country")}</div>
                <div className="td">{t("meeting link")}</div>
                <div className="td">Twitter</div>
                <div className="td">{t("Other")}</div>
                <div className="td">{t("Participant")}</div>
                <div className="td">{t("Speaker")} </div>
              </div>
            </div>
            <div className="tbody">
              {meetingList.map((item) => {
                return (
                  <div className="tr" key={item.id}>
                    <div className="td">
                      <Tooltip title={item.name}>
                        <span>{item.name}</span>
                      </Tooltip>
                    </div>
                    <div className="td">{item.start_date}</div>
                    <div className="td">{item.end_date}</div>
                    <div className="td">{item.city}</div>
                    <div className="td">{item.country}</div>
                    <div className="td">
                      <Tooltip title={item.link}>
                        <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a>
                      </Tooltip>
                      </div>
                    <div className="td">
                      <Tooltip title={item.twitter}>
                      <a href={item.twitter} target="_blank" rel="noreferrer">{item.twitter}</a>
                      </Tooltip>
                      </div>
                    <div className="td">
                      <Tooltip title={item.other}>
                      <a href={item.other} target="_blank" rel="noreferrer">{item.other}</a>
                      </Tooltip>
                      </div>
                    <div className="td">
                      <Tooltip title={item.participant}>
                        <span>{item.participant}</span>
                      </Tooltip>
                      </div>
                    <div className="td">
                      <Tooltip title={item.speaker}>
                        <span>{item.speaker}</span>
                      </Tooltip>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="page_box"
          style={{ display: activityActive === "meeting" ? "none" : "flex" }}
        >
          <Pagination
            current={currentPage}
            pageSize={12}
            total={total}
            showSizeChanger={false}
            onChange={listChange}
          />
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default Activity;
