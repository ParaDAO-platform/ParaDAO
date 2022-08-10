import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import Footer from "../../components/Footer";
import PersonalCenter from "../../components/PersonalCenter";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Spin,
  ConfigProvider,
  Modal,
} from "antd";
import { BASE_URL } from "../../requests/api";
import { InboxOutlined } from "@ant-design/icons";
import { getCategory, getUploadDocument } from "../../requests";
import defaultavatartherr from "../../assets/img/defaultavatartherr.png";
import success_img from "../../assets/img/mylibrary/success_img.png";
import "./createdeck.less";
const CreateDeck = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { Option } = Select;
  
  const [logo, setLogo] = useState("");
  
  const [logoSpin, setLogoSpin] = useState(false);
  const [pdfSpin, setPdfSpin] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [activeId, setActiveId] = useState("0");
  
  const [pdfLink, setPdfLink] = useState("");
  
  const [pdfName, setPdfName] = useState("");
  
  const [points, setPoints] = useState([]);
  
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center", color: "#fff" }}>
      <InboxOutlined style={{ fontSize: 80 }} />
      <p>{t("no data")}</p>
    </div>
  );
  useEffect(() => {
    setCategory();
    
  }, []);
  useEffect(() => {
    form.setFieldsValue({ logo: logo });
  }, [logo]);
  useEffect(() => {
    form.setFieldsValue({ file: pdfLink });
  }, [pdfLink]);
  
  const setCategory = () => {
    getCategory()
      .then((res) => {
        console.log("分类", res);
        if (res.code === 1) {
          setCategoryList(res.data);
          setActiveId(res.data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  const onLibEditFinish = (values) => {
    console.log("提交内容", values);
    

    
    
    
    
    
    
    
    
    
    
    
    
    
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
  const showSuccess = () => {
    setIsShowSuccess(true);
    setTimeout(() => {
      cancelSuccess();
    }, 5000);
  };

  const okSuccess = () => {
    cancelSuccess();
  };

  const cancelSuccess = () => {
    setIsShowSuccess(false);
  };
  return (
    <div className="createdeck">
      <HeaderPersonal props={props} />
      {/* <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/mylibrary", title: t("upload and download") },
          { to: "", title: t("Upload Deck") },
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
              <div className="min_box"></div> {t("Upload Deck")}
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
                        <span>{t("Deck cover")} </span>
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
                          {/* <Button className="deck-add-button">
                          {logoSpin ? <Spin size="small" /> : "+" + t("Add")}
                        </Button> */}
                          <Button className="deck-add-button">
                            + {t("Add")}
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
                  {/* <Form.Item
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
                </Form.Item> */}
                  <Form.Item
                    name="category"
                    label={t("Category")}
                    className="category"
                    defaultValue={activeId}
                    rules={[
                      {
                        required: true,
                        message: t("Please select Category"),
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      mode="multiple"
                      style={{ backgroundColor: "#383737" }}
                      className="category-select"
                      placeholder={t("Please select Category")}
                      optionFilterProp="children"
                    >
                      {categoryList.map((item, i) => {
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
                            + {t("add deck")}
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
      {/* 成功弹窗 */}
      <Modal
        centered={true}
        closable={false}
        footer={null}
        visible={isShowSuccess}
        onOk={okSuccess}
        onCancel={cancelSuccess}
        className="success_modal"
      >
        {/* <img src={success_img} alt="" /> */}
        <div className="successful_text">{t("The upload is successful")}</div>
        <div className="success_modal_btn" onClick={cancelSuccess}>
          {t("OK (return after 5S)")}
        </div>
        {/* <div className="modal_bg"></div> */}
      </Modal>
    </div>
  );
};
export default CreateDeck;
