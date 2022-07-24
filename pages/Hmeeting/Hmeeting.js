// pages/Hmeeting/Hmeeting.js
// 获取应用实例
const app = getApp()
const db=wx.cloud.database();
Page({
  data: {
    openid:'',
    gamelog:{},
    navigateUrl:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showEnd: true,
    text:'欢迎来到联络部内联组·院长见面会专场～',
    Str: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onPrintWordbyWord(){
    let len=this.data.text.length,tmpCnt=0;
    const Handler=setInterval(()=>{
      let tmpChar=this.data.text[tmpCnt];
      this.setData({
        'Str': this.data.Str+tmpChar
      });
      tmpCnt=tmpCnt+1;
      if (tmpCnt>=len) clearInterval(Handler);
      },200);
    },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.onPrintWordbyWord();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow(options) {
    this.setData({
      hideNextButton:true
    })
    wx.cloud.callFunction({   name: 'getOpenid',   complete: res => {    console.log("云函数获得的openid：",res.result.openId); var openid=res.result.openId;
    this.setData({
      openid:openid
    })
    console.log('YES');
    db.collection("HeadMasterMeeting").where({_openid:openid}).get({
      success:res=>{
        if(res.data.length==0)
        {
          var gamelog={
              "List": {
                "index": false,
                "Scene1": false,
                "Scene2": false,
                "Scene3": false,
                "Scene4": false
              }
          }
          this.setData({
            navigateUrl:'../../PackC/pages/Menu/Menu?gamelog='+JSON.stringify(gamelog)
          })
          db.collection("HeadMasterMeeting").add({
            data:{
              gamelog:gamelog
            }
          })
        }
        else
        {
          var gamelog=res.data[0].gamelog
          console.log('This',gamelog);
          let flag=gamelog.List.index;
          flag&=gamelog.List.Scene1;
          flag&=gamelog.List.Scene2;
          flag&=gamelog.List.Scene3;
          flag&=gamelog.List.Scene4;
          console.log("STATE,",flag);
          this.setData({
            navigateUrl:'../../PackC/pages/Menu/Menu?gamelog='+JSON.stringify(gamelog),
            showEnd: flag?false:true
          });
        }
      }
    })
  }})
  },
})
