// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
