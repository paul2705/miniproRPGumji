// PackC/pages/Scene3/Scene3.js
import { showArticle } from "../../../utils/util";
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "场务",
    contents: [
      {type: 0, text: "", picture: "", popup: { contents: null, hide: true }},
      {type: 1, text: "场务工作琐碎却重要，布置会场、接待嘉宾、维持秩序......当然，我还是忘不了那个准备领导座牌时发生的小插曲。-", picture: "", popup:{ contents: null, hide: true }},
      {type: 1, text: "座牌准备工作不算困难，首先要明确座牌的材质、样式。如果用a4纸的话会因为太软了架不起来..那就用卡纸叭！样式的话肯定要具有密院的特色，那么就采取经典的蓝黄配色，再加上领导的名字和密院的logo！制作座牌的过程还算顺利，只要做好模板再到学校打印店打印就行啦！-", picture: "", popup:{ contents: null, hide: true }}, 
      {type: 1, text: "但让人万万没想到的是，在院长见面会开始的几分钟前，我突然发现少了一位院长的座牌。-“该怎么办 怎么办！”我的内心无比慌乱，不知道该怎么办了555。肯定要去补做一张座牌，不然就太尴尬了，要是来不及怎么办啊，院长会不会责怪我们？-可是我来不及再多担心，抓起手机以最快的速度冲出龙宾楼，跨上一辆筋斗云全速冲向二餐的打印店。-到达打印店后，我失望的发现这时候正直打印论文的高峰，店里还有很多人。我赶紧找到打印店的小哥哥，请求他尽快帮我打印座牌。可前面还有不少人在排队，我只能看着时间一点点流逝......-等我拿着座牌赶到会场时，见面会已经开始了十几分钟了，我站在门口不知所措，“如果进去把座牌放上，不就等于告诉所有人我们的失误了吗？”-但我又转念一想“应该尽快进去，总不能让院长没有座牌一直尴尬下去吧！既然出了失误就要勇敢承担呀！”-于是我鼓起勇气，走到院长身边，为他放上座牌并轻声道歉。院长这是温柔的笑了笑，让我紧张的内心稍微缓和了一些。我快速走到后排的座位上坐下，明明是寒冷的十一月，现在的我却大汗淋漓。", picture: "",
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
    gamelog.List.Scene3=true
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