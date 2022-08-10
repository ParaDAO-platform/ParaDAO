import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";

import "./breadcrumbbar.less";
const BreadcrumbBar = ({ props, data = [], style }) => {
  
  useEffect(() => {}, []);
  return (
    <Breadcrumb separator=">" style={style} className="breadcrumbbar">
      {data.map((item, i) => {
        return item.to ? (
          <Breadcrumb.Item key={i} href={item.to}>
            {item.title}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={i}>{item.title}</Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
export default BreadcrumbBar;
