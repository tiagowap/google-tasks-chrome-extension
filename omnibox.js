chrome.omnibox.onInputEntered.addListener(function(text) {
  addTask({title: text});
});
