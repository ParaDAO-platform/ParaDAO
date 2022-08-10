import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { message, Modal } from "antd";
import {
  DownOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import Base64 from "base-64";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import { getShowDocument, getDocumentFollow,downPdfDeck } from "../../requests";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

import defaultavatar from "../../assets/img/defaultavatar.png";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import minboxbgone from "../../assets/img/mechanism/minboxbgone.png";
import util from"../../utils/utils";
import "./librarydetails.less";
dayjs.extend(relativeTime);
const LibraryDetail = (props) => {
  let id = props.match.params.ids;
  let lang = localStorage.getItem("lang") || "cn";
  if (lang === "cn") {
    lang = "zh-cn";
  }
  const { t } = useTranslation();
  
  const [categoryWords, setCategoryWords] = useState([]);
  const [cardData, setCardData] = useState([]);
  
  const [isFollowVisible, setIsFollowVisible] = useState(false);
  
  const [isBuyVisible, setIsBuyVisible] = useState(false);
  
  const [isBuySuccessVisible, setIsBuySuccessVisible] = useState(false);
  
  const [isBuyFailedVisible, setIsBuyFailedVisible] = useState(false);
  
  const [documentDetails, setDocumentDetails] = useState({});
  
  const [follow, setFollow] = useState(0);
  
  const [userInfo, setUserInfo] = useState({});
  
  const [pdfUrl, setPdfUrl] = useState("");
  
  const [userRole, setUserRole] = useState(0);
  
  const [category, setCategory] = useState([]);
  
  const [followMessage, setFollowMessage] = useState("");
  
  const [buyPoints, setBuyPoints] = useState("");
  
  const [isMobile, setIsMobile] = useState(false);
  
  const [isShowCategory, setIsShowCategory] = useState(false);
  
  const [inte, setInte] = useState(0);
  const [numPages, setNumPages] = useState();
  
  const [remPage, setRemPage] = useState(0);

  const [isRemPage, setIsRemPage] = useState(false);

  const [followInfo, setFollowInfo] = useState({ is_follow: false, number: 0 });

  /************************ pdf start ********************/

  /************************ pdf end **********************/
  useEffect(() => {
    let width = document.body.clientWidth;

    if (width <= 750) {
      setIsMobile(true);
    }
    
    
    
    getAccountData();
    getDocumentDetails(id);
    window.addEventListener("click", closeCategory);
    return () => {
      window.removeEventListener("click", closeCategory);
    };
  }, []);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  useEffect(() => {
    getCategorysortMethod();
  }, []);
  const closeCategory = () => {
    setIsShowCategory(false);
  };
  const getAccountData = () => {
    
    
    
    
    
    
    
    
    
  };
  
  const getDocumentDetails = (id) => {
    
    getShowDocument({ id })
      .then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          
          const decrypt = Base64.decode(res.data.document.file);
          setPdfUrl(decrypt);
          setDocumentDetails(res.data.document);
          setCardData(res.data.related);
          setFollow(res.data.document.follow);
          setUserInfo(res.data.userinfo);
          setUserRole(res.data.user_role);
          setCategory(res.data.category_name);
          setBuyPoints(res.data.document.buy_points);
          let follow = false;
          if (res.data.follow === 0) {
            follow = true;
          }
          setFollowInfo({
            is_follow: follow,
            number: res.data.document.follow,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const getCategorysortMethod = () => {
    
    
    
    
    
    
    
    
    
    
    
  };
  const closeFollowModal = () => {
    setIsFollowVisible(false);
  };
  
  const followItem = () => {
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  };

  const closeBuyModal = () => {
    
    
    
    
    
    
    
    
    
    
  };
  /***************************deck操作**************************/
  
  const buyDeck = () => {
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  };

  
  const closeBuySuccessModal = () => {
    setIsBuySuccessVisible(false);
  };

  
  const closeBuyFailedModal = () => {
    setIsBuyFailedVisible(false);
    setIsBuyVisible(false);
  };
  
  const confirmGetIntegration = () => {
    closeBuyFailedModal();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("@", numPages);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    setIsRemPage(false);
    setNumPages(numPages);
  };
  
  const pdfView = () => {
    
    
    
    
    
    
    
    
    
    
    
    
    
    return numPages;
  };

  
  const goLink = (url) => {
    props.history.push(url);
  };

  
  const showCategory = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    setIsShowCategory(!isShowCategory);
  };
  const followClick = () => {
    getDocumentFollow({ id }).then((res) => {
      console.log("aaaaaa", res);
      if (res.code === 1) {
        let follow = false;
        if (res.data.is_follow === 1) {
          follow = true;
        }
        setFollowInfo({
          is_follow: follow,
          number: res.data.number,
        });
      }
    });
  };
  const goDetails = (id) => {
    props.history.push("/library/details/" + id);
    window.location.reload();
  };
  const downFile = (id) => {
    downPdfDeck({id}).then(res=>{
      if(res){
        util.pdfDow(res,t("library")+documentDetails.title)
      }
      
    })
  };
  return (
    <div className="librarydetails">
      <HeaderPersonal props={props} />
      {/* 面包屑导航  */}
      <div className="bread-crumbs-bar">
        <span onClick={() => goLink("/")}>{t("Home")} &gt;</span>
        <span onClick={() => goLink("/library")}> {t("Library")} &gt;</span>
        <span className="category-bar" onClick={(e) => showCategory(e)}>
          <span className="category-drop-icon">
            {" "}
            {t("Category")} <DownOutlined /> &gt;
          </span>
          <ul
            className="category-list"
            style={{ display: isShowCategory ? "block" : "none" }}
          >
            {category.map((item, i) => {
              return (
                <li key={i} onClick={() => goLink("/library/sort/" + item.id)}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </span>
        <span className="bread-crumbs-bar_title"> {documentDetails.title}</span>
      </div>
      <div className="library-detail">
        {/* library信息 */}
        <div className="lib-info">
          {/* 头像 */}
          <div className="left_top">
            <div className="left_top_info">
              <img
                src={
                  documentDetails.logo ? documentDetails.logo : defaultavatar
                }
                alt=""
              />
              <div className="left_title">{documentDetails.title}</div>
            </div>
            <div className="left_top_follow" onClick={followClick}>
              {followInfo.is_follow ? (
                <HeartFilled style={{ color: "#ce3964" }} />
              ) : (
                <HeartOutlined />
              )}
              <span className="follow_number">{followInfo.number}</span>
            </div>
          </div>
          {/* 类型 */}
          <div className="category">
            {category.map((item, i) => {
              return (
                <div
                  key={i}
                  className="category_item"
                  onClick={() => goLink("/library/sort/" + item.id)}
                >
                  {item.name}
                </div>
              );
            })}
            <div
                className="category_item"
                onClick={() => downFile(documentDetails.id)}
              >
                {t("Download")}
              </div>
          </div>
          <div className="user">
            <div className="user_left">
              <img
                src={userInfo.avatar ? userInfo.avatar : defaultavatartwo}
                alt=""
                className="user_img"
              />
              <span className="user_name">{userInfo.nickname}</span>
              <span className="user_time">
                {dayjs(documentDetails.created_at * 1000)
                  .locale(lang)
                  .fromNow()}
              </span>
            </div>
          </div>
          {/* 操作记录 */}
          {/* <div className="info-his">
            <div
              className="follw"
              onClick={() => {
                followItem();
              }}
            >
              {isFollow
                ? t("Followed") + " " + follow
                : t("Follow") + " " + follow}
            </div>
            <div>
              {t("pageviews")} {documentDetails.click_d}
            </div>
            <div>
              {t("purchase amount")} {documentDetails.down_number}
            </div>
          </div> */}
          {/* info-introduction */}
          <div className="agency_presentation">
            <div className="lt_box"></div>
            <div className="lb_box"></div>
            <div className="rb_box">
              <img src={minboxbgone} alt="" />
            </div>
            <div className="min_box"></div>
            <div className="title">
              {t("Financing stage")}:{documentDetails.financing_stage}
            </div>
            <div className="xian"></div>
            <div className="title">{t("Introduction")}</div>
            <div className="text">
              {documentDetails.desc}
              {/* {companyInfo.introduction.map((item, i) => {
                  return <p key={i}>{item}</p>;
                })} */}
            </div>
          </div>

          {/* info-deck */}
          <div className="info-deck">
            <div className="lt_box"></div>
            <div className="lb_box"></div>
            <div className="min_box"></div>
            <div className="title">{t("Deck")}</div>
            <div className="xian"></div>
            {/* pdf */}
            <div className="info-pdf-view">
              {
                
                <div>
                  <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    {numPages
                      ? new Array(pdfView()).fill("").map((item, index) => {
                          return <Page key={index} pageIndex={index} />;
                        })
                      : ""}
                  </Document>
                </div>
              }
            </div>
          </div>

          {/* 继续阅读部分 */}
          {/* {isRemPage ? (
            <div className="read">
              <div className="read-one">
                <span>{t("pages left unread", { val: remPage })}</span>
                <span className="read-one-right" onClick={buyDeck}>
                  {t("continue reading")}
                  <DownOutlined />
                </span>
              </div>
              <div className="read-two">
                <InfoCircleOutlined />
                {t("Continue reading after purchase")}
              </div>
            </div>
          ) : (
            ""
          )} */}
        </div>
        {/* Related */}
        <div className="related">
          <div className="title">{t("Related")}</div>
          <div className="related_list">
            {cardData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="related_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="item_left">
                    <img
                      src={item.logo ? item.logo : defaultavatartwo}
                      alt=""
                    />
                  </div>
                  <div className="item_right">
                    <div className="item_right_title">{item.title}</div>
                    <div className="item_right_text">{item.desc}</div>
                  </div>
                  <div className="min_box"></div>
                  <div className="bom_box"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* only tips Modal- follow弹窗 */}
        <Modal
          centered={true}
          closable={false}
          visible={isFollowVisible}
          footer={null}
          onCancel={closeFollowModal}
          className="modal-only-tips"
        >
          <div className="single-content">{followMessage}</div>
        </Modal>

        {/* two buttons Modal-购买deck */}
        <Modal
          centered={true}
          closable={false}
          visible={isBuyVisible}
          footer={null}
          onCancel={closeBuyModal}
          className="modal-two-button gmgz"
        >
          <div className="content">
            {/* <div className="content-title">{t("Buy Deck")}</div>
            <div className="content-body">Cost:{buyPoints} integration</div> */}
            <div className="single-content">
              <h3>{t("How get points")}</h3>
              <h3>{t("Points rules")}</h3>
              <div className="get-rules">
                <p>{t("Rule 1")}</p>
                <p>{t("Rule 2")}</p>
                <p>{t("Rule 3")}</p>
                <p>{t("Rule 4")}</p>
                <p>{t("Rule 5")}</p>
                <p>{t("Rule 6")}</p>
                <p>{t("Rule 7")}</p>
                <p>{t("Rule 8")}</p>
              </div>
            </div>
            <div className="content-button">
              <div className="button-excute" onClick={() => closeBuyModal()}>
                {t("Confirm")}
              </div>
            </div>
          </div>
        </Modal>

        {/* only tips Modal- deck购买成功弹窗 */}
        <Modal
          centered={true}
          closable={false}
          visible={isBuySuccessVisible}
          footer={null}
          onCancel={closeBuySuccessModal}
          className="modal-only-tips"
          zIndex={1001}
        >
          <div className="single-content">{t("Buy success")}</div>
        </Modal>

        {/* two buttons Modal- deck购买失败弹窗 */}
        <Modal
          centered={true}
          closable={false}
          visible={isBuyFailedVisible}
          footer={null}
          onCancel={closeBuyFailedModal}
          className="modal-two-button"
        >
          <div className="content">
            <div className="content-title">{t("No enough points")}</div>
            <div className="content-body" style={{ color: "red" }}>
              {t("Get more integration")}
            </div>
            <div className="content-button">
              <div
                className="button-excute"
                onClick={() => closeBuyFailedModal()}
              >
                {t("Cancel")}
              </div>
              <div
                className="button-excute"
                onClick={() => confirmGetIntegration()}
              >
                {t("Confirm")}
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <Footer props={props} />
    </div>
  );
};

export default LibraryDetail;
