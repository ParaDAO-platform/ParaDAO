import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import "./frame.less";

const Frame = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location.pathname]);
  return (
    <div className="frame">
      <div>{props.children}</div>
    </div>
  );
};
export default withRouter(Frame);
