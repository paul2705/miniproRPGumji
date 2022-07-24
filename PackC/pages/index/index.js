// PackC/pages/index/index.js
import { showArticle } from "../../../utils/util";
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "引子",
    contents: [
      {type: 0, text: "", picture: "", popup: { contents: null, hide: true }},
      {type: 2, text: "", picture: "https://7374-studentunion-rpg-8frojuvebf55cd9-1311954976.tcb.qcloud.la/HeadMasterMeeting/1.png?sign=dd8ce61ab880c49f2ed36dca8478a658&t=1655819515", popup:{ contents: null, hide: true }},
      {type: 2, text: "", picture: "https://7374-studentunion-rpg-8frojuvebf55cd9-1311954976.tcb.qcloud.la/HeadMasterMeeting/2.png?sign=f098102c71b0f12d7f00fa86fdccac19&t=1655821434", popup:{ contents: null, hide: true }},
      {type: 1, text: "哈喽大家好~我是一名联络部内联组的一名大一志愿者。当初选择来到，可是被“反内卷集中基地”“摸鱼进习中心”这些响当当的名号吸引。-而真正来到这里，才发现内联的意义除了“摸鱼“和”反卷”，更重要的在于它在学生权益工作中不可或缺的角色！-在进入内联组后不久，我就很快地融入了这个温暖的大家庭，深刻领会诸如qwq的“内联特色”精神......-", picture: "", popup:{ contents: null, hide: true }},
      {type: 1, text: "内联组在权益方面的最为重要的活动：院长见面会，很快就提上日程了！我们需要收集同学们对于学院、学习、生活各方面的问题和意见，并且把他们整理之后反馈到学院各个负责部门处，并且与负责人们共同探讨可能的解决方案。-但由于院长见面会是一次正式的大会，它的工作可远不止这些......-", picture: "", popup:{ contents:null, hide: true }},
      {type: 1, text: "‘各位qwq.，大家都过来一下，我们要为这次院长见面会分组安排任务啦!!..’-第一次筹备这样正式的会议，参与到如此意义重大的学生权益工作中来，我不免有些忐忑呢！来看看都有些哪些任务需要处理叭！-", picture: "", 
      popup:{ 
        title: "按照内心兴趣做出选择吧",
        contents:[
          {id:1, text: "联络宣传", url: "/PackC/pages/Scene1/Scene1"},
          {id:2, text: "提案反馈", url: "/PackC/pages/Scene2/Scene2"},
          {id:3, text: "场务", url: "/PackC/pages/Scene3/Scene3"},
          {id:4, text: "主持", url: "/PackC/pages/Scene4/Scene4"}
        ],
        hide: true,
        showPopUpButton: false
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
    this.backScene();
    var id=event.currentTarget.dataset.popupid;
    var popid='contents['+id+'].popup.showPopUpButton';
    this.setData({
      [popid]: true
    });
  },
  onPopupClose(event){
    var id=event.currentTarget.dataset.popupid;
    var popid='contents['+id+'].popup.showPopUpButton';
    this.setData({
      [popid]: false
    });
    if (id<5) this.printContent();
  },

  backScene(){
    var gamelog=this.data.gamelog
    gamelog.List.index=true
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