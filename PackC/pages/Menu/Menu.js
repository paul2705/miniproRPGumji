// PackC/pages/Menu/Menu.js
import * as echarts from '../../../component/ec-canvas/echarts.js';
function initPerhourChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  var pages=getCurrentPages();;
  var currentPage = pages[pages.length - 1];
  let gamelog=currentPage.data.gamelog
  console.log(gamelog)
  var ArttackChildren=[];
  if (gamelog.List.index==true)
  {
    if(gamelog.List.Scene1==true)
      ArttackChildren.push({ id: 2, name: '联络宣传', intro: ''})
    if(gamelog.List.Scene2==true)
      ArttackChildren.push({ id: 3, name: '提案反馈', intro: ''})
    if(gamelog.List.Scene3==true)
      ArttackChildren.push({ id: 4, name: '场务', intro: ''})
    if(gamelog.List.Scene4==true)
      ArttackChildren.push({ id: 5, name: '主持', intro: ''})
  }
  var trydata=[
    { id: 1, name: '引子', intro: '',
      children: ArttackChildren
    }]
  console.log("try",trydata)
  var option = {
    tooltip: {
      show: true,
      trigger: 'item',
      triggerOn: 'click',
      formatter: function (params) {
        // console.log(params)
        let pages=getCurrentPages();
        let currentPage = pages[pages.length - 1];
        console.log(currentPage.data)
        currentPage.setData({
          'display': params.data.id-1
        })
        return '点击下方链接跳转'
      },
      position: function (pos, params, dom, rect, size) {
        // console.log(pos)
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = { top: pos[1]+3, right: size.viewSize[0]-pos[0]+8 };
        if (params.data.id == 1) {
          obj = { top: pos[1]+3, left: pos[0]+8 };
        }
        return obj;
      }
    },
    series: [{
        type: 'tree',
        data: trydata,

        top: '5%', left: '5%', bottom: '5%', right: '5%',
        symbolSize: 8,

        edgeShape: 'polyline', // 直线
        // orient: 'vertical', //竖着

        label: { position: 'left', verticalAlign: 'bottom', align: 'left', fontSize: 12 },
        leaves: {
          label: { position: 'right', verticalAlign: 'bottom', align: 'right', fontSize: 10 }
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义echats
    EChart: {
      onInit: initPerhourChart
    },
    display: -1,
  },
  onLoad(options) {
    console.log(JSON.parse(options.gamelog))
    this.setData({
      gamelog:JSON.parse(options.gamelog)
    })
   } 
})