import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Publictitle from "../../components/Publictitle";

import project from "../../assets/img/home/project.png";
import {
  getInvestorsList,
  getCompaniesLists,
  getEventList,
} from "../../requests";
import formatMonenyNumber from "../../utils/formatMonenyNumber";
import digitalconversion from "../../utils/digitalconversion";
import defaultavatar from "../../assets/img/defaultavatar.png";
import eventimg from "../../assets/img/home/eventimg.png";
import "./home.less";
const Home = (props) => {
  const { t } = useTranslation();
  
  const [institutionList, setInstitutionList] = useState([]);
  
  const [projectList, setProjectList] = useState([]);
  
  const [eventList, setEventList] = useState([]);
  
  const [reportData, setReportData] = useState({
    onenum: 510,
    twonum: 520,
    therrnum: 530,
    fournum: 540,
  });
  useEffect(() => {
    getHomeInvestorsList();
    getHomeCompaniesLists();
    getHomeEventList();
  }, []);
  
  const getHomeInvestorsList = () => {
    getInvestorsList({
      stages: "",
      type: "",
      year: "",
      page: 1,
      pagesize: 8,
    }).then((res) => {
      if (res.code === 1) {
        setInstitutionList(res.data.data);
      }
    });
  };
  
  const getHomeCompaniesLists = () => {
    getCompaniesLists({
      stages: "",
      year: "",
      page: 1,
      pagesize: 8,
    }).then((res) => {
      if (res.code === 1) {
        setProjectList(res.data.data);
      }
    });
  };
  
  const getHomeEventList = () => {
    getEventList({
      stages: "",
      year: "",
      page: 1,
      pagesize: 4,
    }).then((res) => {
      if (res.code === 1) {
        setEventList(res.data.data);
      }
    });
  };
  const goDetails = (id) => {
    props.history.push("/mechanism/details/" + id);
  };
  const goCompanyDetails = (id) => {
    props.history.push("/company/details/" + id);
  };
  const goEventDetails = (id) => {
    props.history.push("/event/details/" + id);
  };
  const goMechanism = () => {
    props.history.push("/mechanism");
  };
  const goCompany = () => {
    props.history.push("/company");
  };
  const goEvent = () => {
    props.history.push("/event");
  };
  const goLibrary = () => {
    props.history.push("/library");
  };
  return (
    <div className="home">
      <Header props={props} />
      <div className="institution">
        <div className="institution_con">
          <div className="institution_top">
            <Publictitle title={t("INSTITUTION")} />
            <div className="more" onClick={goMechanism}>
              {t("More")}
            </div>
          </div>

          <div className="institution_list">
            {institutionList.map((item) => {
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
        </div>
      </div>
      <div className="ibrary">
        <div className="ibrary_left">
          <div className="ibrary_top">
            <div className="box_con">
              <div className="box">
                <div className="box_kuang"></div>
                <div className="para">Para</div>
                <div className="dao">
                  DAO <span className="dian">.</span>
                </div>
              </div>
              <div className="blockchain">
                {t("Discover the blockchain")}
                <span className="sj"></span>
              </div>
              <div className="ours">
                {t("We are glad to have you as one of ours")}
                <span className="sj"></span>
              </div>
              <div className="explore">
                {t("Explore more")}
                <span className="sj"></span>
              </div>
            </div>
          </div>
          <div className="ibrary_bom"></div>
        </div>
        <div className="ibrary_right">
          <div className="ibrary_top">
            <div className="box_con">
              <Publictitle title={t("IBRARY")} />
              <div className="dian"></div>
              <div className="box_title">ParaDAO</div>
              <div className="box_text">{t("We are glad")}</div>
            </div>
          </div>
          <div className="ibrary_bom">
            <div className="btn" onClick={goLibrary}>
              {t("Explore more")}
            </div>
          </div>
        </div>
      </div>
      <div className="project">
        <div className="project_con">
          <div className="project_con_top">
            <Publictitle title={t("Company")} />
            <div className="more" onClick={goCompany}>
              {t("More")}
            </div>
          </div>

          <div className="text">
            {t("We are glad to have you as one of ours")}
          </div>
          <div className="project_list">
            {projectList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="company_list_item"
                  onClick={() => goCompanyDetails(item.id)}
                >
                  <div className="title">
                    <img src={item.logo ? item.logo : defaultavatar} alt="" />
                    <span className="tit">
                      {item.company}
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
        </div>
      </div>
      <div className="kol">
        <div className="kol_top">
          <div className="kol_top_con">
            <Publictitle title={"KOL"} />
            <div className="dian"></div>
            <div className="kol_title">ParaDAO</div>
            <div className="kol_text">{t("We are glad")}</div>
          </div>
        </div>
        <div className="kol_bom">
          <div className="kol_bom_box chenone">EVENT</div>
          <div className="kol_bom_box chentwo">REPORT</div>
          <div className="kol_bom_box kol_bom_title">
            <div className="kol_bom_title_one"></div>
            <div className="kol_bom_title_two">
              <div className="kol_bom_title_two_box_one"></div>
              <div className="kol_bom_title_two_box_two"></div>
              <div className="kol_bom_title_two_box_therr"></div>
              <div className="kol_bom_title_two_box_four"></div>
            </div>
            <div className="kol_bom_title_therr">
              <div className="dian"></div>
              <span className="dian_title">Para DAO</span>
            </div>
          </div>
          <div className="kol_bom_box chentwo">REPORT</div>
          <div className="kol_bom_box chentherr">INSTI-TUTION</div>
          <div className="kol_bom_box chentwo">LIBRARY</div>
          <div className="kol_bom_box chenone">PROJ-ECT</div>
          <div className="kol_bom_box chentherr">KOL</div>
        </div>
      </div>
      <div className="minbanner">
        <div className="minbanner_title">ParaDAO</div>
        <div className="minbanner_text">
          {t("We are glad to have you as one of ours")}
        </div>
      </div>
      <div className="event">
        <div className="event_con">
          <div className="event_con_top">
            <Publictitle title={t("Event")} />
            <div className="more" onClick={goEvent}>
              {t("More")}
            </div>
          </div>

          <div className="event_text">
            {t("We are glad to have you as one of ours")}
          </div>
          <div className="event_list">
            {eventList.map((item, i) => {
              return (
                <div
                  key={i}
                  className="event_item"
                  onClick={() => {
                    goEventDetails(item.id);
                  }}
                >
                  {/* <img src={eventimg} alt="" className="event_item_img" /> */}
                  <div className="item_right">
                    <div className="item_right_title">{item.project}</div>
                    <div className="item_right_text">{item.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div className="report">
        <div className="report_con">
          <Publictitle title={t("REPORT")} />
          <div className="report_text">
            {t("We are glad to have you as one of ours")}
          </div>
          <div className="report_data">
            <div className="data_item">
              <div className="square"></div>
              <span className="num">{reportData.onenum}+</span>
              <span className="text">aaaaa</span>
            </div>
            <div className="data_item">
              <div className="square"></div>
              <span className="num">{reportData.onenum}+</span>
              <span className="text">aaaaa</span>
            </div>
            <div className="data_item">
              <div className="square"></div>
              <span className="num">{reportData.onenum}+</span>
              <span className="text">aaaaa</span>
            </div>
            <div className="data_item">
              <div className="square"></div>
              <span className="num">{reportData.onenum}+</span>
              <span className="text">aaaaa</span>
            </div>
          </div>
          <div className="join">
            <div className="join_title">{t("Join Us")}</div>
            <div className="join_text">
              {t("We are glad to have you as one of ours")}
            </div>
            <div className="join_box">
              <div className="join_box_left">{t("Find you want")}</div>
              <div className="join_box_right">{t("Find you want")}</div>
            </div>
          </div>
        </div>
      </div> */}
      <Footer props={props} />
    </div>
  );
};
export default Home;
