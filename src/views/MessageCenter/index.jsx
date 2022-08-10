import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import HeaderPersonal from "../../components/HeaderPersonal";
import PersonalCenter from "../../components/PersonalCenter";
import Footer from "../../components/Footer";
import { Pagination, Tabs } from "antd";
import ling from "../../assets/img/messageCenter/ling.png";
import news from "../../assets/img/messageCenter/news.png";
import notice from "../../assets/img/messageCenter/notice.png";
import ling_active from "../../assets/img/messageCenter/ling_active.png";
import news_active from "../../assets/img/messageCenter/news_active.png";
import notice_active from "../../assets/img/messageCenter/notice_active.png";
import pp from "../../assets/img/messageCenter/pp.png";
import success from "../../assets/img/messageCenter/success.png";
import fail from "../../assets/img/messageCenter/fail.png";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import { getNoticeList, getMessageList } from "../../requests";
import viplogo from "../../assets/img/member/viplogo.png";
import correct from "../../assets/img/messageCenter/correct.svg";
import mistake from "../../assets/img/messageCenter/mistake.svg";
import buyicon from "../../assets/img/messageCenter/buyIcon.svg";

import "./messagecenter.less";
import { t } from "i18next";
const { TabPane } = Tabs;
const MessageCenter = (props) => {
  const { t } = useTranslation();
  const [menuType, setMenuType] = useState(1);
  const [tabType, setTabType] = useState(1);
  
  const [noticeTotal, setnoticeTotal] = useState(0);
  
  const [type1Total, settype1Total] = useState(0);
  
  const [type2Total, settype2Total] = useState(0);
  
  const [type3Total, settype3Total] = useState(0);
  
  const [type4Total, settype4Total] = useState(0);
  const LISTTYPETEXT = [
    "",
    t("listtype1"),
    t("listtype2"),
    t("listtype3"),
    t("listtype4"),
    t("listtype5"),
    t("listtype6"),
    t("listtype7"),
    t("listtype8"),
  ];
  
  const [pageRef, setPageRef] = useState({
    currentPage: 1,
  });
  
  const [pageRefType1, setPageRefType1] = useState({
    currentPage: 1,
  });
  
  const [pageRefType2, setPageRefType2] = useState({
    currentPage: 1,
  });
  
  const [pageRefType3, setPageRefType3] = useState({
    currentPage: 1,
  });
  
  const [pageRefType4, setPageRefType4] = useState({
    currentPage: 1,
    lastPage: 2,
  });
  
  const [list1, setList1] = useState([]);
  
  const [list2, setList2] = useState([]);
  
  const [list3, setList3] = useState([]);
  
  const [list4, setList4] = useState([]);
  
  const [postData, setPostData] = useState([]);
  const tabList = [
    {
      id: 1,
      title: t("Audit class"),
    },
    {
      id: 2,
      title: t("purchase payment"),
    },
    {
      id: 3,
      title: t("Browse Classes"),
    },
    {
      id: 4,
      title: t("Project push class"),
    },
  ];
  useEffect(() => {
    
    listChange(1);
    
    listType2Change(1);
    listType1Change(1);
    listType3Change(1);
    listType4Change(1);
  }, []);
  const setMenuTypeHandle = (id) => {
    setMenuType(id);
  };
  const setTabTypeHandle = (id) => {
    setTabType(id);
  };
  const onChange = (id) => {
    setTabType(id * 1);
  };
  
  const listChange = (page) => {
    setPageRef({
      currentPage: page,
    });
    getNoticeList({
      page: page,
    }).then((res) => {
      setnoticeTotal(res.data.total);
      setPostData(res.data.data);
    });
  };
  
  const listType2Change = (page) => {
    setPageRefType2({
      currentPage: page,
    });
    getMessageList({ type: 2, page: page }).then((res) => {
      if (res.code == 1) {
        res.data.data.forEach((item) => {
          item.content = JSON.parse(item.content);
        });
        setList2(res.data.data);
        settype2Total(res.data.total);
      }
    });
  };
  
  const listType1Change = (page) => {
    setPageRefType1({
      currentPage: page,
    });
    getMessageList({ type: 1, page: page }).then((res) => {
      if (res.code == 1) {
        res.data.data.forEach((item) => {
          item.content = JSON.parse(item.content);
        });
        setList1(res.data.data);
        settype1Total(res.data.total);
      }
    });
  };
  
  const listType3Change = (page) => {
    setPageRefType3({
      currentPage: page,
    });
    getMessageList({ type: 3, page: page }).then((res) => {
      if (res.code == 1) {
        res.data.data.forEach((item) => {
          item.content = JSON.parse(item.content);
        });
        setList3(res.data.data);
        settype3Total(res.data.total);
      }
    });
  };
  
  const listType4Change = (page) => {
    setPageRefType4({
      currentPage: page,
    });
    getMessageList({ type: 4, page: page }).then((res) => {
      if (res.code == 1) {
        res.data.data.forEach((item) => {
          item.content = JSON.parse(item.content);
        });
        setList4(res.data.data);
        settype4Total(res.data.total);
      }
    });
  };
  
  const goDetails = (id) => {
    
    window.open("/noticeDetails/" + id);
  };
  const goInfo = (type, id) => {
    if (type === 3) {
      props.history.push("/library/details/" + id);
    } else if (type === 4) {
      props.history.push("/company/details/" + id);
    } else if (type === 5) {
      props.history.push("/mechanism/details/" + id);
    } else if (type === 6) {
      props.history.push("/figure/details/" + id);
    } else if (type === 7) {
      props.history.push("/event/details/" + id);
    } else if (type === 8) {
      props.history.push("/company/hackathondetails/" + id);
    }
  };
  return (
    <div className="message_center">
      <HeaderPersonal props={props} />
      <div className="wrapper">
        <div className="left_wrapper">
          <PersonalCenter props={props} />
        </div>
        <div className="notice_box">
          <div className="left_box">
            {/* <div className="menu">
              <img src={ling_active} alt="" />
              <div>{t("Message Center")}</div>
            </div> */}
            <div
              className={menuType === 1 ? "menu active" : "menu"}
              onClick={() => setMenuTypeHandle(1)}
            >
              <div>{t("message push")}</div>
            </div>
            <div
              className={menuType === 2 ? "menu active" : "menu"}
              onClick={() => setMenuTypeHandle(2)}
            >
              <div>{t("announcement")}</div>
            </div>
          </div>
          <div className="right_box">
            {/* 公告 */}
            <div style={{ display: menuType === 2 ? "block" : "none" }}>
              <div className="post_box">
                {postData.map((item) => {
                  return (
                    <div
                      className="item"
                      key={item.id}
                      onClick={() => goDetails(item.id)}
                    >
                      <div className="item_top">
                        <div className="title">{item.title}</div>
                        <div className="time">
                          {dayjs(item.created_at * 1000).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </div>
                      </div>

                      <div className="desc_box">{item.desc}</div>
                      <div className="line"></div>
                    </div>
                  );
                })}
              </div>
              <div className="page_box">
                <Pagination
                  current={pageRef.currentPage}
                  pageSize={12}
                  total={noticeTotal}
                  showSizeChanger={false}
                  hideOnSinglePage={true}
                  onChange={listChange}
                />
              </div>
            </div>
            {/* 消息推送 */}
            <div
              className="news_box"
              style={{ display: menuType === 1 ? "block" : "none" }}
            >
              <div className="tab_box">
                {/* {tabList.map((item) => {
                  return (
                    <div
                      className={tabType === item.id ? "item active" : "item"}
                      key={item.id}
                      onClick={() => setTabTypeHandle(item.id)}
                    >
                      {item.title}
                    </div>
                  );
                })} */}
                <Tabs defaultActiveKey="1" onChange={onChange}>
                  {tabList.map((item) => {
                    return <TabPane tab={item.title} key={item.id}></TabPane>;
                  })}
                </Tabs>
              </div>
              {/* 审核类 */}
              <div
                className="list_1"
                style={{ display: tabType === 1 ? "block" : "none" }}
              >
                {list1.map((item) => {
                  return (
                    <div className="list_1_item" key={item.id}>
                      <div className="box">
                        <div className="box_top">
                          <div className="type">
                            <img
                              className="type_icon"
                              src={item.auth_type === 1 ? correct : mistake}
                              alt=""
                            />
                            {t("Upload")}
                            {LISTTYPETEXT[item.event_type]}
                            {item.auth_type === 1
                              ? t("has been approved")
                              : t("Review failed")}
                          </div>
                          <div className="time">
                            {dayjs(item.created_at * 1000).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </div>
                        </div>
                        <div
                          className="box_con"
                          onClick={() =>
                            goInfo(item.event_type, item.content.id)
                          }
                        >
                          <div className="box_con_img">
                            <img
                              className="logo"
                              src={
                                item.content
                                  ? item.content.logo
                                  : defaultavatartwo
                              }
                              alt=""
                            />
                          </div>
                          <div className="box_con_text">
                            <div className="title">
                              {item.content ? item.content.title : ""}
                            </div>
                            <div className="desc">
                              {item.content ? item.content.desc : ""}
                            </div>
                          </div>
                        </div>
                        {/* <img
                          className="logo"
                          src={item.content ? item.content.logo : ""}
                          alt=""
                        />
                        <div className="content_box">
                          <div className="title">
                            {item.content ? item.content.title : ""}
                          </div>
                          <div className="desc">
                            {item.content ? item.content.desc : ""}
                          </div>
                          <div className="type">
                            {t("Upload")}
                            {LISTTYPETEXT[item.event_type]}
                            {item.auth_type === 1
                              ? t("has been approved")
                              : t("Review failed")}
                          </div>
                        </div>
                        <div className="status_box">
                          <img
                            src={item.auth_type === 1 ? success : fail}
                            alt=""
                          />
                        </div> */}
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                })}
                <div className="page">
                  <Pagination
                    current={pageRefType1.currentPage}
                    pageSize={10}
                    total={type1Total}
                    showSizeChanger={false}
                    hideOnSinglePage={true}
                    onChange={listType1Change}
                  />
                </div>
              </div>
              {/* 购买支付类 */}
              <div
                className="list_1"
                style={{ display: tabType === 2 ? "block" : "none" }}
              >
                {list2.map((item) => {
                  return (
                    <div className="list_1_item" key={item.id}>
                      <div className="box">
                        <div className="box_top">
                          <div className="type">
                            <img className="type_icon" src={buyicon} alt="" />
                            {t("Buying a membership costs points", {
                              num: item.points,
                            })}
                          </div>
                          <div className="time">
                            {dayjs(item.created_at * 1000).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </div>
                        </div>
                        {item.pay_type === 1 || item.pay_type === 2 ? (
                          <div className="box_con_huiyuan">
                            <div className="box_con_img">
                              <img className="logo" src={viplogo} alt="" />
                            </div>
                            <div className="box_con_text">
                              <div className="desc">
                                {item.content.type == 1 ? (
                                  <span>{t("listtype1")}</span>
                                ) : null}
                                {item.content.type == 2 ? (
                                  <span>{t("listtype2")}</span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="box_con"
                            onClick={() =>
                              goInfo(item.pay_type, item.content.id)
                            }
                          >
                            <div className="box_con_img">
                              <img
                                className="logo"
                                src={
                                  item.content
                                    ? item.content.logo
                                    : defaultavatartwo
                                }
                                alt=""
                              />
                            </div>
                            <div className="box_con_text">
                              <div className="title">
                                {item.title ? item.title : ""}
                              </div>
                              <div className="desc">
                                {item.desc ? item.desc : ""}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                })}
                <div className="page">
                  <Pagination
                    current={pageRefType2.currentPage}
                    pageSize={10}
                    total={type2Total}
                    showSizeChanger={false}
                    hideOnSinglePage={true}
                    onChange={listType2Change}
                  />
                </div>
              </div>
              {/* 浏览类 */}
              <div
                className="list_3"
                style={{ display: tabType === 3 ? "block" : "none" }}
              >
                {list3.map((item) => {
                  return (
                    <div className="list_3_item" key={item.id}>
                      <div className="box">
                        <div className="box_top">
                          <div className="type">
                            <img
                              src={
                                item.content && item.content.avatar
                                  ? item.content.avatar
                                  : defaultavatar
                              }
                              alt=""
                              className="type_img"
                            />
                            <div className="nickname">
                              {item.content ? item.content.nickname : ""}
                            </div>
                            <div className="type">
                              {t("browsed")}
                              {LISTTYPETEXT[item.event_type]}
                            </div>
                          </div>
                          <div className="time">
                            {dayjs(item.created_at * 1000).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </div>
                        </div>
                        <div
                          className="box_con"
                          onClick={() =>
                            goInfo(item.event_type, item.content.id)
                          }
                        >
                          <div className="box_con_img">
                            <img
                              className="logo"
                              src={
                                item.content
                                  ? item.content.logo
                                  : defaultavatartwo
                              }
                              alt=""
                            />
                          </div>
                          <div className="box_con_text">
                            <div className="title">
                              {item.content.title ? item.content.title : ""}
                            </div>
                            <div className="desc">
                              {item.content.desc ? item.content.desc : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="box">
                        <div className="agency_presentation">
                          <div className="lt_box"></div>
                          <div className="rb_box">
                            <img src={minboxbgone} alt="" />
                          </div>
                          <div className="desc_box">
                            <div className="box_line"></div>
                            <div className="flex_box">
                              <div className="title">
                                {item.content ? item.content.title : ""}
                              </div>
                              <div className="desc">
                                {item.content ? item.content.desc : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="type">
                          {t("browsed")}
                          {LISTTYPETEXT[item.event_type]}
                        </div>
                        <div className="by">
                          <img
                            src={
                              item.content && item.content.avatar
                                ? item.content.avatar
                                : defaultavatar
                            }
                            alt=""
                          />
                          <div>{item.content ? item.content.nickname : ""}</div>
                        </div>
                      </div> */}
                      <div className="line"></div>
                    </div>
                  );
                })}
                <div className="page">
                  <Pagination
                    current={pageRefType3.currentPage}
                    pageSize={10}
                    total={type3Total}
                    showSizeChanger={false}
                    hideOnSinglePage={true}
                    onChange={listType3Change}
                  />
                </div>
              </div>
              {/* 项目推送类 */}
              <div
                className="list_4"
                style={{ display: tabType === 4 ? "block" : "none" }}
              >
                {list4.map((item) => {
                  return (
                    <div className="list_4_item" key={item.id}>
                      <div className="box">
                        <div className="box_top">
                          <div className="type">
                            <div className="by">{t("by")}</div>
                            <img
                              src={
                                item.content && item.content.avatar
                                  ? item.content.avatar
                                  : defaultavatar
                              }
                              alt=""
                              className="type_img"
                            />
                            <div className="nickname">
                              {item.content ? item.content.nickname : ""}
                            </div>
                            <div>{t("created")}</div>
                          </div>
                          <div className="time">
                            {dayjs(item.created_at * 1000).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </div>
                        </div>
                        <div
                          className="box_con"
                          onClick={() =>
                            goInfo(item.event_type, item.content.id)
                          }
                        >
                          <div className="box_con_img">
                            <img
                              className="logo"
                              src={
                                item.content
                                  ? item.content.logo
                                  : defaultavatartwo
                              }
                              alt=""
                            />
                          </div>
                          <div className="box_con_text">
                            <div className="title">
                              {item.content ? item.content.name : ""}
                            </div>
                            <div className="desc">
                              {item.content ? item.content.desc : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="box">
                        <img
                          className="logo"
                          src={item.content ? item.content.logo : ""}
                          alt=""
                        />
                        <div className="content_box">
                          <div className="title">
                            <div>{item.content ? item.content.name : ""}</div>
                            <div className="by_box">
                              <div>{t("by")}</div>
                              <img
                                src={
                                  item.content && item.content.avatar
                                    ? item.content.avatar
                                    : defaultavatar
                                }
                                alt=""
                              />
                              <div>
                                {item.content ? item.content.nickname : ""}
                              </div>
                              <div>{t("created")}</div>
                            </div>
                          </div>
                          <div className="desc max_desc">
                            {item.content ? item.content.desc : ""}
                          </div>
                        </div>
                      </div> */}
                      <div className="line"></div>
                    </div>
                  );
                })}
                <div className="page">
                  <Pagination
                    current={pageRefType4.currentPage}
                    pageSize={10}
                    total={type4Total}
                    showSizeChanger={false}
                    hideOnSinglePage={true}
                    onChange={listType4Change}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="line-back"></div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default MessageCenter;
