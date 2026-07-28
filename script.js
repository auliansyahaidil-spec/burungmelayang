body{

margin:0;

padding:0;

background:#6EC6FF;

font-family:Arial;

text-align:center;

overflow:hidden;

}

#menu{

margin-top:80px;

}

.logo{

width:180px;

}

button{

width:220px;

height:50px;

margin:10px;

font-size:20px;

border:none;

border-radius:15px;

background:#00AA44;

color:white;

cursor:pointer;

}

button:hover{

background:#008833;

}

.hidden{

display:none;

}

canvas{

display:none;

margin:auto;

background:#87CEEB;

border:5px solid white;

}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = {
    x: 100,
    y: 200,
    width: 40,
    height: 30,
    velocity: 0
};

let gravity = 0.5;
let jump = -8;

let pipes = [];
let score = 0;
let speed = 3;
let gameOver = false;

function startGame(){

    document.getElementById("gameArea").style.display="block";

    bird.y = 200;
    bird.velocity = 0;

    pipes = [];
    score = 0;
    gameOver = false;

    createPipe();

    requestAnimationFrame(updateGame);
}

function createPipe(){

    let gap = 150;

    let topHeight = Math.random()*200+50;

    pipes.push({
        x:800,
        top:topHeight,
        bottom:topHeight+gap,
        width:60
    });

}

function updateGame(){

    if(gameOver){
        alert("Game Over\nSkor : "+score);
        return;
    }

    ctx.clearRect(0,0,800,450);

    bird.velocity += gravity;
    bird.y += bird.velocity;

    ctx.fillStyle="yellow";
    ctx.fillRect(bird.x,bird.y,bird.width,bird.height);

    for(let i=0;i<pipes.length;i++){

        let p=pipes[i];

        p.x-=speed;

        ctx.fillStyle="green";

        ctx.fillRect(p.x,0,p.width,p.top);

        ctx.fillRect(p.x,p.bottom,p.width,450-p.bottom);

        if(
            bird.x+bird.width>p.x &&
            bird.x<p.x+p.width &&
            (bird.y<p.top || bird.y+bird.height>p.bottom)
        ){
            gameOver=true;
        }

        if(p.x+p.width==bird.x){

            score++;

            document.getElementById("score").innerText=score;

        }

    }

    if(pipes.length==0 || pipes[pipes.length-1].x<500){

        createPipe();

    }

    if(pipes[0].x<-60){

        pipes.shift();

    }

    if(bird.y<0 || bird.y>420){

        gameOver=true;

    }

    requestAnimationFrame(updateGame);

}

document.addEventListener("keydown",function(e){

    if(e.code=="Space"){

        bird.velocity=jump;

    }

});

canvas.addEventListener("click",function(){

    bird.velocity=jump;

});
<script src="game.js"></script>
function pilihLevel(level){

    if(level==1){
        speed=3;
    }

    if(level==2){
        speed=5;
    }

    if(level==3){
        speed=7;
    }

}
