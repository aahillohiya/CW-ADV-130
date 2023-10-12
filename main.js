song = "";
right_wrist_X = "";
left_wrist_X = "";
right_wrist_Y = "";
left_wrist_Y = "";
Score_Left_Wrist = 0;
Score_Right_Wrist = 0;


function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {
    image(video,0,0,600,500);

    fill("red");
    stroke("red");
if (Score_Left_Wrist > 0.2) {
        circle(left_wrist_X,left_wrist_Y,20);
        left_wrist_Y_whole_number = floor(Number(left_wrist_Y));
        volume = left_wrist_Y_whole_number/500 ;
        document.getElementById("Volume").innerHTML = "Volume :-> " + volume ; 
        song.setVolume(volume);
    }
if (Score_Right_Wrist > 0.2) {

    circle(right_wrist_X,right_wrist_Y,20);

    if (right_wrist_Y > 0 && right_wrist_Y <= 100) {
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed :-> 0.5"; 

    }
    else if (right_wrist_Y > 100 && right_wrist_Y <= 200) {
             song.rate(1);
             document.getElementById("speed").innerHTML = "Speed :-> 1"; 

    }
    else if (right_wrist_Y > 200 && right_wrist_Y <= 300) {
             song.rate(1.5);
             document.getElementById("speed").innerHTML = "Speed :-> 1.5"; 

    }
    else if (right_wrist_Y > 300 && right_wrist_Y <= 400) {
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed :-> 2"; 

    }
    else if (right_wrist_Y > 400) {
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "Speed :-> 2.5"; 

    }
}




}

function PLAY() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model is Loaded");    
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        right_wrist_X = results[0].pose.rightWrist.x ; 
        right_wrist_Y = results[0].pose.rightWrist.y ;
        left_wrist_X = results[0].pose.leftWrist.x ;
        left_wrist_Y = results[0].pose.leftWrist.y ;

        Score_Left_Wrist = results[0].pose.keypoints[9].score ; 
        Score_Right_Wrist = results[0].pose.keypoints[10].score ; 


        console.log("Right Wrist X",right_wrist_X,"Right Wrist Y",right_wrist_Y,"Left Wrist X",left_wrist_X,"Left Wrist Y",left_wrist_Y);

}
}
