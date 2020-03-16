chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "My menu",
    id: "google-hangout-thread-management-menu",
    contexts: ["page"]
  });

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "google-hangout-thread-management-menu") {
      chrome.tabs.sendMessage(tab.id, "clickToContent", function(response) {});
    }
});
