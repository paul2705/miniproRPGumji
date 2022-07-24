// PackC/pages/Scene4/Scene4.js
import { showArticle } from "../../../utils/util";
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "主持",
    contents: [
      {type: 0, text: "", picture: "", popup: { contents: null, hide: true }},
      {type: 1, text: "虽然要在院长与众多同学们做主持让我感到很紧张，但我还是选择了这个工作，因为真的很想锻炼一下自己！但主持稿怎么写的问题也接踵而至：主持稿怎么写呢？应该怎么安排整个流程呢？如果出现了意外情况要怎么控场呢？如果来参加的同学太少了院长会不会不高兴呢？....-最终我们决定增加一个线上会场，可以让更多同学们有机会远程参加见面会，更有参与感。同时，我也将主持稿改成了英文版，这样就可以照顾到参加见面会的留学生们啦！-", picture: "", popup:{ contents: null, hide: true }},
      {type: 1, text: "见面会上的流程还算顺利，从开场白到对于各个提案以及建议解决方案的介绍，一切都朝着预演的方向进行着，很快到达了最后的自由问答环节。-就在这时，我突然想起部长们在分配任务提到主持人的控场要求：去年出现了学生提问比较敏感的情况，主持人应该迅速做出合理的沟通回应。我不由的紧张起来，“不会今年也出现类似的情况吧？” “而且，万一根本没人提问怎么办啊？”... ... -好在！同学们不仅提问很积极，同时提出的问题都很有质量，而院长们也细致的解答着各种方案的可能性。看来是一次很成功的主持呢！", picture: "", 
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
    gamelog.List.Scene4=true
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