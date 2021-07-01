function preload(){}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(560, 200);
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.position(100,200);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getPoses);
}

function draw(){
    background('#0000FF');
}

function modelLoaded(){
    console.log("Model is good and ready to activate!");
}

function getPoses(){
    if(results.length > 0){
        console.log(results);
    }
}
