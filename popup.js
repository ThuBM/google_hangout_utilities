document.getElementById("add-new-thread").onclick = function() {
  var container = document.getElementById("container");
  container.innerHTML = generateNewThreadForm();
  document.getElementById("new-thread-btn-submit").addEventListener("click", onclickSubmitThreadForm);
}

function onclickSubmitThreadForm() {
  var roomIdElement = document.getElementById("room-id");
  var roomNameElement = document.getElementById("room-name");
  var threadLocalTopicIdElement = document.getElementById("thread-local-topic-id");
  var threadNameElement = document.getElementById("thread-name");

  var roomId = roomIdElement ? roomIdElement.value : undefined;
  var roomName = roomNameElement ? roomNameElement.value : undefined;
  var threadLocalTopicId = threadLocalTopicIdElement ? threadLocalTopicIdElement.value : undefined;
  var threadName = threadNameElement ? threadNameElement.value : undefined;

  var errorMessages = [];

  if (!roomId) {errorMessages.push("Room ID is empty.");}
  if (!roomName) {errorMessages.push("Room Name is empty.");}
  if (!threadLocalTopicId) {errorMessages.push("Thread local topic ID is empty.");}
  if (!threadLocalTopicId) {errorMessages.push("Thread Name is empty.");}

  if (errorMessages.length > 0) {console.error(errorMessages[0]);}

  chrome.storage.sync.get(["threadsInfo"], function(result) {
    var threadsInfo = result.threadsInfo;

    if (!threadsInfo) {threadsInfo = [];}

    threadsInfo.push({
      roomId: roomId, roomName: roomName,
      threadLocalTopicId: threadLocalTopicId, threadName: threadName
    });

    chrome.storage.sync.set({threadsInfo: threadsInfo}, function() {
      // TODO
    });
  });
}
