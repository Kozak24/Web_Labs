//debugger
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
  var DEFAULT_IMAGE = "file:///D:/Web_labs/Lab9/nimg1.jpg"
  var imageForm = document.getElementById("userInputFile");
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
  //if(!isOnline()){
  addToStorage(news);
  //console.log(news);
  //}
  //alert('Новину додано!');
  title.value = "";
  descr.value = "";
  image.src = DEFAULT_IMAGE;
  imageForm.value = "";
}

function addToStorage(newsItem){
    if(useLocalStorage){
	     var news = getNews();
       news.push(newsItem);
       localStorage.setItem('news', JSON.stringify(news));
       return false;
    }
    else {
      var openDB = indexedDB.open("news", 1);

      openDB.onupgradeneeded = function() {
        var db = openDB.result;
        var store = db.createObjectStore("news", {keyPath: "title"});
        store.createIndex("title", "title", {unique: false});
        store.createIndex("descr", "descr", {unique: false});
        store.createIndex("image", "image", {unique: false});
      };
      openDB.onerror = function(event) {
        alert("Error when adding feedback to DataBase");
      };

      openDB.onsuccess = function(event) {
        var db = openDB.result;
        var trans = db.transaction(["news"], "readwrite");
        var store = trans.objectStore("news");
        var add = store.put(newsItem);
        add.onsuccess = function(event){
          alert("News added");
        }
        add.onerror = function(event){
          alert("Error when adding Feedback");
        }
        trans.oncomplete = function(){
          db.close();
        }
    };

  }
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
  if(useLocalStorage){
		var news = new Array;
	    var news_item = localStorage.getItem('news');
	    if (news_item !== null) {
	        news = JSON.parse(news_item);
	    }
	    if ((typeof news !== 'undefined') && (news.length > 0)) {
		    for(var i = 0; i < news.length; i++) {
	    		createNews(news[i]);
		    }
}
  // if(isOnline()){
  // 		localStorage.clear();
  // 	 }
 } else {
   var openDB = indexedDB.open("news", 1);
   openDB.onupgradeneeded = function(){
     var db = openDB.result;
     var store = db.createObjectStore("news", {keyPath: "title"});
     store.createIndex("title", "title", {unique: false});
     store.createIndex("descr", "descr", {unique: false});
     store.createIndex("image", "image", {unique: false});
   }
   openDB.onsuccess = function(event){
     var db = openDB.result;
     var trans = db.transaction("news", "readwrite");
     var store = trans.objectStore("news");
     store.openCursor().onsuccess = function(event){
       var cursor = event.target.result;
       if (cursor){
         var tempNews = new News (cursor.value.title, cursor.value.descr, cursor.value.image);
         createNews(tempNews);
         var request = db.transaction(["news"], "readwrite").objectStore("news").delete(cursor.primaryKey);
         cursor.continue();
       }
     };
     trans.oncomplete = function(){
       db.close();
     }
   }
 }
}
