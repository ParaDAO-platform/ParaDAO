import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";

import {
  getBrowserList as getBrowserViewList,
  getBrowserList as getBrowserBuyList,
  getBrowserList as getBrowserFollowList,
  getBrowseDetails,
} from "../../requests";
import { message, Tabs } from "antd";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import PersonalCenter from "../../components/PersonalCenter";
import "./browsinghistory.less";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";

dayjs.extend(relativeTime);
const { TabPane } = Tabs;
const BrowsingHistory = (props) => {
  const { t } = useTranslation();
  const ids = props.match.params.ids.split("&");
  
  const documentId = Number(ids[0]);
  
  const type = Number(ids[1]);

  
  const [documentdata, setDocumentData] = useState({});
  
  const [currentViewPage, setCurrentViewPage] = useState(1);
  const [lastViewPage, setLastViewPage] = useState();
  const [currentViewTotal, setCurrentViewTotal] = useState();
  const [currentViewData, setCurrentViewData] = useState([]);

  
  const [currentBuyPage, setCurrentBuyPage] = useState(1);
  const [lastBuyPage, setLastBuyPage] = useState();
  const [currentBuyTotal, setCurrentBuyTotal] = useState();
  const [currentBuyData, setCurrentBuyData] = useState([]);

  
  const [currentFollowPage, setCurrentFollowPage] = useState(1);
  const [lastFollowPage, setLastFollowPage] = useState();
  const [currentFollowTotal, setCurrentFollowTotal] = useState();
  const [currentFollowData, setCurrentFollowData] = useState([]);

  useEffect(() => {
    
    if (type === 1) {
      getBrowseDetailsData(1);
      getBrowseDetailsData(2);
      getBrowseDetailsData(3);
    } else if (type === 2) {
      getBrowseDetailsData(1);
      getBrowseDetailsData(2);
      getBrowseDetailsData(3);
    } else if (type === 3) {
      getBrowserViewList({
        id: documentId,
        type: 1,
        page: currentViewPage,
      })
        .then((result) => {
          console.log("view", result);
          if (result.code !== 1) {
            message.error(result.message);
            return;
          }
          
          setDocumentData(result.data.document);
          setCurrentViewPage(result.data.log.current_page);
          setLastViewPage(result.data.log.last_page);
          setCurrentViewTotal(result.data.log.total);
          setCurrentViewData(result.data.log.data);
        })
        .catch((error) => {
          console.log("view", error);
        });
      
      getBrowserBuyList({
        id: documentId,
        type: 3,
        page: currentViewPage,
      })
        .then((result) => {
          console.log("Buy", result);
          if (result.code !== 1) {
            message.error(result.message);
            return;
          }
          setCurrentBuyPage(result.data.log.current_page);
          setLastBuyPage(result.data.log.last_page);
          setCurrentBuyTotal(result.data.log.total);
          setCurrentBuyData(result.data.log.data);
        })
        .catch((error) => {
          console.log("Buy", error);
        });
      
      getBrowserFollowList({
        id: documentId,
        type: 2,
        page: currentBuyPage,
      })
        .then((result) => {
          console.log("Follow", result);
          if (result.code !== 1) {
            message.error(result.message);
            return;
          }
          setCurrentFollowPage(result.data.log.current_page);
          setLastFollowPage(result.data.log.last_page);
          setCurrentFollowTotal(result.data.log.total);
          setCurrentFollowData(result.data.log.data);
        })
        .catch((error) => {
          console.log("Follow", error);
        });
    }
  }, []);

  const getBrowseDetailsData = (ptype) => {
    getBrowseDetails({ id: documentId, type: type, page_type: ptype }).then(
      (res) => {
        console.log("列表", res);
        if (res.code === 1 && res.data) {
          setDocumentData(res.data.document);
          if (ptype === 1) {
            setCurrentViewPage(res.data.user.current_page);
            setLastViewPage(res.data.user.last_page);
            setCurrentViewTotal(res.data.user.total);
            setCurrentViewData((data) => [...data, ...res.data.user.data]);
          } else if (ptype === 2) {
            setCurrentFollowPage(res.data.user.current_page);
            setLastFollowPage(res.data.user.last_page);
            setCurrentFollowTotal(res.data.user.total);
            setCurrentFollowData((data) => [...data, ...res.data.user.data]);
          } else if (ptype === 3) {
            setCurrentBuyPage(res.data.user.current_page);
            setLastBuyPage(res.data.user.last_page);
            setCurrentBuyTotal(res.data.user.total);
            setCurrentBuyData((data) => [...data, ...res.data.user.data]);
          }
        }
      }
    );
  };

  
  const moreData = (dataType) => {
    if (type === 1) {
      if (dataType === "view") {
        getBrowseDetailsData(1);
      } else if (dataType === "buy") {
        getBrowseDetailsData(3);
      } else if (dataType === "follow") {
        getBrowseDetailsData(2);
      }
    } else if (type === 2) {
      if (dataType === "view") {
        getBrowseDetailsData(1);
      } else if (dataType === "buy") {
        getBrowseDetailsData(3);
      } else if (dataType === "follow") {
        getBrowseDetailsData(2);
      }
    } else if (type === 3) {
      if (dataType === "view") {
        getBrowserViewList({
          id: documentId,
          type: 1,
          page: currentViewPage + 1,
        })
          .then((result) => {
            
            let tempData = [...currentViewData, ...result.data.log.data];
            setCurrentViewData(tempData);
            setCurrentViewPage(result.data.log.current_page);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (dataType === "buy") {
        getBrowserBuyList({
          id: documentId,
          type: 3,
          page: currentBuyPage + 1,
        })
          .then((result) => {
            
            let tempData = [...currentBuyData, ...result.data.log.data];
            setCurrentBuyData(tempData);
            setCurrentBuyPage(result.data.log.current_page);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (dataType === "follow") {
        getBrowserFollowList({
          id: documentId,
          type: 2,
          page: currentFollowPage + 1,
        })
          .then((result) => {
            
            let tempData = [...currentFollowData, ...result.data.log.data];
            setCurrentFollowData(tempData);
            setCurrentFollowPage(result.data.log.current_page);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  
  const goList = (place) => {
    window.location.href = place;
  };

  const goLink = (url) => {
    if (type === 1) {
      props.history.push("/mechanism/details/" + url);
    } else if (type === 2) {
      props.history.push("/company/details/" + url);
    } else if (type === 3) {
      props.history.push("/library/details/" + url);
    }
  };
  return (
    <div className="browsinghistory">
      <HeaderPersonal props={props} />
      {/* <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/mylibrary", title: t("upload and download") },
          { to: "", title: t("Browsing History") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.4rem" }}
      /> */}
      <div className="brow-list">
        <div className="brow-list_left">
          <PersonalCenter props={props} />
        </div>
        <div className="brow-list_right">
          <div className="brow-list_right-top">
            <span>{t("upload and download")}</span>
            <span className="icon">&gt;</span>
            <span>{t("Browsing History")}</span>
          </div>
          <div className="brow-title">
            {/* <div className="brow-tags">
              <div className="mini_box"></div> {t("Browsing History")}
            </div> */}
            <div className="brow-card">
              <div className="card" onClick={() => goLink(documentdata.id)}>
                <div className="card-left">
                  <img alt="" src={documentdata.logo} />
                </div>
                <div className="card-right">
                  <div className="card-title">
                    {type == 3
                      ? documentdata.title
                      : type == 2
                      ? documentdata.company
                      : documentdata.investor}
                  </div>
                  <div className="card-content">
                    {type == 3 ? documentdata.desc : documentdata.description}
                  </div>
                  <div className="time">
                    {/* <span>{t("created time")}: </span> */}
                    <span className="card-deck-time">
                      {dayjs(
                        type === 3
                          ? documentdata.created_at * 1000
                          : documentdata.created_time * 1000
                      ).format("YYYY-MM-DD HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="history-list">
            <div className="history_list_con">
              <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                className="history_list_tab"
              >
                <TabPane tab={t("View")} key="1">
                  <div className="view-list" id="brows-view-list">
                    <div className="view-title">
                      {/* <div className="title_img"></div> */}
                      <div>{t("viewing count")}</div>
                      <div>{currentViewTotal}</div>
                    </div>
                    <div className="view-data-group">
                      {currentViewData.map((item, i) => {
                        return (
                          <div key={i} className="view-card">
                            <img
                              alt=""
                              src={item.avatar || defaultavatartwo}
                            ></img>
                            <div className="card-content">
                              <div className="user_nickname">
                                {type === 3
                                  ? item.user_nickname
                                  : item.nickname}
                              </div>
                              <div>
                                {dayjs(item.created_at * 1000).fromNow()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {currentViewPage < lastViewPage ? (
                      <div
                        className="card-more"
                        onClick={() => moreData("view")}
                      >
                        {t("More")}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </TabPane>
                <TabPane tab={t("download")} key="2">
                  <div className="buy-list" id="brows-buy-list">
                    <div className="buy-title">
                      {/* <div className="title_img"></div> */}
                      <div>{t("Downloads")}</div>
                      <div>{currentBuyTotal}</div>
                    </div>
                    <div className="buy-data-group">
                      {currentBuyData.map((item, i) => {
                        return (
                          <div key={i} className="buy-card">
                            <img
                              alt=""
                              src={item.avatar || defaultavatartwo}
                            ></img>
                            <div className="card-content">
                              <div className="user_nickname">
                                {type === 3
                                  ? item.user_nickname
                                  : item.nickname}
                              </div>
                              <div>
                                {dayjs(item.created_at * 1000).fromNow()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {currentBuyPage < lastBuyPage ? (
                      <div
                        className="card-more"
                        onClick={() => moreData("buy")}
                      >
                        {t("More")}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </TabPane>
                <TabPane tab={t("Follow")} key="3">
                  <div className="follow-list" id="brows-follow-list">
                    <div className="follow-title">
                      {/* <div className="title_img"></div> */}
                      <div>{t("number of followers")}</div>
                      <div>{currentFollowTotal}</div>
                    </div>
                    <div className="follow-data-group">
                      {currentFollowData.map((item, i) => {
                        return (
                          <div key={i} className="follow-card">
                            <img
                              alt=""
                              src={item.avatar || defaultavatartwo}
                            ></img>
                            <div className="card-content">
                              <div className="user_nickname">
                                {type === 3
                                  ? item.user_nickname
                                  : item.nickname}
                              </div>
                              <div>
                                {dayjs(item.created_at * 1000).fromNow()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {currentFollowPage < lastFollowPage ? (
                      <div
                        className="card-more"
                        onClick={() => moreData("follow")}
                      >
                        {t("More")}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </TabPane>
              </Tabs>
              {/* <div className="left-bar">
              <div
                className="view-bar"
                onClick={() => goList("#brows-view-list")}
              >
                {t("View")}
              </div>
              <div
                className="buy-bar"
                onClick={() => goList("#brows-buy-list")}
              >
                {t("Buy")}
              </div>
              <div
                className="follow-bar"
                onClick={() => goList("#brows-follow-list")}
              >
                {t("Follow")}
              </div>
            </div> */}
              {/* <div className="right-list">
              <div className="view-list" id="brows-view-list">
                <div className="view-title">
                  <div>{t("View")}</div>
                  <div>{currentViewTotal}</div>
                </div>
                <div className="view-data-group">
                  {currentViewData.map((item, i) => {
                    return (
                      <div key={i} className="view-card">
                        <img alt="" src={item.avatar}></img>
                        <div className="card-content">
                          <div>{item.user_nickname}</div>
                          <div>{dayjs(item.created_at * 1000).fromNow()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {currentViewPage < lastViewPage ? (
                  <div className="card-more" onClick={() => moreData("view")}>
                    {t("More")}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="buy-list" id="brows-buy-list">
                <div className="buy-title">
                  <div>{t("Buy")}</div>
                  <div>{currentBuyTotal}</div>
                </div>
                <div className="buy-data-group">
                  {currentBuyData.map((item, i) => {
                    return (
                      <div key={i} className="buy-card">
                        <img alt="" src={item.avatar}></img>
                        <div className="card-content">
                          <div>{item.user_nickname}</div>
                          <div>{dayjs(item.created_at * 1000).fromNow()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {currentBuyPage < lastBuyPage ? (
                  <div className="card-more" onClick={() => moreData("buy")}>
                    {t("More")}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="follow-list" id="brows-follow-list">
                <div className="follow-title">
                  <div>{t("Follow")}</div>
                  <div>{currentFollowTotal}</div>
                </div>
                <div className="follow-data-group">
                  {currentFollowData.map((item, i) => {
                    return (
                      <div key={i} className="follow-card">
                        <img alt="" src={item.avatar}></img>
                        <div className="card-content">
                          <div>{item.user_nickname}</div>
                          <div>{dayjs(item.created_at * 1000).fromNow()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {currentFollowPage < lastFollowPage ? (
                  <div className="card-more" onClick={() => moreData("follow")}>
                    {t("More")}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default BrowsingHistory;
