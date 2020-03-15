document.getElementById("add-new-thread").onclick = function() {
  console.log("on click save")

  
  // Đoạn này là để save giá trị của 2 textarea vào storage
  chrome.storage.sync.set({
    "production_urls": urls,
    "elements": elements
  }, function() {
    console.log("Settings saved");
  });
}
