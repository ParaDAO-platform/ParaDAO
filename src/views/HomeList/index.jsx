import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import { message, Statistic, Pagination, Input, Empty } from "antd";
import useDebounceHook from "../../utils/useDebounceHook";
import {
  getPersonageList,
  getInvestorsList,
  getCompaniesLists,
} from "../../requests";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import SearchInput from "../../components/SearchInput";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import searchimg from "../../assets/img/searchimg.png";
import caiboximg from "../../assets/img/cai_box.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import digitalconversion from "../../utils/digitalconversion";
import "./home_list.less";
const Figure = (props) => {
  const { t } = useTranslation();
  
  const [menuctive, setMenuActive] = useState("Mechanism");
  const [searchVal, setSearchVal] = useState(
    props.match.params.key ? props.match.params.key : ""
  );
  const [inputVal] = useState(
    props.match.params.key ? props.match.params.key : ""
  );

  
  const [mechanismList, setMechanismList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [figureList, setFigureList] = useState([]);
  
  const [total, setTotal] = useState(0);
  const debounceText = useDebounceHook(searchVal, 1000);
  
  const pageRef = useRef({
    currentPage: 1,
    lastPage: 2,
    isRequest: true,
  });
  const goDetails = (id) => {
    if (menuctive === "Mechanism")
      props.history.push("/mechanism/details/" + id);
    if (menuctive === "Company") props.history.push("/company/details/" + id);
    if (menuctive === "Figure") props.history.push("/figure/details/" + id);
  };
  useEffect(() => {
    getListsData();
  }, [debounceText]);
  const listChange = (page) => {
    console.log("page", page);
    pageRef.current.currentPage = page;
    pageRef.current.isRequest = false;
    getListsData(page);
  };
  const searchValChange = ({ target: { value } }) => {
    setSearchVal(value);
  };
  const getListData = (type) => {
    pageRef.current.isRequest = false;
    setMenuActive(type);
    getListsData(1, type);
  };
  
  const getListsData = (page = 1, type = menuctive) => {
    if (type === "Mechanism") {
      getInvestorsList({
        stages: "",
        type: "",
        year: "",
        search: searchVal,
        page: page,
        pagesize: 12,
      }).then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          setMechanismList(res.data.data);
          pageRef.current.lastPage = res.data.last_page;
          pageRef.current.isRequest = true;
          setTotal(res.data.total);
        }
      });
    }
    if (type === "Company") {
      getCompaniesLists({
        stages: "",
        year: "",
        search: searchVal,
        page: page,
        pagesize: 12,
      }).then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          setCompanyList(res.data.data);
          pageRef.current.lastPage = res.data.last_page;
          pageRef.current.isRequest = true;
          setTotal(res.data.total);
        }
      });
    }
    if (type === "Figure") {
      getPersonageList({
        type: "",
        search: searchVal,
        page: page,
        pagesize: 12,
      }).then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          setFigureList(res.data.data);
          pageRef.current.lastPage = res.data.last_page;
          pageRef.current.isRequest = true;
          setTotal(res.data.total);
        }
      });
    }
  };
  const { currentPage, isRequest } = pageRef.current;
  return (
    <div className="figure">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "", title: t("List") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      />
      <div className="figure_main">
        <div className="figure_con">
          <div className="search">
            <div className="searchinput">
              <div className="input">
                <Input
                  prefix={<img src={searchimg} alt="" className="searchimg" />}
                  className="search_input"
                  placeholder={t("Find you want")}
                  bordered={false}
                  defaultValue={inputVal}
                  onChange={searchValChange}
                  allowClear
                />
                <img src={caiboximg} alt="" className="cai_box" />
              </div>
            </div>
          </div>
          <div className="menu_box">
            {/* <div className={menuctive==='Library' ? 'public_title_t active' : "public_title_t"} onClick={()=>getListData("Library")}>{t("Library")}</div> */}
            <div
              className={
                menuctive === "Mechanism"
                  ? "public_title_t active"
                  : "public_title_t"
              }
              onClick={() => getListData("Mechanism")}
            >
              {t("Mechanism")}
            </div>
            <div
              className={
                menuctive === "Company"
                  ? "public_title_t active"
                  : "public_title_t"
              }
              onClick={() => getListData("Company")}
            >
              {t("Company")}
            </div>
            <div
              className={
                menuctive === "Figure"
                  ? "public_title_t active"
                  : "public_title_t"
              }
              onClick={() => getListData("Figure")}
            >
              {t("Figure")}
            </div>
          </div>
          {/* <div className="empty_box" style={{display:dataList.length===0 ?"flex":"none"}}>
          <Empty />
          </div> */}
          {/* 机构 */}
          <div
            className="mechanism_list"
            style={{ display: menuctive === "Mechanism" ? "flex" : "none" }}
          >
            {mechanismList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="mechanism_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="title">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                    <span className="tit">
                      {item.investor}
                      {/* <span>{item.investor}</span> */}
                      {/* <span
                        className="tit_icon"
                        onClick={() => follow(item.id)}
                      >
                        {item.is_follow ? (
                          <HeartFilled style={{ color: "#ce3964" }} />
                        ) : (
                          <HeartOutlined />
                        )}
                      </span> */}
                    </span>
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
                    <span className="recent_info">
                      {item.newFundraising.project} $
                      {digitalconversion(item.newFundraising.amount)}{" "}
                      {item.newFundraising.stages}
                    </span>
                  </div>
                  <div className="bom_box"></div>
                </div>
              );
            })}
          </div>
          {/* 公司 */}
          <div
            className="company_list"
            style={{ display: menuctive === "Company" ? "flex" : "none" }}
          >
            {companyList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="company_list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="title">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                    <span className="tit">{item.company}</span>
                  </div>
                  <div className="invest">
                    <div className="invest_item">
                      <div className="invest_item_title">
                        {t("total financing")}
                      </div>
                      <div className="invest_item_num">
                        {digitalconversion(item.funding_received)}
                      </div>
                    </div>
                    <div className="invest_item">
                      <div className="invest_item_title">
                        {t("current round")}
                      </div>
                      <div className="invest_item_num">{item.round}</div>
                    </div>
                  </div>
                  <div className="xian"></div>
                  <div className="recent">
                    <span>{t("Established")}</span>
                    <span className="recent_info">{item.create_time}</span>
                  </div>
                  <div className="bom_box"></div>
                </div>
              );
            })}
          </div>
          <div
            className="figure_list"
            style={{ display: menuctive === "Figure" ? "flex" : "none" }}
          >
            {figureList.map((item) => {
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
          <div
            className="page_box"
            style={{ display: total && isRequest ? "flex" : " none" }}
          >
            <Pagination
              current={currentPage}
              pageSize={16}
              total={total}
              showSizeChanger={false}
              onChange={listChange}
            />
          </div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default Figure;
