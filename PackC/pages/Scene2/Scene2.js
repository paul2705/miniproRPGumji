// PackC/pages/Scene2/Scene2.js
import { showArticle } from "../../../utils/util";
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "提案反馈",
    contents: [
      {type: 0, text: "", picture: "", popup: { contents: null, hide: true }},
      {type: 1, text: "接下来，我就要正式地投入到提案的收集整理工作中去了！-内联运营的的Student Right Center Piazza平台就是一个极好的提案收集平台，除去那些回直接反馈到思政老师处或者经过邮件联系到相应办公室的提案，余下没解决的提案都会在院长见面会上统一解决；-除此之外，留学生群体也是我们需要征求提案的目标群体之一。-嗯，大概就是以上这些，来把合适的提案获取途径写到策划案上叭！-", picture: "", 
        popup:{ 
          title: "把合适的提案获取途径写到策划案上叭",
          contents:[
            {id:1, text: "SRC Piazza平台", choose: true},
            {id:2, text: "交大留学公众号", choose: true},
            {id:3, text: "向各班征集", choose: true},
            {id:4, text: "学院各办公室公邮", choose: true},
            {id:5, text: "教授和TA处获得", choose: true},
            {id:6, text: "Advising Center", choose: true},
          ], 
          showPopUpButton: false,
          hide: true 
        }
      },
      {type: 1, text: "在通过各种途径收集提案后，我们可不能一股脑地把提案的反馈全堆积在院长见面会现场，前期与相关负责老师细水长流的充分沟通是必不可少的！-那么我们该如何和老师们反馈同学们递交上来的提案呢？-", picture: "", popup:{ contents: null, hide: true }}, 
      {type: 2, text: "", picture: "https://7374-studentunion-rpg-8frojuvebf55cd9-1311954976.tcb.qcloud.la/HeadMasterMeeting/%E5%8F%8D%E9%A6%88%E9%80%94%E5%BE%84(1).png?sign=769b48ae129277f6243ed66eb23787c1&t=1655877247", popup:{ contents: null, hide: true }},
      {type: 1, text: "所以，每征集到一份新的提案，我们都要先对提案的紧急程度、重要程度进行判断，再根据具体的提案内容向相应的办公室老师进行反馈沟通，讨论提案的可行性，以便于同学们在院长见面会上得到高质量的有效答复！-这次，我们通过各种渠道征集到了下面这些提案，应该联系那个负责部门的老师呢？-", picture: "", 
        popup:{ 
          title: "应该联系那个负责部门的老师呢",
          contents: [
            {id:1, text: "关于为密院学生和老师设立一个事务提醒功能的提案" },
            {id:2, text: "关于余黎明中心书架改善的提案" },
            {id:3, text: "关于国际生信息滞后缺失的提案" },
          ], 
          hide: true 
        }
      },
      {type: 1, text: "确定了每个提案所需要联系的部门老师，接下来我们就要通过邮件的方式进行提案投送和沟通工作啦！-当然，除了院长见面会前的提案工作，我们平时也会通过公邮进行日常的学生权益问题的反馈，所以下面这些常用公邮可要放进邮箱收藏夹哩！-", picture: "", popup:{ contents:null, hide: true }},
      {type: 1, text: "最后，我们还要将提案意见分类整理好并制作成PPT交予老师，并获得学院领导反馈，再根据这些反馈，进行活动当天PPT的制作......这漫长的一步步，都不容易呢！", picture: "", 
      popup:{ 
        contents: "", hide: true
        }
      },
      {type: 3, text: "", picture: "", popup: { contents: null, hide: true }},
    ],
    status: {
      id: 1,
      position: 0,
      method: 0,
      text: "",
      handler: null,
      hideNextButton: false
    },
    progress: {
      cur: 0,
      tot: 1,
      num: 0.0
    }
  },
  printContent(){ showArticle(); },
  showPopUp(event){
    var id=event.target.dataset.popupid;
    var popid='contents['+id+'].popup.showPopUpButton';
    this.setData({
      [popid]: true
    });
  },
  onPopupClose(event){
    var id=event.target.dataset.popupid;
    var popid='contents['+id+'].popup.showPopUpButton';
    this.setData({
      [popid]: false
    });
    this.printContent();
  },
  onShowRight(e){
    let id=e.target.dataset.id;
    let sec=e.target.dataset.sec;
    let tmp='contents['+sec+'].popup.contents['+id+'].choose';
    this.setData({
      [tmp]: !this.data.contents[sec].popup.contents[id].choose
    })
    if (sec==1){
      if (this.data.contents[sec].popup.contents[0].choose==false&&
        this.data.contents[sec].popup.contents[1].choose==false&&
        this.data.contents[sec].popup.contents[2].choose==false&&
        this.data.contents[sec].popup.contents[4].choose==false){
        var popid='contents['+sec+'].popup.showPopUpButton';
        this.setData({
          [popid]: false
        });
        this.printContent();
      }
    }
  },
  dragStart(e) {
    // console.log("拖拽开始", e);
    var i = e.currentTarget.dataset.index // 当前拖拽项的索引index
    // 把当前拖拽项的内容复制给kelong
    var kelong = this.data.habitList[i]
    // console.log("拖拽开始i=",i,"kelong=",kelong);
    var query = wx.createSelectorQuery(); // 创建节点查询器 quer
    //选择class=habitlist的节点，获取节点位置信息的查询请求
    query.select('.habitlist').boundingClientRect((rect) => {
    var top = e.changedTouches[0].clientY - rect.top - 30
     var startTop = top;
      this.setData({
        kelong: kelong,
        selectedIndex:i,
        showkelong: true,
        top:top,
        startTop:startTop
      })
    }).exec();
  },
  // 拖拽移动
  dragMove(e) {
    // console.log("拖拽移动", e);
    var query = wx.createSelectorQuery();
    var top =this.data.top
    query.select('.habitlist').boundingClientRect((rect) => {
     top = e.changedTouches[0].clientY - rect.top - 30
      if (top < 0) {
        // 顶部边界控制：控制克隆项不会拖拽出class=habitlist节点的顶部边界
       top = 0
      }
      this.setData({
        top:top
      })
    }).exec();
  },
  // 拖拽结束
  dragEnd(e) {
    // console.log("拖拽结束", e);
    var i = e.currentTarget.dataset.index
    var query = wx.createSelectorQuery();
    var kelong = this.data.kelong
    var habitList = this.data.habitList
    query.select('.habitlist').boundingClientRect((rect) => {
      var top = e.changedTouches[0].clientY - rect.top - 30
      if (top > rect.height) {
        // 底部边界控制：控制克隆项拖拽结束时不会出class=habitlist节点的底部边界
        top = rect.height - 115
      } else if (top < 0) {
        // 顶部边界控制：控制克隆项拖拽结束时不会出class=habitlist节点的顶部边界
        top = 0
      }
      this.setData({
        top: top,
      })
      var target = parseInt(top / 115)
      var list = []  //用于备份数据
      if (this.data.startTop > top) {
        //  往上方位置拖拽
        for (var k = 0; k <= i - target; k++) {
          //  备份插入位置target开始的下方数据，除了拖拽数据项
          if (habitList[target + k].name != kelong.name) {
            list.push(habitList[target + k])
          }
        }
        // console.log("往上拖拽 list=======", list);
        if (list.lenghth != 0) {
          habitList[target] = kelong
          for (var m = target + 1, n = 0; n < list.length; m++, n++) {
            habitList[m] = list[n]
          }
        }
      } else {
        // 往下边位置拖拽
        for (var k = 1; k <= target - i; k++) {
          //  备份插入位置target开始的上方数据，除了拖拽数据项
          if (habitList[i + k].name != kelong.name) {
            list.push(habitList[i + k])
          }
        }
        // console.log("往下拖拽 list=======", list);
        if (list.length != 0) {
          habitList[target] = kelong
          for (var m = i, n = 0; n < list.length; m++, n++) {
            habitList[m] = list[n]
          }
        }
      }
      this.setData({
        habitList: habitList,
        selectedIndex:-1,
        showkelong: false
      })
      // console.log(habitList,this.data.targetList,habitList==this.data.targetList);
      let flag=true;
      for (let i=0;i<this.data.habitList.length;i++){
        if (this.data.habitList[i].name!=this.data.targetList[i].name) flag=false;
      }
      if (flag) this.onPopupClose(e);
    }).exec();
  },
  backScene(){
    var gamelog=this.data.gamelog
    gamelog.List.Scene2=true
    db.collection("HeadMasterMeeting").where({_openid:this.data.openid}).update({
      data: {
       gamelog:gamelog
      },
      success:res=>{
        console.log(res.data)
        this.setData({ showBackButton: false });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({   name: 'getOpenid',   complete: res => {    console.log("云函数获得的openid：",res.result.openId); var openid=res.result.openId;
    this.setData({
      openid:openid
    })
    db.collection("HeadMasterMeeting").where({_openid:openid}).get({
      success:res=>{
        this.setData({
          gamelog: res.data[0].gamelog
        })
        this.printContent();
    var len=0;
    for (var i=0;i<this.data.contents.length;i++){
      len+=this.data.contents[i].text.length;
    }
    this.setData({
      'progress.tot': len
    });
    var list = [
      { name: "国际学生服务办公室", icon: "" },
      { name: "后勤管理部门", icon: "" },
      { name: "IT办公室", icon: "" },
    ]
    var tar = [
      { name: "IT办公室", icon: "" },
      { name: "后勤管理部门", icon: "" },
      { name: "国际学生服务办公室", icon: "" }
    ]
    this.setData({
      habitList: list,
      targetList: tar
    })
      }
    })}})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})