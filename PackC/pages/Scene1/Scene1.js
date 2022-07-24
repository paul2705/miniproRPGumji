// PackC/pages/Scene1/Scene1.js
import { showArticle } from "../../../utils/util";
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "联络宣传",
    contents: [
      {type: 0, text: "", picture: "", popup: { contents: null, hide: true }},
      {type: 1, text: "最紧急的肯定是先和教授们确定可出席现场的时间啦！让我看看都有哪些教授需要联系：院长、党委书记、副院长、各个办公室的主管老师、思政老师......嗯，那通过一封邮件来联系他们叭！-", picture: "", popup:{ contents: null, hide: true }},
      {type: 2, text: "", picture: "https://7374-studentunion-rpg-8frojuvebf55cd9-1311954976.tcb.qcloud.la/HeadMasterMeeting/3.png?sign=c695440637370d272a9a6f42989a59ed&t=1655875856", popup:{ contents: null, hide: true }}, 
      {type: 1, text: "在联络出席老师的工作完成后，还有什么其它的事情呢？哦！既然是活动，那肯定要保证参与度叭，那前期的宣传就必不可少了。-首先就是线下部分，宣传单扫楼、龙宾楼海报，还有JIer微信公众号推送、年级群发布公告......这些都是可以利用起来的宣传方式！-可是，如何达到人人皆知的宣传效果呢？扫楼！我们要带着宣传单进行各个宿舍的上门宣传，这可是磨练社牛大心脏的绝佳时机！-那就来看看这次的“魔法学院院长见面会”的宣传公告吧！", picture: "", popup:{ contents: null, hide: true }},
      {type: 2, text: "", picture: "https://7374-studentunion-rpg-8frojuvebf55cd9-1311954976.tcb.qcloud.la/HeadMasterMeeting/%E9%99%A2%E9%95%BF%E8%A7%81%E9%9D%A2%E4%BC%9A%E6%B5%B7%E6%8A%A5_1.png?sign=47aac8d26ee731825a9c01d8a2d19c99&t=1655876099", popup:{ contents:null, hide: true }},
      {type: 2, text: "", picture: "https://7374-studentunion-rpg-8frojuvebf55cd9-1311954976.tcb.qcloud.la/HeadMasterMeeting/4.png?sign=76a42ae7e16b0af247ee268e130f37bc&t=1655876017", popup:{ contents:null, hide: true }},
      {type: 1, text: "2021年秋季院长见面会定于11月8日晚19：00~21：00于龙宾楼300号报告厅举行。这正是一个与老师交流，自由表达你的想法的好机会。会上，院长导师们会针对你们的问题给出权威性的答复，希望大家积极参与！提出意见的同学可以针对老师的回复再进行提问。-", picture: "", popup:{ contents:null, hide: true }},
      {type: 2, text: "", picture: "https://7374-studentunion-rpg-8frojuvebf55cd9-1311954976.tcb.qcloud.la/HeadMasterMeeting/5_01.jpg?sign=c33d10ff6b9f1a5af8d2dcd4ed197bfd&t=1655876119", popup:{ contents:null, hide: true }},
      {type: 1, text: "为了保证参与度，是不是还需要设置一些小奖品呢？这是有必要的叭！学院风的笔记本就是非常有纪念意义的奖品哟！-我们根据提案质量选出10份优秀提案，并向提案提出者发放小礼物，啊！那还需要跟外联组的密院小铺联系一下... ...-最后统计一下本次活动的预算\nKT板+海报+宣传邀请函  150元\n优秀提案奖品（密院小铺） 250元\n共计       400元", picture: "", popup:{ contents:null, hide: true }},
      {type: 1, text: "那么到现在，所有零碎的事情就已经全部完成了，好耶，只要把这些东西整合在一起，再确认一下时间点，就可以完成前期的联络和宣传工作啦！-", picture: "", 
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
    this.printContent();
  },

  backScene(){
    var gamelog=this.data.gamelog
    gamelog.List.Scene1=true
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