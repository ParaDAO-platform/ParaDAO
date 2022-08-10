import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Form,
  Input,
  Col,
  Row,
  Button,
  Upload,
  Modal,
  Select,
  message,
} from "antd";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import BreadcrumbBar from "../../components/BreadcrumbBar";
import PersonalCenter from "../../components/PersonalCenter";
import { BASE_URL } from "../../requests/api";
import { kycAdd } from "../../requests";

import idExample from "../../assets/img/user/id-example.png";
import successbtnimg from "../../assets/img/user/successbtnimg.png";
import hook from "../../assets/img/user/hook.png";

import "./kyc.less";
const Kyc = (props) => {
  const { t } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();

  
  const [infoPhoto, setInfoPhoto] = useState(idExample);

  
  const [isKYCSubmitVisible, setIsKYCSubmitVisible] = useState(false);

  const screenWidth = document.body.clientWidth;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    screenWidth <= 750 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  useEffect(() => {
    if (infoPhoto === idExample) {
      form.setFieldsValue({ hold_photo: "" });
    } else {
      form.setFieldsValue({ hold_photo: infoPhoto });
    }
  }, [infoPhoto]);
  /*********************form submit start************************/
  
  const cancelSubmitVisible = () => {
    setIsKYCSubmitVisible(false);
  };
  
  const confirmSubmitVisible = () => {
    props.history.push("/");
  };
  const onKYCSubmitFinish = (values) => {
    console.log("Success:", values);

    kycAdd(values)
      .then((result) => {
        console.log(result);
        setIsKYCSubmitVisible(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onKYCSubmitFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [loading, setLoading] = useState(false);

  
  const onPhotoChange = (info) => {
    console.log(1212, info);
    
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log(info);
      if (info.file.response.code !== 1) {
        message.error(info.file.response.msg);
        return;
      }
      setInfoPhoto(info.file.response.data);
    } else if (info.file.status === "error") {
    }
  };

  /*********************form submit end************************/
  return (
    <div className="kyc">
      <HeaderPersonal props={props} />
      {/* <BreadcrumbBar
        props={props}
        data={[
          { to: "/", title: t("Home") },
          { to: "/myinfo", title: t("my information") },
          { to: "", title: "KYC" },
        ]}
        style={{ maxWidth: "19.2rem", padding: " 0 1.5rem" }}
      /> */}
      <div className="kyc-page">
        <div className="kyc-page-left">
          <PersonalCenter props={props} />
        </div>
        <div className="kyc-page-right">
          <div className="kyc-page-right-top">
            <span>{t("my information")}</span>
            <span className="icon">&gt;</span>
            <span>KYC</span>
          </div>
          {/* KYC表单 */}
          <div className="kyc-submit-form">
            <Form
              className="kyc-form"
              onFinish={onKYCSubmitFinish}
              onFinishFailed={onKYCSubmitFinishFailed}
              autoComplete="off"
              layout={isMobile ? "" : "vertical"}
              form={form}
            >
              <Row className="kyc-title-row">
                {/* 页面指引 */}
                <div className="kyc-title">
                  <div className="title-left">
                    {/* <span className="kyc-name">
                      <div className="min_box"></div> KYC
                    </span> */}
                    <span className="kyc-tips">{t("kyc-tips")}</span>
                  </div>
                  {/* <Button className="kyc-submit-button" htmlType="submit">
                  Submit
                </Button> */}
                </div>
              </Row>
              {isMobile ? (
                <>
                  {/* <Row> */}
                  <Col>
                    <Form.Item
                      label={t("Firstname")}
                      name="first_name"
                      rules={[
                        {
                          required: true,
                          max: 20,
                          message: t("Firstname message"),
                        },
                      ]}
                    >
                      <Input maxLength={20} className="kyc-form-input" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label={t("Lastname")}
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          max: 20,
                          message: t("Lastname message"),
                        },
                      ]}
                    >
                      <Input maxLength={20} className="kyc-form-input" />
                    </Form.Item>
                  </Col>
                  {/* </Row> */}
                  {/* <Row> */}
                  <Col>
                    <Form.Item
                      label={t("Company name")}
                      name="company_name"
                      rules={[
                        {
                          required: true,
                          max: 20,
                          message: t("Company name message"),
                        },
                      ]}
                    >
                      <Input maxLength={20} className="kyc-form-input" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label={t("industry/sector*")}
                      name="industry_sector"
                      rules={[
                        {
                          required: true,
                          max: 20,
                          message: t("industry/sector* message"),
                        },
                      ]}
                    >
                      <Input maxLength={20} className="kyc-form-input" />
                    </Form.Item>
                  </Col>
                  {/* </Row> */}
                  {/* <Row> */}
                  <Col>
                    <Form.Item
                      label={t("CompanyURL")}
                      name="company_url"
                      rules={[
                        {
                          required: true,
                          message: t("CompanyURL message"),
                        },
                      ]}
                    >
                      <Input className="kyc-form-input" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label={t("Your Linked URL")}
                      name="linkedin_url"
                      rules={[
                        {
                          required: true,
                          message: t("Your Linked URL message"),
                        },
                      ]}
                    >
                      <Input className="kyc-form-input" />
                    </Form.Item>
                  </Col>
                  {/* </Row> */}
                  {/* <Row> */}
                  <Col>
                    <Form.Item
                      label={t("Type Of Certificate")}
                      name="certificate"
                      rules={[
                        {
                          required: true,
                          message: t("Type Of Certificate message"),
                        },
                      ]}
                    >
                      <Select
                        style={{ backgroundColor: "#383737" }}
                        className="category-select"
                      >
                        <Option className="category-select-option" value="1">
                          ID Card
                        </Option>
                        <Option value="2">Passport</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label={"ID Number"}
                      name="idnumber"
                      rules={[
                        {
                          required: true,
                          max: 18,
                          message: t("ID Number message"),
                        },
                      ]}
                    >
                      <Input maxLength={18} className="kyc-form-input" />
                    </Form.Item>
                  </Col>
                  {/* </Row> */}
                </>
              ) : (
                <>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={t("Firstname")}
                        name="first_name"
                        rules={[
                          {
                            required: true,
                            max: 20,
                            message: t("Firstname message"),
                          },
                        ]}
                      >
                        <Input maxLength={20} className="kyc-form-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={t("Lastname")}
                        name="last_name"
                        rules={[
                          {
                            required: true,
                            max: 20,
                            message: t("Lastname message"),
                          },
                        ]}
                      >
                        <Input maxLength={20} className="kyc-form-input" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={t("Company name")}
                        name="company_name"
                        rules={[
                          {
                            required: true,
                            max: 20,
                            message: t("Company name message"),
                          },
                        ]}
                      >
                        <Input maxLength={20} className="kyc-form-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={t("industry/sector*")}
                        name="industry_sector"
                        rules={[
                          {
                            required: true,
                            max: 20,
                            message: t("industry/sector* message"),
                          },
                        ]}
                      >
                        <Input maxLength={20} className="kyc-form-input" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={t("CompanyURL")}
                        name="company_url"
                        rules={[
                          {
                            required: true,
                            message: t("CompanyURL message"),
                          },
                        ]}
                      >
                        <Input className="kyc-form-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={t("Your Linked URL")}
                        name="linkedin_url"
                        rules={[
                          {
                            required: true,
                            message: t("Your Linked URL message"),
                          },
                        ]}
                      >
                        <Input className="kyc-form-input" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={t("Type Of Certificate")}
                        name="certificate"
                        rules={[
                          {
                            required: true,
                            message: t("Type Of Certificate message"),
                          },
                        ]}
                      >
                        {/* <Input className="kyc-form-input" /> */}
                        <Select
                          style={{ backgroundColor: "#383737" }}
                          className="category-select"
                        >
                          <Option className="category-select-option" value="1">
                            ID Card
                          </Option>
                          <Option value="2">Passport</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={t("ID Number")}
                        name="idnumber"
                        rules={[
                          {
                            required: true,
                            max: 18,
                            message: t("ID Number message"),
                          },
                        ]}
                      >
                        <Input maxLength={18} className="kyc-form-input" />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              <div className="upload-row">
                <Row>
                  <Col span={8} className="upload-row-photo">
                    <Form.Item
                      label={t("hold ID photo(size<2M)")}
                      name="hold_photo"
                      rules={[
                        {
                          required: true,
                          message: t("hold ID photo(size<2M) message"),
                        },
                      ]}
                    >
                      <div className="upload-pic-show">
                        <Input style={{ display: "none" }} />
                        {infoPhoto === idExample ? (
                          <img
                            alt="photo"
                            style={{ opacity: 0.3 }}
                            src={infoPhoto}
                          ></img>
                        ) : (
                          <img alt="photo" src={infoPhoto}></img>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={16} className="upload-col-box">
                    <Form.Item
                      name="hold_photo"
                      
                      
                      
                      
                      
                      
                    >
                      <div className="photo-upload-box">
                        <Upload
                          name="file"
                          showUploadList={false}
                          action={BASE_URL + "api/user/upload_file"}
                          
                          onChange={(info) => onPhotoChange(info)}
                          data={{ filetype: "image" }}
                          headers={{
                            token: localStorage.getItem("TOKEY"),
                          }}
                        >
                          <Button className="kyc-upload-button">
                            {t("Upload")}
                          </Button>
                        </Upload>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <div className="kyc_xian"></div>
              <div className="kyc-submit-box">
                <Button className="kyc-submit-button" htmlType="submit">
                  {t("Submit")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer props={props} />

      <Modal
        centered={true}
        closable={false}
        footer={null}
        className="modal-two-button kyc-submit"
        visible={isKYCSubmitVisible}
        onCancel={cancelSubmitVisible}
      >
        <p className="succeed-title">{t("Submit success")}</p>

        <div className="succeed-pic">
          <img alt="" src={hook} />
        </div>
        <p className="upload_successful_text">
          {t(
            "we will review within 48 hours, the result will be sent to your email"
          )}
        </p>
        <div className="btn" onClick={confirmSubmitVisible}>
          {t("Confirm")}
        </div>
        <div className="bg_img"></div>
      </Modal>
    </div>
  );
};

export default Kyc;
