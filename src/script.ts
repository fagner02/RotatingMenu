let angles = [];
let startingPoint = 30;
const elementNum = 5;

function start() {
  for (var i = 0; i < elementNum; i++) {
    let angle = startingPoint + (360 / elementNum) * i;

    var block = document.createElement("div");
    block.className = "block";
    block.style.transform = `rotate(${-angle}deg)`;

    var rotate = document.createElement("div");
    rotate.className = "rotate-box";
    rotate.id = `r${i}`;
    rotate.appendChild(block);
    rotate.style.transform = `rotate(${angle}deg)`;

    angles.push();
    (<HTMLElement>document.querySelector(".box")).appendChild(rotate);
    setupEventListeners(rotate);
  }
}

function setupEventListeners(rotate: HTMLElement) {
  rotate.addEventListener(
    "click",
    function (u, o: number) {
      console.log(u, o);
    }.bind(this, 8)
  );
}

start();
