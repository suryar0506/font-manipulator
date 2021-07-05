var noseX = 0;
var noseY = 0;

var rightWristX = 0;
var rightWristY = 0;
var leftWristX = 0;
var leftWristY = 0;
var difference = 0;

var leftEyeX = 0;
var rightEyeX = 0;
var leftEyeY = 0;
var rightEyeY = 0;
var difference2 = 0;

var name = "";

function preload(){}

function setup(){
    canvas = createCanvas(800, 400);
    canvas.position(560, 200);

    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-oaRz7P2w/model.json',model2Loaded);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getPoses);
}

function draw(){
    background('#0000FF');
    image(video, 0, 0, 400, 400);
    classifier.classify(video, getEffects);
    textSize(difference);
    fill(leftEyeX, rightEyeY, difference2);
    text(name, noseX, noseY);
    fill('red');
    stroke('red');
    circle(noseX-120, noseY-50, 10);

    circle(leftEyeX-130, leftEyeY-45, 10);
    circle(rightEyeX-120, rightEyeY-45, 10);

    circle(leftWristX-150,leftWristY-300, 10);
    circle(rightWristX-80,rightWristY-300, 10);
}

function modelLoaded(){
    console.log("Model is good and ready to activate!");
}

function model2Loaded(){
    console.log("Model is good, so stop bothering me!");
}

function getPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        difference = floor(leftWristX - rightWristX);
        document.getElementById("size_display").innerHTML = difference;

        leftEyeX = results[0].pose.leftEye.x;
        leftEyeY = results[0].pose.leftEye.y;

        rightEyeX = results[0].pose.rightEye.x;
        rightEyeY = results[0].pose.rightEye.y;

        difference2 = floor(leftEyeX - rightEyeX);
    }
}

function getEffects(error, effects){
if (error){
console.error(error);
} else {
    console.log(effects);
    name = effects[0].label;
}
}
