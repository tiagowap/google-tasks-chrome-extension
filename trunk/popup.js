// Copyright 2011, the Google Tasks Chrome Extension authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var backgroundPage = chrome.extension.getBackgroundPage();
var currentVisitingURL = "";
var currentTabId = 0;

chrome.tabs.getSelected(null, function(tab) {
  currentVisitingURL = tab.url;
  currentTabId = tab.id;
  console.log("id: " + currentTabId + "\n");
  console.log("url: " + currentVisitingURL + "\n");
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case 'selectionResult':
      console.log("received selection: " + request.selection);
      initPopupDone(request.selection);
      break;
  }
});

function doAddNewTask(text) {
  text = text.replace(/^\s+|\s+$/g, '');
  if (!text)
    return;
  var timeStamp = Date.now();
  var taskObject = {
    url: currentVisitingURL,
    title: text,
    content: text,
    timeStamp: timeStamp
  };
  console.log("task content: " + taskObject.content);
  backgroundPage.addTask(taskObject);
  chrome.tabs.update(currentTabId, { selected: true });
}

function navigateNew(url) {
  chrome.tabs.create({url: url});
}

function resetTaskInput() {
  var e = document.getElementById("task_input");
  e.style.fontStyle = "normal";
  e.style.color = "black";
}

function initPopup() {
  chrome.tabs.sendRequest(currentTabId, {
    type: 'getSelectionText',
  }, function() { });
displayTasks();
}

function handleDisplayResponse(resp) {
  //var tasks = resp;
  var tasks = $("#Tasklist");
  tasks.html("");
//tasks.html(resp["items"][0]["title"]);
  $(resp["items"]).each(function(i,fa) {
    if (resp["items"][i]["status"] == "completed") {
      return;
    }
    var li = $("<li />").html(resp["items"][i]["title"])
                        .css({
                            'background': '#eee',
                            'list-style': 'none',
                            //'list-style-image': url('images/tasks-16x16.png'),
                            'padding': '2px'
                        })
                        .hover(function() {
                          $(this).css({'background': '#555'});
                         }, function() {
                           $(this).css({'background': '#eee'});
                         })
                        .appendTo(tasks)
});
}

function displayTasks() {
chrome.extension.getBackgroundPage().getTasks(handleDisplayResponse);
}

function initPopupDone(text) {
  var e = document.getElementById("task_input");
  if (text) {
    e.value = text;
    resetTaskInput();
  }
  e.focus();
}

function onEditTask() {
  resetTaskInput();
}

function submitNewTask() {
  var e = document.getElementById("task_input");
  try {
    doAddNewTask(e.value);
  } catch (exception) {
    e.value = "";
    return;
  }
  window.close();
}
