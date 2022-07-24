const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const printByWord = ()=>{
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var contents = currentPage.data.contents;
  var status = currentPage.data.status;
  var progress = currentPage.data.progress;
  var tarType = contents[status.id].type;
  if (tarType == 1){
    if (status.method == 0){
      var tarContent = contents[status.id].text;
      if (tarContent[status.position]!='-'&&status.position<tarContent.length){
        currentPage.setData({
          'status.text': status.text+tarContent[status.position],
          'status.position': status.position+1,
          'progress.cur': progress.cur+1,
          'progress.num': (progress.cur/progress.tot).toFixed(2)*100
        });
      }
      else {
        clearInterval(status.handler);
        currentPage.setData({
          'status.handler': null,
          'status.position': status.position+1 
        });
        if (status.position>=tarContent.length){
          var tmpID=status.id;
          if (contents[status.id].popup.contents == null) tmpID=0;
          var contentPopUp='contents['+tmpID+'].popup.hide';
          var nextID=status.id+1;
          if (nextID>=contents.length){
            nextID=status.id;
            contentPopUp='';
          }
          currentPage.setData({
            'status.id': nextID,
            'status.hideNextButton': true,
            'status.position': 0,
            'status.method': 0,
            [contentPopUp] : false
          });
        }
      }
    }
    else if (status.method == 1){
      clearInterval(status.handler);
      var tmpHandler = setInterval(printByWord,10);
      currentPage.setData({
        'status.handler': tmpHandler,
        'status.method': 0
      });
    }
  }
  else if (tarType == 2 && status.method == 1){
    clearInterval(status.handler);
    var tmpID=status.id;
    if (contents[status.id].popup.contents == null) tmpID=0;
    var contentPopUp='contents['+tmpID+'].popup.hide';
    var nextID=status.id+1;
    if (nextID>=contents.length){
      nextID=status.id;
      contentPopUp='';
    }
    currentPage.setData({
      'status.handler': null,
      'status.id': nextID,
      'status.hideNextButton': true,
      'status.position': 0,
      'status.method': 0,
      [contentPopUp] : false
    });
    if (nextID<contents.length-1) showArticle();
  }
}

const showArticle = () => {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var contents = currentPage.data.contents;
  var status = currentPage.data.status;
  if (status.handler == null){
    currentPage.setData({
      'status.text': "",
      'status.hideNextButton': false
    });
    if (status.position == 0 && status.id>0){
      var contentPopUp='contents['+(status.id-1)+'].popup.hide';
      if (status.id<contents.length){
      currentPage.setData({
        [contentPopUp] : true,
        'contents[0].popup.hide': true
      });}
    }
    var tmpHandler = setInterval(printByWord,60);
    currentPage.setData({
      'status.handler': tmpHandler 
    });
  }
  else {
    currentPage.setData({
      'status.method': 1
    });
  }
}

module.exports = {
  formatTime, showArticle
}
