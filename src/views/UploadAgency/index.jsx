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
  Space,
  Modal,
} from "antd";
import { BASE_URL } from "../../requests/api";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import defaultavatartherr from "../../assets/img/defaultavatartherr.png";
import success_img from "../../assets/img/mylibrary/success_img.png";
import { getUploadsMechanism } from "../../requests";

import "./uploadagency.less";
const { TextArea } = Input;
const UploadAgency = (props) => {
  const { t } = useTranslation();
  const { type } = props.match.params;
  const [form] = Form.useForm();
  const { Option } = Select;
  
  const [logo, setLogo] = useState("");
  
  const [logoSpin, setLogoSpin] = useState(false);
  const [pdfSpin, setPdfSpin] = useState(false);
  
  const [isShowSuccess, setIsShowSuccess] = useState(false);

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center", color: "#fff" }}>
      <InboxOutlined style={{ fontSize: 80 }} />
      <p>{t("no data")}</p>
    </div>
  );

  useEffect(() => {}, []);
  useEffect(() => {
    form.setFieldsValue({ logo: logo });
  }, [logo]);
  const onLibEditFinish = (values) => {
    console.log("values", values);
    values.other = JSON.stringify(values.other);
    getUploadsMechanism({
      ...values,
      type: 2,
      fa: type === "fasystem" ? 1 : 0,
    }).then((res) => {
      if (res.code === 1) {
        props.history.goBack();
        showSuccess();
      } else {
        message.error(res.msg);
      }
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
      const size = file.size / 1024 / 1024;
      if (size > 50) {
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
    <div className="uploadagency">
      <HeaderPersonal props={props} />
      {/* <BreadcrumbBar
        props={props}
        data={[
          { to: "/personalcenter/mylibrary", title: t("upload and download") },
          { to: "", title: t("uploading agency") },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.4rem" }}
      /> */}
      <div className="lib-edit">
        <div className="lib-edit-left">
          <PersonalCenter props={props} />
        </div>
        <div className="lib-edit-right">
          <div className="lib-edit-right-top">
            <span>{t("upload and download")}</span>
            <span className="icon">&gt;</span>
            <span>{t("uploading agency")}</span>
          </div>
          <div className="edit-box">
            {/* <div className="edit-tags">
              <div className="min_box"></div> {t("uploading agency")}
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
                    label={t("institution name")}
                    name="investor"
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
                    label={t("Agency presentation")}
                    name="description"
                    className="agency_presentation"
                    rules={[
                      {
                        required: true,
                        max: 500,
                        message: t("Introduction-message"),
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      maxLength={500}
                      style={{ height: "auto" }}
                    />
                  </Form.Item>
                  <div className="agency_xian"></div>
                  <Form.Item
                    label={t("Institution official website")}
                    name="website"
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
                    label={t("Institutional Twitter")}
                    name="twitter"
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
                  <Form.List name="other" className="add_list">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    "Please fill in the type name you want to add"
                                  ),
                                },
                              ]}
                              className="item_key"
                            >
                              <Input placeholder={t("type name")} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    "Please fill in the type value you want to add"
                                  ),
                                },
                              ]}
                              className="item_val"
                            >
                              <Input placeholder={t("type value")} />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              className="item_remove"
                            />
                          </Space>
                        ))}
                        <Form.Item className="add_list_box">
                          <div className="add_list_btn" onClick={() => add()}>
                            + {t("other information")}
                          </div>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

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
export default UploadAgency;
