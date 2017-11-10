function validateNews(){
  var DEFAULT_IMAGE = "file:///D:/Web_labs/Lab7/nimg1.jpg"
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
  title.value = "";
  descr.value = "";
  image.src = DEFAULT_IMAGE
}
function loadPreviewPhoto(event){
			var image = document.getElementById('user-image');
    	image.src = URL.createObjectURL(event.target.files[0]);
		}
