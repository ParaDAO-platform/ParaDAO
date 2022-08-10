import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { useTranslation } from "react-i18next";
import x_y from "./data_x_y.json";

import "./echarts.less";
// graph
export default function EchartsGraph({props, graph, isShowGraph, type }) {
  const { t } = useTranslation();
  useEffect(() => {
    
    if (graph.nodes) {
      if(type==="gongsi") {
        graph.categories = [
          {
            name: t("Company"),
          },
          {
            name:  t("Investment institutions"), 
          },
          {
            name:t("Company founder"),
          },
          
          {
            name: t("Company staff"), 
          }
        ];
      }
      if(type==="jigou") {
        graph.categories = [
          {
            name: t("Mechanism"),
          },
          {
            name:t("Company"),
          },
          {
            name:  t("founder"), 
          },
        ];
      }
      if(type==="renwu") {
        graph.categories = [
          {
            name: t("Figure"),
          },
          {
            name:t("Company"),
          },
        ];
      }
      
      let arr = graph.nodes;
      let index_1 = 0;
      let index_2 = 0;
      let index_3 = 0;
      let index_4 = 0;
      let index_5 = 0;
      let index_6 = 0;
      arr.forEach((ele, index) => {
        if (ele.id == "0") {
          ele.x = 0;
          ele.y = 0;
          ele.symbolSize = 40;
        }
        if (ele.category == 1) {
          let category_1 = suijinum(x_y.x_y.length - 1);
          ele.x = x_y.x_y[category_1[index_1]].x;
          ele.y = x_y.x_y[category_1[index_1]].y;
          index_1++;
          ele.symbolSize = 20;
        }
        if (ele.category == 2) {
          let category_2 = suijinum(x_y.x_y_1.length - 1);
          ele.x = x_y.x_y_1[category_2[index_2]].x;
          ele.y = x_y.x_y_1[category_2[index_2]].y;
          // console.log(ele.name,ele.x,ele.y)
          index_2++;
          ele.symbolSize = 20;
        }
        if (ele.category == 3) {
          let category_3 = suijinum(x_y.x_y_2.length - 1);
          ele.x = x_y.x_y_2[category_3[index_3]].x;
          ele.y = x_y.x_y_2[category_3[index_3]].y;
          index_3++;
          ele.symbolSize = 20;
        }
        if (ele.category == 4) {
          let category_4 = suijinum(x_y.x_y_3.length - 1);
          ele.x = x_y.x_y_3[category_4[index_4]].x;
          ele.y = x_y.x_y_3[category_4[index_4]].y;
          index_4++;
          ele.symbolSize = 20;
        }
        if (ele.category == 5) {
          let category_5 = suijinum(x_y.x_y_4.length - 1);
          ele.x = x_y.x_y_4[category_5[index_5]].x;
          ele.y = x_y.x_y_4[category_5[index_5]].y;
          index_5++;
          ele.symbolSize = 20;
        }
        if (ele.category == 6) {
          let category_6 = suijinum(x_y.x_y_5.length - 1);
          ele.x = x_y.x_y_5[category_6[index_6]].x;
          ele.y = x_y.x_y_5[category_6[index_6]].y;
          index_6++;
          ele.symbolSize = 20;
        }
        // ele.x =(ele.category==1 || ele.id==0) || arr.length>30 ? x_y.nodes[index].x : x_y.nodes[x_y.nodes.length - index -1].x;
        // ele.y =(ele.category==1 || ele.id==0) || arr.length>30 ? x_y.nodes[index].y : x_y.nodes[x_y.nodes.length - index -1].y;
        // ele.x = x_y.nodes[index].x;
        // ele.y = x_y.nodes[index].y;
        // if (arr.length < 40 && ele.id != 0) {
        //   ele.symbolSize =
        //     x_y.nodes[index].symbolSize * 1 < 15
        //       ? x_y.nodes[index].symbolSize * 2
        //       : x_y.nodes[index].symbolSize;
        // } else {
        //   ele.symbolSize = x_y.nodes[index].symbolSize;
        // }
      });
      
      graph.nodes = arr;
      // setEcharts();
    }
  }, [graph]);
  useEffect(() => {
    if (isShowGraph) {
      setEcharts();
      // pubdata(graph);
    } else {
      desHander();
    }
    // setEcharts();
  }, [isShowGraph]);
  const desHander = () => {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.dispose();
  };
  const suijinum = (num) => {
    var count = num;
    var a = new Array();
    for (var i = 0; i < count; i++) {
      a[i] = i;
    }
    a.sort(function () {
      return 0.5 - Math.random();
    });
    return a;
  };
  const setEcharts = () => {

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;
    myChart.showLoading();
    myChart.hideLoading();
    graph.nodes.forEach(function (node) {
      let num = Math.floor(Math.random()*(100-1)+1);
      let bool = false;
      if(num % 5 ===1) bool = true;
      node.label = {
        show:node.id=="0" ? true : bool,
      };
      // node.id=="0" ? node.symbolSize  = 80 : node.symbolSize = 40
    });
    option = {
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params) {
          if (params.data.category != undefined) {
            return params.data.name;
          } else {
            return params.data.source_name + " --- " + params.data.target_name;
          }
        },
      },
      legend: [
        {
          data: graph.categories.map(function (a) {
            return a.name;
          }),
        },
      ],
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          name: "Les Miserables",
          type: "graph",
          layout: "none",
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: "right",
            formatter: "{b}",
          },
          lineStyle: {
            color: "source",
            curveness: 0.3,
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 10,
            },
          },
        },
      ],
    };
    myChart.setOption(option);

    option && myChart.setOption(option);
    myChart.resize();
    window.onresize = function () {
      if (option && myChart) {
        console.log(1)
        myChart.resize();
      }
    };
    myChart.on('click', function (param){
      
      if (param.dataType == 'node') {
        
        if(type==="jigou"){
          if(param.data.category == 2){ 
            if(param.data.ids!="") props.history.push("/figure/details/" + param.data.ids);
          }
          if(param.data.category == 1){ 
            if(param.data.ids!="") props.history.push("/company/details/" + param.data.ids);
          }
        }
        if(type==="gongsi"){
          if(param.data.category == 2 || param.data.category == 3){ 
            if(param.data.ids!="") props.history.push("/figure/details/" + param.data.ids);
            
          }
          if(param.data.category == 1){ 
            if(param.data.ids!="") props.history.push("/mechanism/details/" + param.data.ids);
          }
        }
        if(type==="renwu"){
          if(param.data.category == 1){ 
            if(param.data.ids!="") props.history.push("/company/details/" + param.data.ids);
          }
        }
      }})
  };
  function getImgData(imgSrc) {
    var fun = function (resolve) {
      const canvas = document.createElement("canvas");
      const contex = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var center = {
          x: img.width / 2,
          y: img.height / 2,
        };
        var diameter = img.width;
        canvas.width = diameter;
        canvas.height = diameter;
        contex.clearRect(0, 0, diameter, diameter);
        contex.save();
        contex.beginPath();
        var radius = img.width / 2;
        contex.arc(radius, radius, radius, 0, 2 * Math.PI);
        contex.clip();
        contex.drawImage(
          img,
          center.x - radius,
          center.y - radius,
          diameter,
          diameter,
          0,
          0,
          diameter,
          diameter
        );
        contex.restore();
        resolve(canvas.toDataURL("image/png", 1));
      };
      img.src = imgSrc;
    };

    var promise = new Promise(fun);

    return promise;
  }

  const pubdata = (json) => {
    var arr_temp = json.nodes;
    console.log(1111111111);
    console.log(arr_temp);
    var picList = [];
    for (var i = 0; i < arr_temp.length; i++) {
      var object = arr_temp[i];
      let img_url = "http://paradao.admin.xmublockchain.com/uploads/20220613/cc3ba0fde2fce64c91b588852695024b.jpeg"
      if(object.category===1){
        img_url = object.images
      }
      var p = getImgData(img_url);
      picList.push(p);
    }
    Promise.all(picList).then(function (images) {
      for (var i = 0; i < images.length; i++) {
        var img = "image://" + images[i];
        arr_temp[i].symbol = img;
      }
      setEcharts();
    });
  };
  return (
    <div className="echarts_graph">
      <div id="main" className="main_box"></div>
    </div>
  );
}
