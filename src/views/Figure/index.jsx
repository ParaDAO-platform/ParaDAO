import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import { message, Statistic, Pagination, Input } from "antd";
import useDebounceHook from "../../utils/useDebounceHook";
import { getPersonageList, getSearchPersonage } from "../../requests";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import SearchInput from "../../components/SearchInput";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import formatMonenyNumber from "../../utils/formatMonenyNumber";
import defaultavatar from "../../assets/img/defaultavatar.png";
import defaultavatartwo from "../../assets/img/defaultavatartwo.png";
import arrow from "../../assets/img/header/arrow.png";
import "./figure.less";
const Figure = (props) => {
  const { t } = useTranslation();
  const { src } = props.match.params;
  
  const type = [
    {
      id: 0,
      title: t("angel investor"),
      key: 1,
    },
    {
      id: 1,
      title: t("Company founder"),
      key: 2,
    },
    {
      id: 2,
      title: t("Fund founder"),
      key: 3,
    },
  ];

  
  const [roundsActive, setRoundsActive] = useState(src ? src : 1);
  const [searchVal, setSearchVal] = useState("");

  
  const [dataList, setDataList] = useState([]);
  const [total, setTotal] = useState(0);
  const debounceText = useDebounceHook(searchVal, 1000);
  
  const pageRef = useRef({
    currentPage: 1,
    lastPage: 2,
    isRequest: true,
  });
  useEffect(() => {
    
  }, []);

  const getInvestorsListData = (keyOne) => {
    const { currentPage } = pageRef.current;
    getPersonageList({
      type: keyOne,
      page: currentPage,
      search: searchVal,
    }).then((res) => {
      console.log("res", res);
      if (res.code === 1) {
        setDataList(res.data.data);
        pageRef.current.lastPage = res.data.last_page;
        setTotal(res.data.total);
      }
    });
  };
  const typeClick = (item) => {
    setRoundsActive(item.key);
    getInvestorsListData(item.key);
  };

  const goDetails = (id) => {
    props.history.push("/figure/details/" + id);
  };
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  useEffect(() => {
    getPersonageList({
      type: roundsActive,
      search: searchVal,
      page: 1,
    }).then((res) => {
      if (res.code === 1) {
        setDataList(res.data.data);
        setTotal(res.data.total);
      }
    });
  }, [debounceText]);
  const listChange = (page) => {
    console.log("page", page);
    pageRef.current.currentPage = page;
    pageRef.current.isRequest = false;
    getPersonageList({
      type: roundsActive,
      page: page,
      search: searchVal,
    }).then((res) => {
      if (res.code === 1) {
        setDataList(res.data.data);
        setTotal(res.data.total);
      }
    });
  };
  const searchValChange = ({ target: { value } }) => {
    setSearchVal(value);
  };
  const { currentPage } = pageRef.current;
  return (
    <div className="figure">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "", title: t("Figure") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      />
      <div className="search_f">
            <SearchInput
              props={props}
              setDataList={setDataList}
              getInterface={getSearchPersonage}
              getList={getPersonageList}
              setTotal={setTotal}
            />
          </div>
      <div className="figure_main">
        <div className="figure_con">
          {/* <div className="filter">
            <div className="filter_row">
              <div className="filter_row_left">
                <span className="filter_row_title">
                  {t("type")}
                  <span className="filter_row_title_box"></span>
                </span>
              </div>
              <div className="filter_row_right">
                {type.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className={
                        roundsActive === item.key
                          ? "filter_row_item filter_row_item_active"
                          : "filter_row_item"
                      }
                      onClick={() => typeClick(item)}
                    >
                      {item.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div> */}
          {/* <div className="search">
              <Input
              placeholder={t("Search_figure_placeholder")}
              className="search_input"
              bordered={false}
              onChange={searchValChange}
            />
              <div className="search_btn">
                <img src={arrow} alt="" />
              </div>
            </div> */}
          
          <div className="figure_list">
            {dataList.map((item) => {
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
            style={{ display: total ? "flex" : " none" }}
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
