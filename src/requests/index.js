import { API } from "./api";


export const getRegister = async (body) => {
  return await API.post("api/user/register", body);
};


export const getSendEms = async (body) => {
  return await API.post("api/user/send_ems", body);
};


export const getLogin = async (body) => {
  return await API.post("api/user/login", body);
};


export const getResetpwd = async (body) => {
  return await API.post("api/user/resetpwd", body);
};


export const getUserInfo = async (body) => {
  return await API.post("api/user/user_info", body);
};


export const getInvestorsList = async (query) => {
  return await API.get("api/investors/investors_list", query);
};


export const getInvestorsDetails = async (query) => {
  return await API.get("api/investors/investors_details", query);
};


export const getFollow = async (body) => {
  return await API.post("api/investors/follow", body);
};


export const getCompaniesLists = async (query) => {
  return await API.get("api/companies/companies_lists", query);
};


export const getCompaniesDetails = async (query) => {
  return await API.get("api/companies/companies_details", query);
};


export const getCompaniesFollow = async (body) => {
  return await API.post("api/companies/follow", body);
};


export const getPersonageList = async (query) => {
  return await API.get("api/personage/personage_list", query);
};


export const getPersonageDetails = async (query) => {
  return await API.get("api/personage/personage_details", query);
};


export const getPersonageFollow = async (body) => {
  return await API.post("api/personage/follow", body);
};


export const getEventList = async (query) => {
  return await API.get("api/fundraising_rounds/fundraising_rounds_list", query);
};


export const getEventDetails = async (query) => {
  return await API.get(
    "api/fundraising_rounds/fundraising_rounds_details",
    query
  );
};


export const getHackerSong = async (body) => {
  return await API.post("api/companies/hacker_song", body);
};


export const getSearchPersonage = async (query) => {
  return await API.get("api/personage/search_personage", query);
};

export const getSearchInvestors = async (query) => {
  return await API.get("api/investors/search_investors", query);
};


export const getSearchCompanies = async (query) => {
  return await API.get("api/companies/search_company", query);
};


export const getHackerSongDetails = async (query) => {
  return await API.get("api/companies/hacker_song_details", query);
};


export const getHackerSongFollow = async (body) => {
  return await API.post("api/companies/hacker_song_follow", body);
};


export const getSearchHackeSong = async (query) => {
  return await API.get("api/companies/search_hacker_song", query);
};


export const getShowDocument = async (query) => {
  return await API.get("api/document/show", query);
};


export const getDocumentFollow = async (body) => {
  return await API.post("api/document/follow", body);
};


export const getCategory = async (query) => {
  return await API.get("api/index/get_category", query);
};


export const getNewDocument = async (query) => {
  return await API.get("api/document/new_document", query);
};


export const getCategoryDocument = async (query) => {
  return await API.get("api/index/category_document", query);
};


export const getLogout = async (query) => {
  return await API.get("api/user/logout", query);
};


export const setMyNameAndPhoto = async (body) => {
  return await API.post("api/user/edit_userinfo", body);
};


export const kycAdd = async (query) => {
  return await API.post("api/user/kyc_add", query);
};


export const setMyLists = async (query) => {
  return await API.get("api/document/my_lists", query);
};


export const getUploadDocument = async (body) => {
  return await API.post("api/document/upload", body);
};


export const getGEditDocument = async (query) => {
  return await API.get("api/document/edit", query);
};


export const getPEditDocument = async (body) => {
  return await API.post("api/document/edit", body);
};


export const getBrowserList = async (body) => {
  return await API.post("api/document/document_view", body);
};


export const getProfessionalLists = async (query) => {
  return await API.get("api/user/professional_cert_lists", query);
};


export const getProfessionalAdd = async (body) => {
  return await API.post("api/user/professional_cert_add", body);
};


export const getCompaniesFoundSearch = async (query) => {
  return await API.get("api/user/companies_found_search", query);
};


export const getMyUploadsMechanism = async (query) => {
  return await API.get("api/user/my_uploads_mechanism", query);
};


export const getUploadsMechanism = async (body) => {
  return await API.post("api/user/uploads_mechanism", body);
};


export const getProfessionalDel = async (body) => {
  return await API.post("api/user/professional_cert_del", body);
};


export const getSeeMechanism = async (query) => {
  return await API.get("api/user/edit_mechanism", query);
};


export const getEditMechanism = async (body) => {
  return await API.post("api/user/edit_mechanism", body);
};


export const getTrackList = async (query) => {
  return await API.get("api/user/data_track_lists", query);
};

export const addTrack = async (query) => {
  return await API.post("api/user/add_track", query);
};

export const cancelTrack = async (query) => {
  return await API.get("api/user/add_track", query);
};

export const getTrackTotal = async (query) => {
  return await API.get("api/user/data_track_total", query);
};

export const getFollowList = async (query) => {
  return await API.get("api/user/my_follow_lists", query);
};

export const getScroeLog = async (query) => {
  return await API.get("api/user/my_points_log", query);
};

export const getSubaccountList = async (query) => {
  return await API.get("api/user/subaccount", query);
};

export const addSubaccount = async (body) => {
  return await API.post("api/user/add_subaccount", body);
};

export const editSubaccount = async (body) => {
  return await API.post("api/user/edit_subaccount", body);
};

export const getNoticeList = async (query) => {
  return await API.get("api/user/notice", query);
};

export const getMessageList = async (query) => {
  return await API.get("api/user/message_list", query);
};

export const setSubaccountLocked = async (body) => {
  return await API.post("api/user/subaccount_locked", body);
};

export const editPwd = async (body) => {
  return await API.post("api/user/edit_password", body);
};

export const openMemberVip = async (body) => {
  return await API.post("api/user/open_member_vip", body);
};

export const myRechargeLog = async (query) => {
  return await API.get("api/user/my_recharge_log", query);
};


export const getBrowseDetails = async (query) => {
  return await API.get("api/user/browse_details", query);
};

export const downPdfInvestors = async (body) => {
  return await API.post("api/user/down_pdf_investors", body, "", "blob");
};

export const downPdfCompany = async (body) => {
  return await API.post("api/user/down_pdf_companies", body, "", "blob");
};

export const downPdfDeck = async (body) => {
  return await API.post("api/user/down_pdf_deck", body, "", "blob");
};


export const getMyDown = async (query) => {
  return await API.get("api/user/my_down", query);
};

export const noticeDetails = async (query) => {
  return await API.get("api/user/notice_details", query);
};

export const meetingLists = async (query) => {
  return await API.get("api/activity/meeting_lists", query);
};

export const meetingDetails = async (query) => {
  return await API.get("api/activity/meeting_details", query);
};

export const userWalletAddress = async (query) => {
  return await API.get("api/user/user_wallet_address", query);
};

export const dataBoardLists = async (query) => {
  return await API.get("api/user/data_board_lists", query);
};

export const dataBoardDetails = async (query) => {
  return await API.get("api/user/data_board_details", query);
};

export const graphData = async (query) => {
  return await API.get("api/companies/companies_diagram", query);
};

export const investorsGraphData = async (query) => {
  return await API.get("api/investors/investors_diagram", query);
};

export const personageGraphData = async (query) => {
  return await API.get("api/personage/personage_diagram", query);
};

export const editPayPassword = async (query) => {
  return await API.post("api/user/edit_paypassword", query);
};
/**
 * FA管理系统
 * @param {*} query
 * @returns
 */

export const faadminGetCompanies = async (query) => {
  return await API.get("api/faadmin/companies", query);
};

export const faadminProjectAddorDel = async (query) => {
  return await API.post("api/faadmin/project_add", query);
};

export const faadminGetProjectLists = async (query) => {
  return await API.get("api/faadmin/project_lists", query);
};

export const faadminGetProjectSongLists = async (query) => {
  return await API.get("api/faadmin/project_song", query);
};

export const faadminGetSearchSongLists = async (query) => {
  return await API.get("api/faadmin/search_song", query);
};

export const faadminSongAdd = async (query) => {
  return await API.post("api/faadmin/song_add", query);
};


export const getProgressList = async (body) => {
  return await API.post("api/faadmin/progress_list", body);
};


export const getProgressAdd = async (body) => {
  return await API.post("api/faadmin/progress_add", body);
};


export const getCreateSong = async (body) => {
  return await API.post("api/faadmin/create_song", body);
};

export const setFaAdminSongStatus = async (body) => {
  return await API.post("api/faadmin/song_status", body);
};

export const getFaAdminProjectGrant = async (body) => {
  return await API.get("api/faadmin/project_grant", body);
};

export const createGrant = async (body) => {
  return await API.post("api/faadmin/create_grant", body);
};

export const editGrantStatus = async (body) => {
  return await API.post("api/faadmin/grant_status", body);
};

export const getFaAdminInvestors = async (body) => {
  return await API.get("api/faadmin/project_investors", body);
};

export const getFaAdminInvestorsSearchList = async (body) => {
  return await API.get("api/faadmin/investors", body);
};

export const getFaAdminInvestorsAdd = async (body) => {
  return await API.post("api/faadmin/investors_add", body);
};

export const createInvestorsIntention = async (body) => {
  return await API.post("api/faadmin/investors_intention_add", body);
};

export const editInvestorsStatus = async (body) => {
  return await API.post("api/faadmin/investors_status", body);
};

export const getFaAdminCommunity = async (body) => {
  return await API.get("api/faadmin/project_community", body);
};

export const createFaAdminCommunity = async (body) => {
  return await API.post("api/faadmin/create_community", body);
};

export const editFaAdminCommunityStatus = async (body) => {
  return await API.post("api/faadmin/community_status", body);
};

export const getFaAdminCommunityInfo = async (body) => {
  return await API.get("api/faadmin/community_edit", body);
};

export const editFaAdminCommunity = async (body) => {
  return await API.post("api/faadmin/community_edit", body);
};

export const getFaAdminPersonList = async (body) => {
  return await API.get("api/faadmin/person_list", body);
};

export const getOverviewTop = async (query) => {
  return await API.get("api/faadmin/overview", query);
};


export const getOverviewBtm = async (query) => {
  return await API.get("api/faadmin/overview_project", query);
};


export const getOverviewSearchProject = async (query) => {
  return await API.get("api/faadmin/search_project", query);
};


export const getHistogram = async (query) => {
  return await API.get("api/faadmin/histogram", query);
};


export const getDownPdf = async (body) => {
  return await API.post("api/faadmin/down_pdf", body, "", "blob");
};

export const createFaAdminPerson = async (body) => {
  return await API.post("api/faadmin/create_person", body);
};

export const editFaAdminPerson = async (body) => {
  return await API.post("api/faadmin/person_edit", body);
};

export const delFaAdminPerson = async (body) => {
  return await API.post("api/faadmin/person_del", body);
};
