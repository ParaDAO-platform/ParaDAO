import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import Publictitle from "../../components/Publictitle";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import { getCategory, getNewDocument } from "../../requests";

import project from "../../assets/img/home/project.png";
import newminbg from "../../assets/img/library/newminbg.png";
import defaultavatar from "../../assets/img/defaultavatar.png";
import watch from "../../assets/img/mylibrary/watch.png";
import focuson from "../../assets/img/mylibrary/focuson.png";
import "./library.less";
const Library = (props) => {
  const { t } = useTranslation();
  
  const [categoryList, setCategoryList] = useState([]);
  
  const [newList, setNewList] = useState([]);
  
  const [hottestList, setHottestList] = useState([]);

  const goSort = (id) => {
    props.history.push("/library/sort/" + id);
  };
  const goDetails = (id) => {
    props.history.push("/library/details/" + id);
  };
  useEffect(() => {
    getCategoryData();
    getNewDocumentData();
    getHotDocumentData();
  }, []);
  const getCategoryData = () => {
    getCategory().then((res) => {
      console.log("aa", res);
      if (res.code === 1) {
        setCategoryList(res.data);
      }
    });
  };
  const getNewDocumentData = () => {
    getNewDocument({ size: 10, type: 1 }).then((res) => {
      console.log("bbbbb", res);
      if (res.code === 1) {
        setNewList(res.data);
      }
    });
  };
  const getHotDocumentData = () => {
    getNewDocument({ size: 10, type: 2 }).then((res) => {
      console.log("ccccc", res);
      if (res.code === 1) {
        setHottestList(res.data);
      }
    });
  };
  return (
    <div className="library">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "", title: t("Library") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.4rem" }}
      />
      {/* <div className="coming_soon">{t("Coming soon")}</div> */}
      <div className="library_con">
        {/* 所有分类 */}
        {/* <div className="category">
          <div className="category_title">
            <Publictitle
              title={t("All the category")}
              textAlign="text_align_center"
            />
          </div>
          <div className="category_list">
            {categoryList.map((item) => {
              return (
                <div
                  className="category_list_item"
                  key={item.id}
                  onClick={() => goSort(item.id)}
                >
                  <span className="item_title">{item.name}</span>
                  <div className="item_min_box"></div>
                </div>
              );
            })}
          </div>
        </div> */}
        <div className="filter">
          <div className="filter_row">
            <div className="filter_row_left">
              <span className="filter_row_title">
                {t("Category")}:<span className="filter_row_title_box"></span>
              </span>
            </div>
            <div className="filter_row_right">
              {categoryList.map((item) => {
                return (
                  <span
                    key={item.id}
                    className="filter_row_item"
                    onClick={() => goSort(item.id)}
                  >
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        {/* 最新 */}
        <div className="uptodate">
          <div className="uptodate_title">
            <Publictitle title={t("up to date")} />
          </div>
          {/* <div className="uptodate_list">
            {newList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="uptodate_list_item"
                  onClick={() => {
                    goDetails(item.id);
                  }}
                >
                  <div className="img">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                  </div>
                  <div className="item_title">{item.title}</div>
                  <div className="item_text">{item.desc}</div>
                  <div className="item_min_box">
                    <img src={newminbg} alt="" />
                  </div>
                </div>
              );
            })}
          </div> */}
          <div className="uptodate_list">
            {newList.map((item, i) => {
              return (
                <div className="list_item" key={i}  onClick={() => {
                  goDetails(item.id);
                }}>
                  <div className="list_item_img">
                    <img src={item.logo} alt="" />
                  </div>
                  <div className="list_item_two">
                    <div className="list_item_two_left">
                      <span>{item.title}</span>
                    </div>
                    <div className="list_item_two_right">
                      <span className="item_data">
                        <span>
                          <img src={watch} alt="" />
                        </span>
                        <span>{item.click_d}</span>
                      </span>
                      <span className="item_data">
                        <span>
                          <img src={focuson} alt="" />
                        </span>
                        <span>{item.follow}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 最热 */}
        <div className="hottest">
          <div className="hottest_title">
            <Publictitle title={t("hottest")} />
          </div>
          <div className="hottest_list">
            {hottestList.map((item) => {
               return (
                <div className="list_item" key={item.id}  onClick={() => {
                  goDetails(item.id);
                }}>
                  <div className="list_item_img">
                    <img src={item.logo} alt="" />
                  </div>
                  <div className="list_item_two">
                    <div className="list_item_two_left">
                      <span>{item.title}</span>
                    </div>
                    <div className="list_item_two_right">
                      <span className="item_data">
                        <span>
                          <img src={watch} alt="" />
                        </span>
                        <span>{item.click_d}</span>
                      </span>
                      <span className="item_data">
                        <span>
                          <img src={focuson} alt="" />
                        </span>
                        <span>{item.follow}</span>
                      </span>
                    </div>
                  </div>
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
export default Library;
