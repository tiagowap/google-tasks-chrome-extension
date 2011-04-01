function addDone(resp, xhr) {
  var logo;
  var notificationTitle;

  // TODO: redirect to login UI flow and retry
  if (xhr.status != 200) {
    notificationTitle = 'addTask request failed: HTTP ' + xhr.status;
    logo = 'images/tasks-error-48x48.png';
    //notificationTitle = "Adding task failed!";
  }
  else {
    logo = 'images/tasks-48x48.png';
    notificationTitle = 'Task added successfully!';
  }
  var notification = webkitNotifications.createNotification(logo,
      notificationTitle, "");
  notification.show();
}

function addTask(task) {
    var url = "https://www.googleapis.com/tasks/v1/lists/@default/tasks";
    var req = {
      'method': 'POST',
      'headers': {
        "Content-type": "application/json"
      },
      'body': JSON.stringify(task)
    };
    oauth.sendSignedRequest(url, addDone, req);
}

function getTasks(cb) {
    var url = "https://www.googleapis.com/tasks/v1/lists/@default/tasks";
    var req = {
      'method': 'GET',
      'headers': {
        "Content-type": "application/json"
      },
    };

    var getDone = function(resp, xhr) {
      if (xhr.status != 200) {
                // TODO: redirect to login UI flow and retry
                console.log('addTask request failed: HTTP ' + xhr.status);
                console.log(resp);
          }

          cb.call(this, JSON.parse(resp));
        }

    oauth.sendSignedRequest(url, getDone, req);
}
