status = "";
video = "";
object=[];

function preload(){
  video = createVideo('video.mp4');
  video.hide();
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}
function gotresult(error,results){
if(error){
console.log(error);
}
else{
console.log(results);
object=results;
}

function draw() {
  image(video, 0, 0, 480, 380);
  if(status != ""){
  objectDetector.detect(video,gotresult);
  for(i=0; i<object.length; i++){
    document.getElementById("status").innerHTML="Status:Object Detected";
        document.getElementById("nofobjects").innerHTML="Number of objects detected are: "+object.length;
     fill("#FF0000");
     p=floor(object[i].confidence*100);
     text(object[i].label+ " "+p+"%",object[i].x+15,object[i].y+15);
     noFill();
     stroke("#FF0000");
     rect(object[i].x,object[i].y,object[i].width,object[i].height);
  
  }
  }
}

