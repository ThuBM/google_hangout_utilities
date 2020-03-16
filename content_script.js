var targetRoomId = null;
var targetThreadLocalTopicId = null;
var targetRoomName = null;
var targetThreadName = null;
var mousePosition = {};

document.addEventListener("mousedown", function(event){
  if (event.button == 2) { // right click
    var targetThreadElement = event.target.closest("c-wiz[data-local-topic-id]");
    var href = window.location.href;
    targetThreadLocalTopicId = targetThreadElement.getAttribute("data-local-topic-id");

    targetRoomId = href.substring(href.lastIndexOf("/") + 1);
    var targetRoomNameElement = document.querySelector(`span[data-group-id='space/${targetRoomId}'] span[title]`);
    targetRoomName = targetRoomNameElement.getAttribute("title");

    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
  } else {
    // check if mousedown position is not in popup
    // → hidePopup
    // → set all target info to null
  }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == "clickToContent") {
    sendResponse({});
    var popup = displayPopup();

    popup.querySelector("button").onclick = onclickThreadFormPopupSaveBtn;
  }
});

function displayPopup() {
  var popup = document.getElementById("google-hangout-thread-management-popup");
  if (!popup) {
    popup = generateInputTheadForm();
    document.body.innerHTML += popup;
    popup = document.getElementById("google-hangout-thread-management-popup");
  }

  popup.style.left = mousePosition.x + "px";
  popup.style.top = mousePosition.y + "px";
  popup.style.display = "visible";

  popup.querySelector("button").onclick = onclickThreadFormPopupSaveBtn;
  return popup;
}

function onclickThreadFormPopupSaveBtn(e) {
  targetThreadName = document.getElementById("thread-name-input").value;

  if (!targetRoomId || !targetRoomName || !targetThreadLocalTopicId || !targetThreadName) {
    console.log("Can not extract room id, room name, thread local topic id, threadName");
    return;
  }

  chrome.storage.sync.get(["threadsInfo"], function(result) {
    var threadsInfo = result.threadsInfo;

    threadsInfo.push({
      roomId: targetRoomId, roomName: targetRoomName,
      threadLocalTopicId: targetThreadLocalTopicId, threadName: targetThreadName
    });

    chrome.storage.sync.set({threadsInfo: threadsInfo}, function() {
      targetRoomId = null;
      targetThreadLocalTopicId = null;
      targetRoomName = null;
      targetThreadName = null;

      hidePopup();
    });
  });
}

function hidePopup() {
  var popup = document.getElementById("google-hangout-thread-management-popup");

  if (!popup) {return;}
  popup.style.display = "none";
}

function generateInputTheadForm() {
  return (`
    <div id="google-hangout-thread-management-popup">
      ${generateInputThreadStyle()}
      <div class="thread-form-container">
        <label>Thread name</label>
        <input id="thread-name-input">
        <button>Save</button>
      </div>
    </div>
  `);
}

function generateInputThreadStyle() {
  if (document.getElementById("input-thread-form-style")) {return;}

  return (`
    <style id="input-thread-form-style">
      /* Popup container - can be anything you want */
      div#google-hangout-thread-management-popup {
        position: fixed;
        height: 0px;
        z-index: 9999;
      }

      div.thread-form-container {
        position: relative;
        width: 400px;
        border: 3px solid #73AD21;
        background-color: yellow;
      }

      div.thread-form-container label {
        width: 30%;
        padding: 5px;
      }

      div.thread-form-container input {
        width: 70%;
        padding: 5px;
      }

      div.thread-form-container button {
        width: 100%;
        background-color: white;
        border: 1px solid #73AD21;
      }
    </style>
  `);
}
