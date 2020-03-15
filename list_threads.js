function generateThreadsListPage() {
  chrome.storage.sync.get(["threadsInfo"], function(result) {
    var threadsInfo = result.threadsInfo;

    if (!threadsInfo) {threadsInfo = [];}

    var container = document.getElementById("container");
    container.innerHTML = generateThreadsList(threadsInfo);

    document.getElementById("add-new-thread").onclick = function() {
      var container = document.getElementById("container");
      container.innerHTML = generateNewThreadForm();
      document.getElementById("new-thread-btn-submit").addEventListener("click", onclickSubmitThreadForm);
    }

    var gotoLinks = document.querySelectorAll("a.goto");

    for (var i = 0; i < gotoLinks.length; i++) {
      gotoLinks[i].onclick = onclickGotoLink;
    }
  });
}

function onclickGotoLink(e) {
  window.targetRoom = e.currentTarget.getAttribute("data-thread-local-topic-id");
}

function generateThreadsList(threadsInfo) {
  var threadsInfoHtml = threadsInfo.map(function(threadInfo) {
    return generateThreadRow(threadInfo);
  });

  return (`
    <a class="col-xs-12" id="add-new-thread" href="#">
      New thread
    </a>
    <table class="table list-threads">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="col-xs-4">Room</th>
          <th scope="col" class="col-xs-4">Thread</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        ${threadsInfoHtml.join('\n')}
      </tbody>
    </table>
  `);
}

function generateThreadRow(threadInfo) {
  return (`
    <tr>
      <td>${threadInfo.roomId}</td>
      <td>${threadInfo.roomName}</td>
      <td>${threadInfo.threadName}</td>
      <td>
        <a data-thread-local-topic-id="${threadInfo.threadLocalTopicId}" class="goto" href="#">
          Goto
        </a>
        <a data-thread-local-topic-id="${threadInfo.threadLocalTopicId}">
          Delete
        </a>
    </tr>
  `);
}

generateThreadsListPage();
