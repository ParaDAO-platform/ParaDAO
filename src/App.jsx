import { useEffect } from "react";
import Router from "./router";
import Frame from "./components/Frame/index";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./i18n";

import "./App.less";
import "./utils/css/public.less";
function App() {
  let lang = localStorage.getItem("lang") || "cn";
  console.log("lang", lang);
  useEffect(() => {
    if (lang === "cn") {
      document.getElementsByTagName("body")[0].className = "body_cn";
    } else {
      document.getElementsByTagName("body")[0].className = "body_en";
    }
    getRemsize();
    window.addEventListener("resize", getRemsize);
    return () => window.removeEventListener("resize", getRemsize);
  }, []);
  const getRemsize = () => {
    const whdef = 100 / 1920;
    let ww = window.innerWidth;
    if (ww >= 1920) {
      ww = 1920;
    } else if (ww <= 768) {
      ww = 768;
    }
    const rem = ww * whdef;
    document.querySelectorAll("html")[0].style.fontSize = rem + "px";
  };
  return (
    <BrowserRouter>
      <Switch>
        <Frame>
          <Router />
        </Frame>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
