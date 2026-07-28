// НЕОНОВЫЙ КУРСОР

const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

let posX = 0;
let posY = 0;

document.addEventListener("mousemove",(e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateCursor(){

    posX += (mouseX-posX)*0.15;
    posY += (mouseY-posY)*0.15;

    cursor.style.left = posX+"px";
    cursor.style.top = posY+"px";

    requestAnimationFrame(animateCursor);

}

animateCursor();


// ЧАСТИЦЫ

document.addEventListener("mousemove",e=>{

    const particle=document.createElement("span");

    particle.className="particle";

    particle.style.left=e.clientX+"px";

    particle.style.top=e.clientY+"px";

    const size=Math.random()*10+6;

    particle.style.width=size+"px";
    particle.style.height=size+"px";

    document.body.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },1000);

});


// ПАРАЛЛАКС

document.addEventListener("mousemove",(e)=>{

    const x=(window.innerWidth/2-e.clientX)/60;
    const y=(window.innerHeight/2-e.clientY)/60;

    document.querySelector(".photo").style.transform=
    `translate(${x}px,${y}px)`;

});
/* ===========================
   ЗВЁЗДЫ
=========================== */

const stars = document.getElementById("stars");

for(let i=0;i<250;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"%";

    star.style.top=Math.random()*100+"%";

    star.style.animationDuration=(2+Math.random()*5)+"s";

    star.style.opacity=Math.random();

    stars.appendChild(star);

}

/* ===========================
ПОЯВЛЕНИЕ БЛОКОВ
=========================== */

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

sections.forEach(section=>{

const pos=section.getBoundingClientRect().top;

if(pos<window.innerHeight-120){

section.classList.add("show");

}

});

});
/*=========================
CANVAS BACKGROUND
=========================*/

const canvas=document.getElementById("bg");

const ctx=canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

const particles=[];

for(let i=0;i<40;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

vx:(Math.random()-0.5)*0.4,

vy:(Math.random()-0.5)*0.4,

r:Math.random()*3+1

});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let p of particles){

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle="rgba(0,255,255,.8)";

ctx.shadowColor="#00ffff";

ctx.shadowBlur=20;

ctx.fill();

}

for(let i=0;i<particles.length;i++){

for(let j=i+1;j<particles.length;j++){

const dx=particles[i].x-particles[j].x;

const dy=particles[i].y-particles[j].y;

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<140){

ctx.beginPath();

ctx.moveTo(particles[i].x,particles[i].y);

ctx.lineTo(particles[j].x,particles[j].y);

ctx.strokeStyle="rgba(0,255,255,"+(1-dist/140)/3+")";

ctx.stroke();

}

}

}

requestAnimationFrame(draw);

}

draw();