//debugger
function isOnline() {
  if (navigator.onLine) {
    alert('online');
    return window.navigator.onLine
  } else {
    alert('offline');
    return window.navigator.offLine
  }
}


class News{
	constructor(title, descr, image){
		this.title = title;
		this.descr = descr;
		this.image = image;
	}
}

function getNews() {
    var news = new Array;
    var news_item = localStorage.getItem('news');
    if (news_item !== null) {
        news = JSON.parse(news_item);
    }
    return news;
}

function addNews(){
  var DEFAULT_IMAGE = "file:///D:/Web_labs/Lab8/nimg1.jpg"
  var title = document.getElementById("title");
  var descr = document.getElementById("description");
  var image = document.getElementById("user-image");
  if (title.value == ""){
    alert("Введіть заголовок!");
    return;
  }
  if (descr.value == ""){
    alert("Введіть опис статті!");
    return;
  }
  if(image.src == DEFAULT_IMAGE){
    alert("Виберіть фото для статті!");
    return;
  }
  var news = new News(title.value, descr.value, image.src);
  if(isOnline()){
		//
  } else {
  addToStorage(news);
  }
  alert('Новину додано!');
  title.value = "";
  descr.value = "";
  image.src = DEFAULT_IMAGE;
}

function addToStorage(newsItem){
	     var news = getNews();
    news.push(newsItem);
    localStorage.setItem('news', JSON.stringify(news));
    return false;
}


function loadPreviewPhoto(){
			var src = document.getElementById("userInputFile");
			var target = document.getElementById("user-image");
			var fr = new FileReader();
			fr.readAsDataURL(src.files[0]);
			fr.onload = function(e){
				target.src = this.result;
			};
}

function createNews(news){
	var element = document.getElementById("Row");
	element.innerHTML += '<div class="col-md-4 imgForNews"> <center><img src = "' + news.image + '" class="img-fluid" alt = "Тут повинне бути зображення"></center><center><h4>' + news.title + '</h4></center><p>'
	+ news.descr + '</p></div>'
}

function show(){
  	   var news = getNews();
    if ((typeof news !== 'undefined') && (news.length > 0)) {
  	    for(var i = 0; i < news.length; i++) {
      		createNews(news[i]);
	    }
	}
	if(isOnline()){
			localStorage.clear();
		 }
}

show();
