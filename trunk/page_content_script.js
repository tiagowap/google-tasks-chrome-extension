function getCurrentSelectionText() {
  var selectionText = window.getSelection().toString();

  chrome.extension.sendRequest({
    type: 'selectionResult',
    selection: selectionText,
  }, function() { });
  console.log("sent selection results");
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  console.log("on request");
  switch (request.type) {
    case 'getSelectionText':
	  console.log("get request of getSelectionText");
      getCurrentSelectionText();
      break;
  }
});
