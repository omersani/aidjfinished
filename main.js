song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX =0;
rightWristY =0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

song1status = "";
song2status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(650, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('Posenet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    

    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
       circle(leftWristX, leftWristY, 20);
       song2.stop();
       if(song1status == false)
       {
         song1.play();
         document.getElementById("heading").innerHTML = "song1 is playing";
       }
    }
    if(scoreRightWrist > 0.2)
    {
       circle(rightWristX, rightWristY, 20);
       song1.stop();
       if(song2status == false)
       {
         song2.play();
         document.getElementById("heading").innerHTML = "song2 is playing";
       }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

       rightWristX = results[0].pose.leftWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

       scoreLeftWrist = results[0].pose.keypoints[9].score;
       console.log("scoreLeftWrist = " + scoreLeftWrist);
       scoreRightWrist = results[0].pose.keypoints[10].score;
       console.log("scoreRightWrist = " + scoreRightWrist);
       
    }
}