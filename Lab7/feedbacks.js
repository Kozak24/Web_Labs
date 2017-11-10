function validateForm() {
  //debugger;
    var comment = document.getElementById("comment");
    var name = document.getElementById("name");
    if(name.value == ""){
      alert("Введіть ім'я!");
      return;
    }
    if(comment.value == ""){
      alert("Введіть відгук!");
      return;
    }
    var element = document.getElementById("feedbacksID");
    var elem = document.getElementById("forInsert")
    var div = document.createElement("div");
    div.setAttribute("class", "col-lg");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var span1 = document.createElement("span");
    span1.setAttribute("class", "h2 pull-left");
    var span2 = document.createElement("span");
    var dateString = "";
    var date = new Date();
    dateString = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getFullYear())
				+ " " + date.getHours() + ":" + date.getMinutes();
    p2.innerHTML = comment.value;
    span1.innerHTML = name.value + " ";
    span2.innerHTML = dateString;
    p1.appendChild(span1);
    p1.appendChild(span2);
    div.appendChild(p1);
    div.appendChild(p2);
    element.insertBefore(div, elem);
    name.value = "";
    comment.value = "";
}
