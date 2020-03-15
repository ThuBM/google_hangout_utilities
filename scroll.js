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
    scorllToTarget(targetLocalTopicId, tryTimes);
  }, 1000);
}

var tryTimes = 0;

scrollToTarget(targetLocalTopicId, tryTimes);
