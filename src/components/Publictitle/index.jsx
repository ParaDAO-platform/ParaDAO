import React, { useState, useEffect } from "react";

import "./publictitle.less";


const Publictitle = ({ title, textAlign = "text_align_left" }) => {
  const classNameT = "public_title " + textAlign;
  useEffect(() => {}, []);
  return (
    <div className={classNameT}>
      <div className="public_title_t">
        {title}
        <div className="public_title_box"></div>
      </div>
    </div>
  );
};
export default Publictitle;
