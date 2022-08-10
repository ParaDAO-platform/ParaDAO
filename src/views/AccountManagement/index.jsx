import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeaderPersonal from "../../components/HeaderPersonal";
import MemberCenter from "../../components/MemberCenter";
import Footer from "../../components/Footer";
import { message, Modal, Input } from "antd";
import add from "../../assets/img/account/add.png";
import del from "../../assets/img/account/del.png";
import bg2 from "../../assets/img/account/bg2.png";
import {
  getSubaccountList,
  addSubaccount,
  editSubaccount,
  setSubaccountLocked,
} from "../../requests";
import "./accountmanagement.less";

const AccountManagement = (props) => {
  const { t } = useTranslation();

  
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [isDelModalVisible, setIsDelModalVisible] = useState(false);
  const [type, setType] = useState("add");
  const [accountList, setAccountList] = useState([]);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [editId, seteditId] = useState(0);
  const [status, setstatus] = useState("");
  useEffect(() => {
    
    getSubaccountListFn();
  }, []);
  const getSubaccountListFn = () => {
    getSubaccountList().then((res) => {
      if (res.data) setAccountList(res.data);
    });
  };
  const handleOk = () => {
    if (!email) {
      return message.error(t("Please_input_your_Email"));
    }
    if (!emailReg(email)) {
      return message.error(t("please_enter_your_vaild_email"));
    }
    if (!password) {
      return message.error(t("Please_input_your_Password"));
    }
    if (password !== password2) {
      return message.error(t("Passwords are inconsistent"));
    }
    if (type === "edit") {
      editSubaccount({ id: editId, password }).then((res) => {
        if (res.code === 1) {
          setIsModalVisible(false);
          setemail("");
          setpassword("");
          setpassword2("");
          seteditId(0);
          getSubaccountListFn();
          message.success(t("Modified successfully"));
        } else {
          return message.error(res.msg);
        }
      });
    } else {
      addSubaccount({ email, password }).then((res) => {
        if (res.code === 1) {
          setIsModalVisible(false);
          setemail("");
          setpassword("");
          setpassword2("");
          getSubaccountListFn();
          message.success(t("Submitted successfully"));
        } else {
          return message.error(res.msg);
        }
      });
    }

    
  };
  const handleCancel = () => {
    setemail("");
    setpassword("");
    setpassword2("");
    setIsModalVisible(false);
  };
  const addAccount = () => {
    setType("add");
    setIsModalVisible(true);
  };
  const editAccount = (item) => {
    setemail(item.email);
    seteditId(item.id);
    setType("edit");
    setIsModalVisible(true);
  };
  const handleDelCancel = () => {
    setIsDelModalVisible(false);
  };
  const handleDelOk = () => {
    setSubaccountLocked({ id: editId }).then((res) => {
      if (res.code === 1) {
        setIsDelModalVisible(false);
        seteditId(0);
        getSubaccountListFn();
        message.success(t("Submitted successfully"));
      } else {
        return message.error(res.msg);
      }
    });
  };
  const delAccount = (item) => {
    seteditId(item.id);
    setstatus(item.status);
    setIsDelModalVisible(true);
  };
  const emailReg = (val) => {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(val);
  };
  const setEmailFn = ({ target: { value } }) => {
    setemail(value);
  };
  const setPasswordFn = ({ target: { value } }) => {
    setpassword(value);
  };
  const setPasswordAlginFn = ({ target: { value } }) => {
    setpassword2(value);
  };
  return (
    <div className="account_management">
      <HeaderPersonal props={props} />
      <div className="my_info_con">
        <div className="info-title">
          <div className="setting">
            <MemberCenter props={props} />
          </div>
          <div className="info_body">
            <div className="account_list">
              {accountList.map((item) => {
                return (
                  <div className="item" key={item.id}>
                    <div className="username">
                      {t("account")}:{item.email}
                    </div>
                    <div className="pwd">{t("password")}:******</div>
                    <div className="btn_box">
                      <div className="btn" onClick={() => editAccount(item)}>
                        {t("Edit")}
                      </div>
                      <div className="btn" onClick={() => delAccount(item)}>
                        {item.status === "locked" ? t("Enable") : t("unEnable")}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="item add_box" onClick={addAccount}>
                <img src={add} alt="" />
                <div>{t("Adding a subaccount")}</div>
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
          width="4.5rem"
          footer={null}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal_box">
            <div className="modal_content">
              <div className="title">
                {type === "add" ? t("New sub-account") : t("Eidt sub-account")}
              </div>
              <div className="username">
                <div>{t("Email")}：</div>
                <Input
                  placeholder={t("Please_input_your_Email")}
                  disabled={type === "edit"}
                  value={email}
                  onChange={setEmailFn}
                />
              </div>
              <div className="password">
                <div>{t("password")}：</div>
                <Input
                  placeholder={t("password")}
                  value={password}
                  onChange={setPasswordFn}
                />
              </div>
              <div className="confirm_password">
                <div>{t("Confirm password")}：</div>
                <Input
                  placeholder={t("Confirm password")}
                  value={password2}
                  onChange={setPasswordAlginFn}
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
        {/* 删除确定 */}
        <Modal
          visible={isDelModalVisible}
          closable={false}
          centered={true}
          
          className="acount_modal"
          width="4.5rem"
          footer={null}
          onOk={handleDelOk}
          onCancel={handleDelCancel}
        >
          <div className="modal_box del_confirm">
            <div className="modal_content">
              <div className="title">
                {status === "locked" ? t("Enable") : t("unEnable")}
              </div>
              <div className="desc">
                {status === "locked"
                  ? t("Confirm Enable")
                  : t("Confirm unEnable")}
              </div>
              <div className="btn_box">
                <div className="btn" onClick={handleDelCancel}>
                  {t("Cancel")}
                </div>
                <div className="btn" onClick={handleDelOk}>
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
export default AccountManagement;
