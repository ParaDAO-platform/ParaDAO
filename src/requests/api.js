import { Auth } from "./auth";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;
let isLogIn = false;

export let BASE_URL =
  window.location.host == "paradao.net"
    ? "http://admin.paradao.net/"
    : "http://paradao.admin.xmublockchain.com/";

const lang = localStorage.getItem("lang") || "cn";
let la = "en-us";
if (lang === "en") {
  la = "en-us";
} else if (lang === "cn") {
  la = "zh-cn";
} else if (lang === "ko") {
  la = "ko-so";
}

const queryString = (params) =>
  "?" +
  Object.keys(params)
    .map((i) => `${i}=${encodeURIComponent(params[i])}`)
    .join("&");
const includeUrlList = [
  "api/user/user_info",
  "api/investors/follow",
  "api/investors/investors_details",
  "api/companies/companies_details",
  "api/companies/follow",
  "api/personage/personage_details",
  "api/personage/follow",
  "api/companies/hacker_song_details",
  "api/companies/hacker_song_follow",
  "api/document/show",
  "api/document/follow",
  "api/user/logout",
  "api/user/edit_userinfo",
  "api/user/upload_file",
  "api/user/kyc_add",
  "api/document/my_lists",
  "api/document/upload",
  "api/document/edit",
  "api/document/document_view",
  "api/user/data_track_lists",
  "api/user/add_track",
  "api/user/data_track_total",
  "api/user/my_follow_lists",
  "api/user/my_points_log",
  "api/user/subaccount",
  "api/user/add_subaccount",
  "api/user/notice",
  "api/user/message_list",
  "api/user/professional_cert_lists",
  "api/user/professional_cert_add",
  "api/user/companies_found_search",
  "api/user/my_uploads_mechanism",
  "api/user/uploads_mechanism",
  "api/user/professional_cert_del",
  "api/user/edit_mechanism",
  "api/user/edit_subaccount",
  "api/user/subaccount_locked",
  "api/user/edit_password",
  "api/user/open_member_vip",
  "api/user/my_recharge_log",
  "api/fundraising_rounds/fundraising_rounds_details",
  "api/user/browse_details",
  "api/user/down_pdf_investors",
  "api/user/down_pdf_companies",
  "api/user/down_pdf_deck",
  "api/user/notice_details",
  "api/activity/meeting_lists",
  "api/activity/meeting_details",
  "api/user/my_down",
  "api/user/user_wallet_address",
  "api/user/data_board_lists",
  "api/user/data_board_details",
  "api/user/edit_paypassword",
  "api/faadmin/companies",
  "api/faadmin/project_add",
  "api/faadmin/project_lists",
  "api/faadmin/project_song",
  "api/faadmin/search_song",
  "api/faadmin/song_add",
  "api/faadmin/progress_list",
  "api/faadmin/progress_add",
  "api/faadmin/create_song",
  "api/faadmin/song_status",
  "api/faadmin/project_grant",
  "api/faadmin/create_grant",
  "api/faadmin/grant_status",
  "api/faadmin/project_investors",
  "api/faadmin/investors",
  "api/faadmin/investors_add",
  "api/faadmin/investors_intention_add",
  "api/faadmin/investors_status",
  "api/faadmin/project_community",
  "api/faadmin/create_community",
  "api/faadmin/community_status",
  "api/faadmin/community_edit",
  "api/faadmin/person_list",
  "api/faadmin/overview",
  "api/faadmin/search_project",
  "api/faadmin/histogram",
  "api/faadmin/overview_project",
  "api/faadmin/down_pdf",
  "api/faadmin/create_person",
  "api/faadmin/person_edit",
  "api/faadmin/person_del",
];
const excludeUrlList = [];

const bodyMethod = ["POST", "PUT", "PATCH"];

const request = async (
  partiaUrl,
  query,
  body,
  method = "GET",
  type = "application/json",
  fileType = ""
) => {
  const needBody = bodyMethod.includes(method);

  const needAuth =
    includeUrlList.some((item) => partiaUrl.startsWith(item)) &&
    !excludeUrlList.some((item) => partiaUrl.startsWith(item));
  if (fileType === "blob") {
    const response = await fetch(
      BASE_URL + partiaUrl + (query ? queryString(query) : ""),
      {
        headers: {
          ...(needAuth
            ? {
                token: Auth.token,
              }
            : {}),
          ...(needBody && type !== null
            ? {
                "Content-Type": type,
              }
            : {}),
          "Accept-Language": la,
        },
        method,
        ...(needBody
          ? {
              body: type === "application/json" ? JSON.stringify(body) : body,
            }
          : {}),
      }
    )
      .then((res) => {
        return res.blob();
      })
      .then((data) => {
        if (data.type === "application/json") {
          if (isLogIn) {
            Auth.clear();
            return false;
          }
          confirm({
            title: lang === "cn" ? "提示" : "Point",
            icon: <ExclamationCircleOutlined />,
            content:
              lang === "cn"
                ? "你还未登录，请先登录!"
                : "You are not logged in, please log in first!",
            centered: true,
            maskClosable: true,
            okText: lang === "cn" ? "确定" : "Confirm",
            cancelText: lang === "cn" ? "取消" : "Cancel",
            className: "loginmodalbox",
            onOk() {
              window.location.href =
                window.location.protocol +
                "//" +
                window.location.host +
                "/login";
            },
          });
          Auth.clear();
          isLogIn = true;
        } else {
          isLogIn = false;
          return data;
        }
      });
    return response;
  } else {
    const pormise = (
      await fetch(BASE_URL + partiaUrl + (query ? queryString(query) : ""), {
        headers: {
          ...(needAuth
            ? {
                token: Auth.token,
              }
            : {}),
          ...(needBody && type !== null
            ? {
                "Content-Type": type,
              }
            : {}),
          "Accept-Language": la,
        },
        method,
        ...(needBody
          ? {
              body: type === "application/json" ? JSON.stringify(body) : body,
            }
          : {}),
      })
    ).json();
    const { code } = await pormise;

    if (code === 110) {
      if (isLogIn) {
        Auth.clear();
        return false;
      }
      confirm({
        title: lang === "cn" ? "提示" : "Point",
        icon: <ExclamationCircleOutlined />,
        content:
          lang === "cn"
            ? "你还未登录，请先登录!"
            : "You are not logged in, please log in first!",
        centered: true,
        maskClosable: true,
        okText: lang === "cn" ? "确定" : "Confirm",
        cancelText: lang === "cn" ? "取消" : "Cancel",
        className: "loginmodalbox",
        onOk() {
          window.location.href =
            window.location.protocol + "//" + window.location.host + "/login";
        },
      });
      Auth.clear();
      isLogIn = true;
      return false;
    } else {
      isLogIn = false;
    }
    return pormise;
  }
};

export class API {
  static get(partiaUrl, query) {
    return request(partiaUrl, query);
  }

  static delete(partiaUrl, query) {
    return request(partiaUrl, query, undefined, "DELETE");
  }

  static post(partiaUrl, body, query, fileType) {
    return request(
      partiaUrl,
      query,
      body,
      "POST",
      "application/json",
      fileType
    );
  }

  static postFile(partiaUrl, formDataBody, query) {
    return request(partiaUrl, query, formDataBody, "POST", null);
  }
}
