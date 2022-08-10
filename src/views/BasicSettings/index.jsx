import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import Footer from "../../components/Footer";
import { message, Modal, Input, Spin } from "antd";
import { editPwd, getSendEms, editPayPassword } from "../../requests";
import add from "../../assets/img/account/add.png";
import del from "../../assets/img/account/del.png";
import bg2 from "../../assets/img/account/bg2.png";
import "./basicsettings.less";
import PersonalCenter from "../../components/PersonalCenter";
const BasicSettings = (props) => {
  const { t } = useTranslation();

  
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [oldPwd, setoldPwd] = useState("");
  
  const [pwd, setpwd] = useState("");
  
  const [emailCode, setEmailCode] = useState("");
  
  const [pwd2, setpwd2] = useState("");
  
  const [isShowCountDown, setIsShowCountDown] = useState(false);
  
  const [countDown, setCountDown] = useState(0);
  
  const [regSendLoading, setRegSendLoading] = useState(false);
  
  const [fgSendLoading, setFgSendLoading] = useState(false);
  
  const [type, setType] = useState(0);
  useEffect(() => {
    if (countDown < 0) {
      return setIsShowCountDown(false);
    }
    setTimeout(() => {
      let t = countDown - 1;
      setCountDown(t);
    }, 1000);
  }, [countDown]);
  const handleOk = () => {
    if (!oldPwd && type === 1) {
      return message.error(t("enter your old password"));
    }
    if (!emailCode && type === 2) {
      return message.error(t("Please_enter_email_verification_code"));
    }
    if (!pwd) {
      return message.error(t("enter your new password"));
    }
    if (!pwd2) {
      return message.error(t("enter your new password aglin"));
    }
    if (pwd !== pwd2) {
      return message.error(
        t("new password is inconsistent with the second password")
      );
    }
    if (type === 1) {
      editPwd({ password: oldPwd, newpassword: pwd }).then((res) => {
        if (res.code === 1) {
          setoldPwd("");
          setpwd("");
          setpwd2("");
          message.success(t("Modified successfully"));
          setIsModalVisible(false);
        } else {
          message.error(res.msg);
        }
      });
    }
    if (type === 2) {
      editPayPassword({ emailcode: emailCode, paypassword: pwd }).then(
        (res) => {
          if (res.code === 1) {
            setEmailCode("");
            setpwd("");
            setpwd2("");
            message.success(t("Modified successfully"));
            setIsModalVisible(false);
          } else {
            message.error(res.msg);
          }
        }
      );
    }

    
  };

  const handleCancel = () => {
    setoldPwd("");
    setpwd("");
    setpwd2("");
    setIsModalVisible(false);
  };
  const showModal = (type) => {
    setType(type);
    setIsModalVisible(true);
  };
  const setoldPwdFn = ({ target: { value } }) => {
    setoldPwd(value);
  };
  const seteEailCodeFn = ({ target: { value } }) => {
    setEmailCode(value);
  };
  const setpwdFn = ({ target: { value } }) => {
    setpwd(value);
  };
  const setpwd2Fn = ({ target: { value } }) => {
    setpwd2(value);
  };
  const getSend = (event) => {
    setRegSendLoading(true);
    setFgSendLoading(true);
    getSendEms({
      email: JSON.parse(localStorage.getItem("userInfo")).email,
      event: event,
    })
      .then((res) => {
        setRegSendLoading(false);
        setFgSendLoading(false);
        if (res.code === 1) {
          setIsShowCountDown(true);
          setCountDown(120);
          message.success(t("Sending_verification_code_succeeded"));
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="basic_setting">
      <HeaderPersonal props={props} />
      <div className="my_info_con">
        <div className="info-title">
          <PersonalCenter props={props} />
        </div>
        <div className="info_body">
          <div className="item">
            <div className="title">
              <div className="mini_box"></div>
              {t("login password")}
            </div>
            <div className="details_box">
              <div>******</div>
              <div className="btn" onClick={() => showModal(1)}>
                {t("Edit")}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <div className="mini_box"></div>
              {t("Pay the password")}
            </div>
            <div className="details_box">
              <div>******</div>
              <div className="btn" onClick={() => showModal(2)}>
                {t("Edit")}
              </div>
            </div>
          </div>
        </div>
        <div className="line-back"></div>
        {/* 新增、修改账户 */}
        <Modal
          visible={isModalVisible}
          closable={false}
          
          centered={true}
          className="acount_modal"
          footer={null}
          width="4.5rem"
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal_box">
            {/* <img className="bg" src={bg2} alt="" /> */}
            <div className="modal_content">
              <div className="title">
                {type === 1
                  ? t("Modify login password")
                  : t("Change payment password")}
              </div>
              <div
                className="username"
                style={{ display: type === 1 ? "flex" : "none" }}
              >
                <div>{t("pwd old")}：</div>
                <Input
                  type={"password"}
                  placeholder={t("pwd old")}
                  value={oldPwd}
                  onChange={setoldPwdFn}
                />
              </div>
              <div
                className="code_box"
                style={{ display: type === 2 ? "flex" : "none" }}
              >
                <div className="label">{t("Email_verification_code")}：</div>
                <div className="flex">
                  <Input
                    placeholder={t("Email_verification_code")}
                    value={emailCode}
                    autoComplete="off"
                    onChange={seteEailCodeFn}
                  />
                  <div
                    className={
                      isShowCountDown ? "send_code send_code_not" : "send_code"
                    }
                    onClick={isShowCountDown ? null : () => getSend("paypwd")}
                  >
                    {isShowCountDown ? (
                      countDown
                    ) : regSendLoading ? (
                      <Spin size="small" />
                    ) : (
                      t("Send")
                    )}
                  </div>
                </div>
              </div>
              <div className="password">
                <div>{t("pwd new")}：</div>
                <Input
                  type={"password"}
                  placeholder={t("pwd new")}
                  value={pwd}
                  autoComplete="new-password"
                  onChange={setpwdFn}
                />
              </div>
              <div className="confirm_password">
                <div>{t("Confirm password")}：</div>
                <Input
                  type={"password"}
                  placeholder={t("Confirm password")}
                  value={pwd2}
                  onChange={setpwd2Fn}
                />
              </div>
              <div className="btn_box">
                <div className="btn" onClick={handleCancel}>
                  {t("Cancel")}
                </div>
                <div className="btn" onClick={handleOk}>
                  {t("Confirm")}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <Footer props={props} />
    </div>
  );
};
export default BasicSettings;
