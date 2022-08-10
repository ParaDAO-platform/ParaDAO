import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import Publictitle from "../../components/Publictitle";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import { getCategoryDocument } from "../../requests";
import { Pagination } from "antd";

import defaultavatar from "../../assets/img/defaultavatar.png";

import "./librarysort.less";
const LibrarySort = (props) => {
  console.log(props);
  let type = props.match.params.type;
  const { t } = useTranslation();
  
  const [info, setInfo] = useState({});
  
  const [sortList, setSortList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCategoryDocumentData();
  }, []);
  const getCategoryDocumentData = () => {
    getCategoryDocument({ id: type }).then((res) => {
      console.log("aaaa", res);
      if (res.code === 1) {
        setInfo(res.data.category);
        setSortList(res.data.document.data);
        setTotal(res.data.total);
      }
    });
  };
  const goDetails = (id) => {
    props.history.push("/library/details/" + id);
  };
  const listChange = (page) => {
    setCurrentPage(page);
    getCategoryDocument({ id: type, page: page, pagesize: 12 }).then((res) => {
      if (res.code === 1) {
        setInfo(res.data.category);
        setSortList(res.data.document.data);
      }
    });
  };
  return (
    <div className="librarydetails">
      <HeaderPersonal props={props} />
      <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/library", title: t("Library") },
          { to: "", title: info.name },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      />
      <div className="librarydetails_con">
        <div className="librarydetails_box">
          <div className="librarydetails_title">
            <Publictitle title={info.name} textAlign="text_align_center" />
          </div>
          <div className="librarydetails_list">
            {sortList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="list_item"
                  onClick={() => goDetails(item.id)}
                >
                  <div className="list_item_top">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                    <span>{item.title}</span>
                  </div>
                  <div className="list_item_bom">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="page_box">
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
export default LibrarySort;
