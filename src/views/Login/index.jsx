import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  message,
  Spin,
  Modal,
} from "antd";
import HeaderLogo from "../../components/HeaderLogo";
import {
  getVerCode,
  getSendEms,
  getRegister,
  getLogin,
  getResetpwd,
} from "../../requests";
import { Auth } from "../../requests/auth";
import Base64 from "base-64";
import { LISHANUSER } from "../../utils/storage";

import leftboximg from "../../assets/img/header/left_boximg.png";

import "./login.less";
const Login = (props) => {
  const { t } = useTranslation();
  const screenWidth = document.body.clientWidth;
  const [formLogin] = Form.useForm();
  
  const [typeAc, setTypeAc] = useState(1);
  
  const [isInviCode, setIsInviCode] = useState(false);
  
  const [email, setEmail] = useState("");
  
  const [forgetEmail, setForgetEmail] = useState("");
  
  const [isShowCountDown, setIsShowCountDown] = useState(false);
  
  const [countDown, setCountDown] = useState(0);
  
  const [regLoading, setRegLoading] = useState(false);
  
  const [regSendLoading, setRegSendLoading] = useState(false);
  
  const [logLoading, setLogLoading] = useState(false);
  
  const [fgLoading, setFgLoading] = useState(false);
  
  const [fgSendLoading, setFgSendLoading] = useState(false);
  
  const [integralModal, setIntegralModal] = useState(false);
  
  const [integralNum, setIntegralNum] = useState(0);
  
  const [isRemember, setIsRemember] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem(LISHANUSER);
    if (userInfo) {
      const decrypt = JSON.parse(Base64.decode(userInfo));
      if (decrypt.remember) {
        setIsRemember(true);
      } else {
        setIsRemember(false);
      }
      formLogin.setFieldsValue({
        ...decrypt,
      });
    }
  }, [typeAc]);
  const handleCancelIntegral = () => {
    setIntegralModal(false);
    setTypeAc(1);
  };
  const onFinish = (values) => {
    const type = emailReg(values.email);
    if (!type) {
      return message.error(t("please_enter_your_vaild_email"));
    }
    if (values.password.length < 8) {
      return message.error(t("The_password"));
    }
    setLogLoading(true);
    getLogin({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        console.log("res", res);
        if (res.code === 1) {
          setLogLoading(false);
          
          
          
          
          
          
          message.success(t("login_successful"));
          Auth.token = res.data.userinfo.token;
          if (isRemember) {
            values.remember = isRemember;
            const val = JSON.stringify(values);
            const base = Base64.encode(val);
            localStorage.setItem(LISHANUSER, base);
          } else {
            localStorage.removeItem(LISHANUSER);
          }
          props.history.push("/");
        } else {
          message.error(res.msg);
          setLogLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishRegister = (values) => {
    const type = emailReg(values.email);
    if (!type) {
      return message.error(t("please_enter_your_vaild_email"));
    }
    if (values.password.length < 8) {
      return message.error(t("The_password"));
    }
    if (values.password !== values.passwordReg) {
      return message.error(t("The_two_passwords"));
    }
    setRegLoading(true);
    getRegister(values)
      .then((res) => {
        setRegLoading(false);
        if (res.code === 1) {
          message.success(t("registration success"));
          
          
          setTypeAc(1);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishForget = (values) => {
    const type = emailReg(values.email);
    if (!type) {
      return message.error(t("please_enter_your_vaild_email"));
    }
    setFgLoading(true);
    getResetpwd(values)
      .then((res) => {
        setFgLoading(false);
        if (res.code === 1) {
          setTypeAc(1);
          message.success(t("Password_reset_succeeded"));
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onValuesChangeReg = (values) => {
    for (const key in values) {
      if (key === "email") {
        setEmail(values[key]);
      }
      if (key === "invcode") {
        if (values[key].length === 6) {
          getInviCode(values[key]);
        }
      }
    }
  };

  useEffect(() => {
    if (countDown < 0) {
      return setIsShowCountDown(false);
    }
    setTimeout(() => {
      let t = countDown - 1;
      setCountDown(t);
    }, 1000);
  }, [countDown]);
  
  const getSend = (event) => {
    let em = "";
    if (typeAc === 2) {
      em = email;
    } else if (typeAc === 3) {
      em = forgetEmail;
    }
    const type = emailReg(em);
    if (!type) {
      return message.error(t("please_enter_your_vaild_email"));
    }
    setRegSendLoading(true);
    setFgSendLoading(true);
    getSendEms({
      email: em,
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
  
  const emailReg = (val) => {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(val);
  };

  
  const getInviCode = (val) => {
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  };

  const goSignUp = () => {
    setTypeAc(2);
  };
  const goLogIn = () => {
    setTypeAc(1);
  };
  const goForgot = () => {
    setTypeAc(3);
  };

  const onValuesChangeForget = (values) => {
    for (const key in values) {
      if (key === "email") {
        setForgetEmail(values[key]);
      }
    }
  };

  const radioClick = () => {
    setIsRemember(!isRemember);
  };
  return (
    <div className="consumer">
      <HeaderLogo props={props} />
      {/* 登录 */}
      <div
        className="login"
        style={{
          display: typeAc === 1 ? "block" : "none",
        }}
      >
        <div className="title">
          {t("Sign_in_to")} <span className="dao">ParaDao</span>
        </div>
        <div className="login_bg_two"></div>
        <div className="login_con">
          <Form
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            autoComplete="off"
            className="form"
            form={formLogin}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t("Please_input_your_Email"),
                },
              ]}
            >
              <Input placeholder={t("Email")} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("Please_input_your_Password"),
                },
              ]}
            >
              <Input.Password placeholder={t("Passsword")} />
            </Form.Item>
            <Form.Item className="submit_btn">
              <button className="btn" type="submit">
                {logLoading ? <Spin size="small" /> : t("Sign_in")}
              </button>
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="checked_kuang"
            >
              <div className="checked" onClick={radioClick}>
                <div className="checked_ra">
                  <div className={isRemember ? "radio radio_active" : "radio"}>
                    <div className="neiquan"></div>
                  </div>
                  {t("Remember me")}
                </div>

                <div className="forgot">
                  <span onClick={goForgot}> {t("Forgot_your_Password")} </span>
                </div>
              </div>
            </Form.Item>
          </Form>

          {/* <Divider className="line" /> */}
          <div className="coinList_account">
            <span> {t("Dont_have_a_CoinList_account")} </span>
            <span className="sign_up" onClick={goSignUp}>
              {t("Sign_up")}
            </span>
          </div>
        </div>
      </div>
      {/* 注册 */}
      <div
        className="register"
        style={{
          display: typeAc === 2 ? "flex" : "none",
        }}
      >
        <div className="con">
          <div className="title"> {t("create_a_accunt")} </div>
          <Form
            onFinish={onFinishRegister}
            onValuesChange={onValuesChangeReg}
            autoComplete="off"
            className="form"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t("Please_input_your_Email"),
                },
              ]}
            >
              <Input placeholder={t("Your_Email_address")} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("Please_input_your_Password"),
                  min: 8,
                },
              ]}
            >
              <Input
                type="password"
                maxLength={20}
                placeholder={t("Password_Character_Mininum")}
              />
            </Form.Item>
            <Form.Item
              name="passwordReg"
              rules={[
                {
                  required: true,
                  message: t("Please_re_enter_your_password"),
                  min: 8,
                },
              ]}
            >
              <Input
                maxLength={20}
                placeholder={t("Repeat_Password")}
                type="password"
              />
            </Form.Item>
            <div className="code">
              <Form.Item
                name="emailcode"
                className="verification"
                rules={[
                  {
                    required: true,
                    message: t("Please_enter_email_verification_code"),
                  },
                ]}
              >
                <Input
                  placeholder={t("Email_verification_code")}
                  maxLength={6}
                />
              </Form.Item>
              <div
                className={
                  isShowCountDown ? "send_code send_code_not" : "send_code"
                }
                onClick={isShowCountDown ? null : () => getSend("register")}
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
            {/* <div className="invitation">
              <Form.Item
                className="invcode"
                name="invcode"
                rules={[
                  {
                    required: true,
                    message: t("Please_re_invite_code"),
                  },
                ]}
              >
                <Input placeholder={t("Single_Line_Input")} maxLength={6} />
              </Form.Item>
              <div className="invitation_code">
                {isInviCode ? t("invitation_Code_Is_Required") : ""}
              </div>
            </div> */}
            <Form.Item className="submit_btn">
              <button className="btn" type="submit">
                {regLoading ? <Spin size="small" /> : t("Sign_up")}
              </button>
            </Form.Item>
          </Form>
          <div className="already_have">
            <span> {t("Already_have_an_account")} </span>
            <span className="log_in" onClick={goLogIn}>
              {t("Sign_in")}
            </span>
          </div>
        </div>
        {screenWidth > 750 ? (
          <div className="lsc-title">
            <div className="color_box">
              <div className="color_box_one"></div>
              <div className="color_box_two"></div>
              <div className="color_box_therr"></div>
              <div className="color_box_four"></div>
              <img src={leftboximg} alt="" className="color_box_img" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* 忘记密码 */}
      <div
        className="forget"
        style={{
          display: typeAc === 3 ? "flex" : "none",
        }}
      >
        <div className="con">
          <div className="title"> {t("forget_your_password")} </div>
          <div className="forget_con_two"></div>
          <div className="forget_con">
            <Form
              onFinish={onFinishForget}
              onValuesChange={onValuesChangeForget}
              autoComplete="off"
              className="form"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: t("Please_input_your_Email"),
                  },
                ]}
              >
                <Input placeholder={t("Your_Email_address")} />
              </Form.Item>
              <div className="code">
                <Form.Item
                  name="captcha"
                  className="verification"
                  rules={[
                    {
                      required: true,
                      message: t("Please_enter_email_verification_code"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("Email_verification_code")}
                    maxLength={6}
                  />
                </Form.Item>
                <div
                  className={
                    isShowCountDown ? "send_code send_code_not" : "send_code"
                  }
                  onClick={isShowCountDown ? null : () => getSend("resetpwd")}
                >
                  {isShowCountDown ? (
                    countDown
                  ) : fgSendLoading ? (
                    <Spin size="small" />
                  ) : (
                    t("Send")
                  )}
                </div>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("Please_input_your_Password"),
                    min: 8,
                  },
                ]}
              >
                <Input
                  type="password"
                  maxLength={20}
                  placeholder={t("New_Password_Character_Mininum")}
                />
              </Form.Item>
              <Form.Item
                name="password_confirm"
                rules={[
                  {
                    required: true,
                    message: t("Please_re_enter_your_password"),
                    min: 8,
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  placeholder={t("Repeat_Password")}
                  type="password"
                />
              </Form.Item>
              <Form.Item className="submit_btn">
                <button className="btn" type="submit">
                  {fgLoading ? <Spin size="small" /> : t("Reset")}
                </button>
              </Form.Item>
            </Form>
            <div className="forget_go_login">
              <span>{t("Go_to")}&nbsp;</span>
              <span className="login_in" onClick={goLogIn}>
                {t("Sign_in")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 积分弹窗 */}
      {/* <Modal
        centered={true}
        closable={false}
        footer={null}
        className="modal-two-button integral"
        visible={integralModal}
        onCancel={handleCancelIntegral}
      >
        <p>{t("create_success", { value: integralNum })}</p>
        <p className="use-int">{t("Use inteegration")}</p>
        <div className="confirm" onClick={handleCancelIntegral}>
          {t("Confirm")}
        </div>
      </Modal> */}
    </div>
  );
};
export default Login;
