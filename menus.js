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

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  console.log("task: " + info["selectionText"]);
}

function temporaryAddTaskClickHandler(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  var text = info["selectionText"];
  // var notes = info["pageUrl"]
  addTask({title: text});
}

// Create one test item for each context type.
var contexts = ["selection"];
var context = "selection";
var title = "Create Task from selection"
var id = chrome.contextMenus.create({"title": title, "contexts": ["selection"], "onclick": temporaryAddTaskClickHandler});
console.log("'" + context + "' item:" + id);
