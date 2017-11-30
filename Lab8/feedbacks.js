debugger
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
      var feedbacks = getFeedbacks();
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    return false;
}

function getFeedbacks() {
    var feedbacks = new Array;
    var feedbackItem = localStorage.getItem('feedbacks');
    if (feedbackItem !== null) {
        feedbacks = JSON.parse(feedbackItem);
    }
    return feedbacks;
}

function show(){
  var feedbacks = getFeedbacks();
    if ((typeof feedbacks !== 'undefined') && (feedbacks.length > 0)) {
      for(var i = 0; i < feedbacks.length; i++) {
        createFeedback(feedbacks[i]);
      }
  }
  if(isOnline() == true){
    localStorage.clear()
  }
}

function addFeedback(){
  var comment = document.getElementById("comment");
  var name = document.getElementById("name");
  var date = new Date();
  /*var date = ""
  dateString = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getFullYear())
      + " " + date.getHours() + ":" + date.getMinutes();*/
  dateString = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getFullYear())
          + " " + date.getHours() + ":" + date.getMinutes();
  //
  if(name.value == ""){
    alert("Введіть ім'я!");
    return;
  }
  if(comment.value == ""){
    alert("Введіть відгук!");
    return;
  }
  var feedback = new Feedback(name.value, comment.value, dateString);
  if(!isOnline()){
    addToStorage(feedback);
  }
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
  //dateString = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getFullYear()) + " " + date.getHours() + ":" + date.getMinutes();
  var div = document.createElement("div");
  div.innerHTML += '<div class = "col-lg"><p><span class="h2 pull-left">' + feedback.name + " " + '</span><span>' + feedback.date + '</span></p><p>' + feedback.feedback + '</p></div><hr>';
  element.insertBefore(div, elem)
  /*var div = document.createElement("div");
  div.setAttribute("class", "col-lg", "forInsert");
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var span1 = document.createElement("span");
  span1.setAttribute("class", "h2 pull-left");
  var span2 = document.createElement("span");
  var dateString

  p2.innerHTML = comment;
  span1.innerHTML = name + " ";
  span2.innerHTML = dateString;
  p1.appendChild(span1);
  p1.appendChild(span2);
  div.appendChild(p1);
  div.appendChild(p2);
  element.insertBefore(div, elem);
  element.insertBefore(document.createElement("hr"), elem);*/
}
show();
