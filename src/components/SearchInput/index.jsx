import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import useDebounceHook from "../../utils/useDebounceHook";

import searchimg from "../../assets/img/searchimg.png";
import caiboximg from "../../assets/img/cai_box.png";

import "./searchinput.less";
const SearchInput = ({
  props,
  setDataList,
  getInterface,
  getList,
  setTotal,
  setOneActive,
  setTwoActive,
  setTherrActive,
}) => {
  const { t } = useTranslation();
  
  const [inputVal, setInputVal] = useState("");
  
  const [searchList, setSearchList] = useState([]);
  const inputValCha = useDebounceHook(inputVal, 500);
  
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    if (!isSearch) return;
    if (!inputValCha) {
      getListData("");
      return;
    }
    getInterface({ search: inputValCha }).then((res) => {
      if (res.code === 1) {
        setSearchList(res.data);
      }
    });
  }, [inputValCha]);
  const inputValChange = ({ target: { value } }) => {
    setIsSearch(true);
    setInputVal(value);
  };
  const inputValEnter = ({ target: { value } }) => {
    getListData(value);
  };

  const getListData = (val) => {
    setInputVal(val);
    setSearchList([]);
    setOneActive && setOneActive("");
    setTwoActive && setTwoActive("");
    setTherrActive && setTherrActive("");
    getList({ search: val, pagesize: 12 }).then((res) => {
      if (res.code === 1) {
        setDataList(res.data.data);
        setTotal(res.data.total);
        setIsSearch(false);
      }
    });
  };
  const search = () => {
    getListData(inputVal);
  };
  return (
    <div className="searchinput">
      <div className="input">
        <Input
          prefix={<img src={searchimg} alt="" className="searchimg" />}
          className="search_input"
          placeholder={t("Find you want")}
          bordered={false}
          value={inputVal}
          onChange={inputValChange}
          onPressEnter={inputValEnter}
          allowClear
        />
        <div className="cai_big_box" onClick={search}>
          <img src={caiboximg} alt="" className="cai_box" />
          <div className="search_img"></div>
        </div>
      </div>
      <div className="search_list">
        {searchList.map((item, i) => {
          return (
            <div
              key={i}
              className="search_list_item"
              onClick={() => getListData(item)}
            >
              <img src={searchimg} alt="" />
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchInput;
