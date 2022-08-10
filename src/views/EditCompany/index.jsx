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
  getUploadsMechanism,
  getEditMechanism,
  getSeeMechanism,
} from "../../requests";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import defaultavatartherr from "../../assets/img/defaultavatartherr.png";
import success_img from "../../assets/img/mylibrary/success_img.png";

import "./editcompany.less";
const EditCompany = (props) => {
  const id = props.match.params.ids;
  const { t } = useTranslation();
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

  useEffect(() => {
    getSeeMechanismData();
  }, []);
  useEffect(() => {
    form.setFieldsValue({ logo: logo });
  }, [logo]);
  const getSeeMechanismData = () => {
    getSeeMechanism({ type: 1, id: id }).then((res) => {
      console.log("获取", res);
      if (res.code === 1 && res.data) {
        let arr = JSON.parse(res.data.other);
        res.data.other = arr;
        form.setFieldsValue(res.data);
        setLogo(res.data.logo);
      }
    });
  };
  const onLibEditFinish = (values) => {
    console.log("values", values);
    values.other = JSON.stringify(values.other);
    getEditMechanism({ ...values, type: 1, id: id })
      .then((res) => {
        if (res.code === 1) {
          message.success(t("Submitted successfully"));
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
        
      }
      if (info.file.status === "done") {
        
        if (info.file.response.code === 1) {
          setLogo(info.file.response.data);
        } else {
          
        }
      } else if (info.file.status === "error") {
        
        
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
          { to: "/", title: t("Home") },
          { to: "/mylibrary", title: t("upload and download") },
          { to: "", title: t("upload company") },
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
            <span>{t("upload company")}</span>
          </div>
          <div className="edit-box">
            {/* <div className="edit-tags">
            <div className="min_box"></div> {t("upload company")}
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
                    label={t("Company Name")}
                    name="company"
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
                    label={t("Company Profile")}
                    name="description"
                    className="description"
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
                  <Form.Item
                    label={t("Company official website")}
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
                    label={t("Company Twitter")}
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
export default EditCompany;
