//debugger
//var useLocalStorage = true;
var useLocalStorage = false;

function isOnline() {
  if (navigator.onLine) {
    alert('online');
    return window.navigator.onLine
  } else {
    alert('offline');
    return window.navigator.offLine
  }
}


class Feedback{
	constructor(name, feedback, date){
		this.name = name;
		this.feedback = feedback;
		this.date = date;
	}
}

function addToStorage(feedback){
  if(useLocalStorage){
      var feedbackItem = localStorage.getItem('feedbacks');
      if (feedbackItem !== null) {
          feedbacks = JSON.parse(feedbackItem);
        }
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    return false;
  }
  else{
    var openDB = indexedDB.open("feedback", 1);

    openDB.onerror = function(event){
      alert("Error when adding feedback to DataBase")
    };
    openDB.onsuccess = function(event){
      var db = openDB.result;
      var trans = db.transaction(["feedbacks"], "readwrite");
      var store = trans.objectStore("feedbacks");
      var addFeedback = store.put(feedback);
      addFeedback.onsuccess = function(event){
        alert("Feedback added");
      }
      addFeedback.onerror = function(event){
        alert("Error when adding Feedback")
      }
      trans.oncomplete = function(){
        db.close();
      }
    };
  }
}


function show(){
  if(useLocalStorage){
      var feedbackItem = localStorage.getItem('feedbacks');
      if (feedbackItem !== null) {
          feedbacks = JSON.parse(feedbackItem);
        }
    if ((typeof feedbacks !== 'undefined') && (feedbacks.length > 0)) {
      for(var i = 0; i < feedbacks.length; i++) {
        createFeedback(feedbacks[i]);
      }
    }
    if(isOnline() == true){
      localStorage.clear()
    }
  }
  else{
    var openDB = indexedDB.open("feedback", 1);
    openDB.onupgradeneeded = function() {
      var db = openDB.result;
      var store = db.createObjectStore("feedbacks", {keyPath: "name"});
      store.createIndex("name", "name", {unique: false});
      store.createIndex("feedback", "feedback", {unique: false});
      store.createIndex("date", "date", {unique: false});
    }
    openDB.onsuccess = function(event){
      var db = openDB.result;
      var trans = db.transaction("feedbacks", "readwrite");
    var store = trans.objectStore("feedbacks");
    store.openCursor().onsuccess = function(event){
        var cursor = event.target.result;
        if (cursor) {
          var tempFeed = new Feedback(cursor.value.name, cursor.value.feedback, cursor.value.date);
          createFeedback(tempFeed);
          cursor.continue();
      }
    }
    trans.oncomplete = function(){
      db.close();
    }
    }
  }
}

function addFeedback(){
  var comment = document.getElementById("comment");
  var name = document.getElementById("name");
  var date = new Date();
  dateString = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getFullYear())
          + " " + date.getHours() + ":" + date.getMinutes();
  if(name.value == ""){
    alert("Введіть ім'я!");
    return;
  }
  if(comment.value == ""){
    alert("Введіть відгук!");
    return;
  }
  var feedback = new Feedback(name.value, comment.value, dateString);
  /*if(!isOnline()){
    addToStorage(feedback);
  }*/
  addToStorage(feedback);
  createFeedback(feedback);
  name.value = "";
  comment.value = "";
}

function createFeedback(feedback){
  var element = document.getElementById("feedbacksID");
  var elem = document.getElementById("forInsert");

  var date = feedback.date;
  var name = feedback.name;
  var comment = feedback.feedback;
  var div = document.createElement("div");
  div.innerHTML += '<div class = "col-lg"><p><span class="h2 pull-left">' + feedback.name + " " + '</span><span>' + feedback.date + '</span></p><p>' + feedback.feedback + '</p></div><hr>';
  element.insertBefore(div, elem)

}
show();
