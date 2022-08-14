let initial: HTMLElement = null;
let startingPoint = 0;
let radius = 200;
let blockSize = 50;
let animationTimers: number[] = [];
const elementNum = 5;
const transitionTime = 1000;
const transition = `all ${transitionTime}ms cubic-bezier(0.9, 2.1, 0.8, 1)`;

function start() {
  let imgs = [
    "gradient.png",
    "layers.png",
    "pen-tool.png",
    "performance.png",
    "web-design.png",
  ];
  for (var i = 0; i < elementNum; i++) {
    let color = (360 / elementNum) * i;
    let angle = startingPoint + color;
    let img = document.createElement("img");
    img.width = 50;
    img.height = 50;
    img.src = imgs[i];

    var block = document.createElement("div");
    block.className = "block";
    block.style.transform = `rotate(${-angle}deg)`;
    // block.style.backgroundColor = `hsl(${color}, 80%, 60%)`;
    block.appendChild(img);
    var rotate = document.createElement("div");
    rotate.className = "rotate-box";
    rotate.id = `r${i}`;
    rotate.appendChild(block);
    rotate.style.transform = `rotate(${angle}deg)`;

    let half = Math.floor(elementNum / 2) + 1;
    let blur = i >= half ? elementNum - i : i;
    blur %= half;
    blur *= 2;
    block.style.filter = `blur(${blur}px)`;

    (<HTMLElement>document.querySelector(".box")).appendChild(rotate);
    setupEventListeners(rotate);
  }
}

function setupEventListeners(rotate: HTMLElement) {
  rotate.addEventListener("click", function () {
    if (animationTimers.length > 0) {
      animationTimers.forEach((x) => window.clearTimeout(x));
      animationTimers = [];
    }

    let index: number = parseInt(rotate.id.replace("r", ""));
    let i = index;
    let element = rotate;
    initial ??= document.querySelector("#r0");
    let oldAngle = parseFloat(element.style.transform.replace("rotate(", ""));
    let targetAngle = parseFloat(
      initial.style.transform.replace("rotate(", "")
    );
    let left = -(Math.abs(oldAngle) - targetAngle);
    let right = 360 - (Math.abs(oldAngle) - targetAngle);
    let direction = Math.abs(left) < Math.abs(right) ? left : right;
    let pos = 0;
    let half = Math.floor(elementNum / 2) + 1;

    do {
      oldAngle = parseFloat(element.style.transform.replace("rotate(", ""));
      let angle = oldAngle + direction;

      let child = <HTMLElement>element.firstElementChild;

      element.style.transition = transition;
      child.style.transition = transition;

      element.style.transform = `rotate(${angle}deg)`;
      child.style.transform = `rotate(${-angle}deg)`;

      let blur = pos >= half ? elementNum - pos : pos;
      blur %= half;
      blur *= 2;
      child.style.filter = `blur(${blur}px)`;

      let timeout = setTimeout(
        function (
          funcElement: HTMLElement,
          funcChild: HTMLElement,
          funcAngle: number
        ) {
          funcElement.style.transition = "any";
          funcChild.style.transition = "any";

          funcAngle = funcAngle < 0 ? 360 + funcAngle : funcAngle;
          funcElement.style.transform = `rotate(${funcAngle % 360}deg)`;
          funcChild.style.transform = `rotate(${-(funcAngle % 360)}deg)`;
        }.bind(this, element, child, angle),
        transitionTime
      );
      animationTimers.push(timeout);
      pos++;
      i = (elementNum + i - 1) % elementNum;
      element = document.querySelector(`#r${i}`);
    } while (i != index);

    initial = rotate;
  });
}

start();
