$(function () {
  var send = true;
  var port = chrome.extension.connect({name: "MPKF_MESSAGES"});
  port.onMessage.addListener(function(msg) {});
  var observer = new MutationObserver(function (mutations) {
    if(send){
      port.postMessage({msg: "new"});
      // 5秒才发一条消息
      send = false;
      window.setTimeout(function(){
        send = true;
      },5000)
    }
  });

  var config = {
    childList: true
  };

  $(".tab_item > span").each(function () {
    observer.observe(this, config);
  });
  $(".card_content_time").each(function () {
    observer.observe(this, config);
  });
  $(".wait_list_time>p").each(function () {
    observer.observe(this, config);
  });
});