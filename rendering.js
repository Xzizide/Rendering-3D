const canvas = document.getElementById('render_screen');
const ctx = canvas.getContext('2d');
ctx.translate(canvas.width/2,canvas.height/2);
ctx.fillStyle = "rgb(255,255,0)";

let pointsF = [[-100,-100,-100],[-100,100,-100],[100,100,-100],[100,-100,-100],[-100,-100,100],[-100,100,100],[100,100,100],[100,-100,100]];
let angle = 0;
oldMX = 0;
oldMY = 0;

clicked = false;

function start(event){
    x = event.clientX;
    y = event.clientY;
    draw(x,y);
}

function animateBox(){
    if(!clicked){
        interval = setInterval(draw,10);
        clicked = true;
    }
    else{
        clearInterval(interval);
        clicked = false;
    }
}

function draw(mX = 0,mY = 0){
    ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);

    if(mX != 0 && mY != 0){   
        tempMX = mX;
        tempMY = mY;
        Xangle = (mX - oldMX) * 0.01;
        Yangle = (mY - oldMY) * -0.01;
        angle = 0;
    }
    else{
        Yangle = 0.01;
        Xangle = 0.01;
        angle = 0.01;
    }

    ctx.beginPath();
    pointsF = rotation_coordinates(pointsF, Yangle, "X");
    pointsF = rotation_coordinates(pointsF, Xangle, "Y");
    pointsF = rotation_coordinates(pointsF, angle, "Z");

    smallestZ = 0;
    coordinate = 0;
    for(i = 0; i < 8; i++){
        if(pointsF[i][2] < coordinate){
            smallestZ = i;
            coordinate = pointsF[i][2];
        }
    }
    //side1
    if(smallestZ != 0 && smallestZ != 1 && smallestZ != 2 && smallestZ != 3){
        ctx.moveTo(pointsF[0][0], pointsF[0][1]);
        ctx.lineTo(pointsF[1][0], pointsF[1][1]);
        ctx.lineTo(pointsF[2][0], pointsF[2][1]);
        ctx.lineTo(pointsF[3][0], pointsF[3][1]);
        ctx.lineTo(pointsF[0][0], pointsF[0][1]);
        ctx.fill();
        ctx.stroke();
    }
    //side2
    if(smallestZ != 1 && smallestZ != 5 && smallestZ != 4 && smallestZ != 0){
        ctx.moveTo(pointsF[0][0], pointsF[0][1]);
        ctx.lineTo(pointsF[1][0], pointsF[1][1]);
        ctx.lineTo(pointsF[5][0], pointsF[5][1]);
        ctx.lineTo(pointsF[4][0], pointsF[4][1]);
        ctx.lineTo(pointsF[0][0], pointsF[0][1]);
        ctx.fill();
        ctx.stroke();
    }
    //side3
    if(smallestZ != 3 && smallestZ != 7 && smallestZ != 4 && smallestZ != 0){
        ctx.moveTo(pointsF[0][0], pointsF[0][1]);
        ctx.lineTo(pointsF[3][0], pointsF[3][1]);
        ctx.lineTo(pointsF[7][0], pointsF[7][1]);
        ctx.lineTo(pointsF[4][0], pointsF[4][1]);
        ctx.lineTo(pointsF[0][0], pointsF[0][1]);
        ctx.fill();
        ctx.stroke();
    }
    //side4
    if(smallestZ != 6 && smallestZ != 7 && smallestZ != 4 && smallestZ != 5){
        ctx.moveTo(pointsF[6][0], pointsF[6][1]);
        ctx.lineTo(pointsF[7][0], pointsF[7][1]);
        ctx.lineTo(pointsF[4][0], pointsF[4][1]);
        ctx.lineTo(pointsF[5][0], pointsF[5][1]);
        ctx.lineTo(pointsF[6][0], pointsF[6][1]);
        ctx.fill();
        ctx.stroke();
    }
    //side5
    if(smallestZ != 6 && smallestZ != 7 && smallestZ != 3 && smallestZ != 2){
        ctx.moveTo(pointsF[6][0], pointsF[6][1]);
        ctx.lineTo(pointsF[7][0], pointsF[7][1]);
        ctx.lineTo(pointsF[3][0], pointsF[3][1]);
        ctx.lineTo(pointsF[2][0], pointsF[2][1]);
        ctx.lineTo(pointsF[6][0], pointsF[6][1]);
        ctx.fill();
        ctx.stroke();
    }
    //side6
    if(smallestZ != 6 && smallestZ != 2 && smallestZ != 1 && smallestZ != 5){
        ctx.moveTo(pointsF[6][0], pointsF[6][1]);
        ctx.lineTo(pointsF[2][0], pointsF[2][1]);
        ctx.lineTo(pointsF[1][0], pointsF[1][1]);
        ctx.lineTo(pointsF[5][0], pointsF[5][1]);
        ctx.lineTo(pointsF[6][0], pointsF[6][1]);
        ctx.fill();
        ctx.stroke();
    }

    if(mX != 0 && mY != 0){
        oldMX = tempMX;
        oldMY = tempMY;
    }
}

function rotation_coordinates(point_array, angle_th, axis){
    for(i = 0; i < point_array.length; i++){
        temp_x = point_array[i][0];
        temp_y = point_array[i][1];
        temp_z = point_array[i][2];

        if(axis == "X"){
            point_array[i][1] = (temp_y * Math.cos(angle_th) - temp_z * Math.sin(angle_th));
            point_array[i][2] = (temp_y * Math.sin(angle_th) + temp_z * Math.cos(angle_th));
        }
        if(axis == "Y"){
            point_array[i][0] = (temp_x * Math.cos(angle_th) + temp_z * Math.sin(angle_th));
            point_array[i][2] = (-temp_x * Math.sin(angle_th) + temp_z * Math.cos(angle_th));
        }
        if(axis == "Z"){
            point_array[i][0] = (temp_x * Math.cos(angle_th) - temp_y * Math.sin(angle_th));
            point_array[i][1] = (temp_x * Math.sin(angle_th) + temp_y * Math.cos(angle_th));
        }
        
    }
    return point_array;
}