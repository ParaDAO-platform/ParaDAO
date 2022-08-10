import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Spin,
  ConfigProvider,
} from "antd";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../requests/api";
import HeaderPersonal from "../../components/HeaderPersonal";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import Footer from "../../components/Footer";
import PersonalCenter from "../../components/PersonalCenter";
import {
  getGEditDocument,
  getPEditDocument,
  getCategory,
} from "../../requests";
import { InboxOutlined } from "@ant-design/icons";
import defaultavatartherr from "../../assets/img/defaultavatartherr.png";

import "./libraryedit.less";

const { Option } = Select;
const LibraryEdit = (props) => {
  const { t } = useTranslation();
  const id = props.match.params.ids;
  const [form] = Form.useForm();
  
  const [pdfName, setPdfName] = useState("");
  
  const [pdfSpin, setPdfSpin] = useState(false);
  
  const [logoSpin, setLogoSpin] = useState(false);
  
  const [pdfLink, setPdfLink] = useState("");
  
  const [selectList, setSelectList] = useState([]);
  const [logo, setLogo] = useState("");
  const [activeId, setActiveId] = useState("0");
  
  const [points, setPoints] = useState([]);
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center", color: "#fff" }}>
      <InboxOutlined style={{ fontSize: 80 }} />
      <p>{t("no data")}</p>
    </div>
  );
  useEffect(() => {
    getDocumentInfo();
    getCategoryList();
    
  }, []);
  useEffect(() => {
    form.setFieldsValue({ logo: logo });
  }, [logo]);
  useEffect(() => {
    form.setFieldsValue({ file: pdfLink });
  }, [pdfLink]);
  const getDocumentInfo = () => {
    getGEditDocument({ id })
      .then((res) => {
        console.log("aaaaaaa", res);
        if (res.code === 1) {
          let arr = res.data.category.split(",");
          let newArr = [];
          arr.forEach((item) => {
            newArr.push(Number(item));
          });
          res.data.category = newArr;
          form.setFieldsValue(res.data);
          setPdfName(res.data.file_name);
          setLogo(res.data.logo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategoryList = () => {
    getCategory()
      .then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          setSelectList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  const onLibEditFinish = (values) => {
    if (values.category.length > 10) {
      return message.error(t("Category selection cannot exceed ten"));
    }
    values.category = values.category.join(",");
    getPEditDocument({ ...values, file_name: pdfName, id })
      .then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          message.success(t("Modified successfully"));
          props.history.goBack();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imgUpload = {
    name: "file",
    action: BASE_URL + "api/user/upload_file",
    headers: {
      token: localStorage.getItem("TOKEY"),
    },
    data: {
      filetype: "image",
    },
    beforeUpload: (file) => {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        message.error(t("The picture format"));
        return false;
      }
      const size = file.size / 1024;
      if (size > 2048) {
        message.error(t("The picture size"));
        return false;
      }
    },
    onChange(info) {
      if (info.file.status === "uploading") {
        setLogoSpin(true);
      }
      if (info.file.status === "done") {
        setLogoSpin(false);
        if (info.file.response.code === 1) {
          console.log("info.file.response.data.url", info.file.response.data);
          setLogo(info.file.response.data);
        } else {
          message.error(t("Failed to upload logo"));
        }
      } else if (info.file.status === "error") {
        setLogoSpin(false);
        message.error(t("Failed to upload logo"));
      }
    },
  };
  const pdfUpload = {
    name: "file",
    action: BASE_URL + "api/user/upload_file",
    headers: {
      token: localStorage.getItem("TOKEY"),
    },
    data: {
      filetype: "file",
    },
    beforeUpload: (file) => {
      if (file.size >= 100 * 1024 * 1024) {
        message.error(t("Pdf size"));
      }
      if (file.type !== "application/pdf") {
        message.error(t("Only PDF"));
        return false;
      }
    },
    onChange(info) {
      if (info.file.status === "uploading") {
        setPdfSpin(true);
      }
      if (info.file.status === "done") {
        setPdfSpin(false);
        if (info.file.response.code === 1) {
          setPdfLink(info.file.response.data);
          setPdfName(info.file.name);
        } else {
          message.error(t("Failed to upload pdf"));
        }
      } else if (info.file.status === "error") {
        setPdfSpin(false);
        message.error(t("Failed to upload pdf"));
      }
    },
  };
  return (
    <div className="libraryedit">
      <HeaderPersonal props={props} />
      {/* <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/mylibrary", title: t("my library") },
          { to: "", title: t("Edit a library") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.4rem" }}
      /> */}
      <div className="lib-edit">
        <div className="lib-edit_left">
          <PersonalCenter props={props} />
        </div>
        <div className="lib-edit_right">
          <div className="lib-edit-right-top">
            <span>{t("upload and download")}</span>
            <span className="icon">&gt;</span>
            <span>{t("Upload Deck")}</span>
          </div>
          <div className="edit-box">
            {/* <div className="edit-tags">
              <div className="min_box"></div> {t("Edit a library")}
            </div> */}
            <div className="edit-form">
              <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <Form
                  className="edit-component"
                  onFinish={onLibEditFinish}
                  autoComplete="off"
                  layout="vertical"
                  form={form}
                >
                  <Form.Item
                    label={t("Title")}
                    name="title"
                    rules={[
                      {
                        required: true,
                        max: 50,
                        message: t("title-message"),
                      },
                    ]}
                  >
                    <Input maxLength={50} className="edit-title" />
                  </Form.Item>
                  <div className="agency_xian"></div>
                  <Form.Item
                    label={
                      <span className="picture">
                        <span>{t("picture")} </span>
                        <span className="suggestions">
                          {t("Image suggestions")}
                        </span>
                      </span>
                    }
                    name="logo"
                    className="logo"
                    rules={[
                      {
                        required: true,
                        message: t("Please select your logo"),
                      },
                    ]}
                  >
                    <>
                      <Input style={{ display: "none" }} />

                      <div className="logo_img">
                        <div className="img">
                          <img src={logo ? logo : defaultavatartherr} alt="" />
                        </div>

                        <Upload {...imgUpload}>
                          <Button className="deck-add-button">
                            {logoSpin ? <Spin size="small" /> : "+" + t("Add")}
                          </Button>
                        </Upload>
                      </div>
                    </>
                  </Form.Item>
                  <div className="agency_xian"></div>
                  <Form.Item
                    label={t("Introduction")}
                    name="desc"
                    className="introduction"
                    rules={[
                      {
                        required: true,
                        max: 500,
                        message: t("Introduction-message"),
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      maxLength={500}
                      style={{ height: "auto" }}
                    />
                  </Form.Item>
                  <div className="agency_xian"></div>
                  {/* 融资阶段 */}
                  <Form.Item
                    name="financing_stage"
                    label={t("Financing stage")}
                    className="deck-integration"
                    defaultValue={activeId}
                    rules={[
                      {
                        required: true,
                        message: t("Please select a stage"),
                      },
                    ]}
                  >
                    <Select
                      style={{ backgroundColor: "#383737" }}
                      className="category-select"
                      placeholder={t("Please select a stage")}
                    >
                      <Option value="Seed">{t("Seed")}</Option>
                      <Option value="Angel">{t("Angel")}</Option>
                      <Option value="Private">{t("Private")}</Option>
                      <Option value="IDO">{t("IDO")}</Option>
                      <Option value="IGO">{t("IGO")}</Option>
                      <Option value="IEO">{t("IEO")}</Option>
                      <Option value="ICO">{t("ICO")}</Option>
                      <Option value="In the transaction">
                        {t("already_trading")}
                      </Option>
                    </Select>
                  </Form.Item>
                  <div className="agency_xian"></div>
                  <Form.Item
                    name="category"
                    label={t("Category")}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      style={{ backgroundColor: "#383737" }}
                      className="category-select"
                    >
                      {selectList.map((item, i) => {
                        return (
                          <Option
                            className="category-select-option"
                            value={item.id}
                            key={i}
                          >
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <div className="agency_xian"></div>
                  <Form.Item
                    label={t("Deck") + t("Deck Size")}
                    name="file"
                    className="pdf"
                    rules={[
                      {
                        required: true,
                        message: t("Please upload PDF document"),
                      },
                    ]}
                  >
                    <>
                      <Input style={{ display: "none" }} />
                      <div className="pdf_link">
                        <div className="link">{pdfName}</div>
                        <Upload {...pdfUpload}>
                          <Button className="deck-add-button">
                            {pdfSpin ? (
                              <Spin size="small" />
                            ) : (
                              "+" + t("add deck")
                            )}
                          </Button>
                        </Upload>
                      </div>
                    </>
                  </Form.Item>
                  {/* 积分选择 */}
                  {/* <Form.Item
                  name="buy_points"
                  label={t("Integration sold by Deck")}
                  className="deck-integration"
                  defaultValue={activeId}
                  rules={[
                    {
                      required: true,
                      message: t("Please select a price"),
                    },
                  ]}
                >
                  <Select
                    style={{ backgroundColor: "#383737" }}
                    className="category-select"
                    placeholder={t("Please select a price")}
                  >
                    {points.map((item, i) => {
                      return (
                        <Option value={item} key={i}>
                          {item}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item> */}
                  <Form.Item className="submit">
                    <div className="agency_submit_xian"></div>
                    <div className="submit_btn">
                      <Button className="deck-add-button" htmlType="submit">
                        {t("Submit")}
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default LibraryEdit;
