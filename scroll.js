function scrollToTarget(targetLocalTopicId, tryTimes) {
  if (tryTimes > 10) {return;}

  var targetThread = document.querySelector(`c-wiz[data-local-topic-id='${targetLocalTopicId}']`);
  if (targetThread) {
    targetThread.scrollIntoView();
    return;
  }

  var highestThread = document.querySelector("c-wiz[data-local-topic-id");
  highestThread.scrollIntoView();
  tryTimes += 1;

  console.log("tryTimes: " + tryTimes);

  window.setTimeout(function(){
    scrollToTarget(targetLocalTopicId, tryTimes);
  }, 1000);
}

if (window.location.href.indexOf(targetRoomId) < 0) {
  var href = window.location.href;
  var lastSlashIndex = href.lastIndexOf("/");

  window.location.href = `${href.substring(0, lastSlashIndex)}/${targetRoomId}`;
} else {
  var tryTimes = 0;

  scrollToTarget(targetLocalTopicId, tryTimes);
}
