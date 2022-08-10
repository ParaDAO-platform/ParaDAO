const menus = {
  
  menus: [
    {
      key: "/",
      component: "Home",
    },
    {
      key: "/library",
      component: "Library",
    },
    {
      key: "/mechanism/:src?",
      component: "Mechanism",
    },
    {
      key: "/company/:src?",
      component: "Company",
    },
    {
      key: "/figure/:src?",
      component: "Figure",
    },
    {
      key: "/event/:src?",
      component: "Event",
    },
    {
      key: "/activity/:src?",
      component: "Activity",
    },
    {
      key: "/report",
      component: "Report",
    },
  ],
  lists: [
    {
      key: "/login",
      component: "Login",
    },
    {
      key: "/library/sort/:type",
      component: "LibrarySort",
    },
    {
      key: "/library/details/:ids",
      component: "LibraryDetails",
    },
    {
      key: "/mechanism/details/:ids",
      component: "MechanismDetails",
    },
    {
      key: "/company/details/:ids",
      component: "CompanyDetails",
    },
    {
      key: "/dashboard",
      component: "Dashboard",
    },
    {
      key: "/figure/details/:ids",
      component: "FigureDetails",
    },
    {
      key: "/event/details/:ids",
      component: "EventDetails",
    },
    {
      key: "/home/list/:key?",
      component: "HomeList",
    },
    {
      key: "/company/hackathondetails/:ids",
      component: "HackathonDetails",
    },
  ],
};

export default menus;
