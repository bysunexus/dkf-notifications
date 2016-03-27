/**
 * 显示一个时间 notification
 */
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});
chrome.extension.onConnect.addListener(function (port) {
  if (port.name == "MPKF_MESSAGES") {
    port.onMessage.addListener(function (msg) {
      if (msg.msg == "new") {
        var tabId = port.sender.tab.id, windowId = port.sender.tab.windowId, tab = port.sender.tab;
        chrome.windows.get(windowId, null, function (window) {
          if (!window.focused || !tab.active) {
            var notification = new Notification('新的微信客服消息', {
              icon: '48.png',
              body: "点击查看"
            });

            notification.onclick = function () {
              chrome.windows.update(windowId, {focused: true});
              chrome.tabs.update(tabId, {active: true});
              this.close();
            };
          }
        });
      }
    });
  }
});
