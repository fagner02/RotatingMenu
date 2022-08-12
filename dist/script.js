var angles = [];
var startingPoint = 30;
var elementNum = 5;
function start() {
    for (var i = 0; i < elementNum; i++) {
        var angle = startingPoint + (360 / elementNum) * i;
        var block = document.createElement("div");
        block.className = "block";
        block.style.transform = "rotate(".concat(-angle, "deg)");
        var rotate = document.createElement("div");
        rotate.className = "rotate-box";
        rotate.id = "r".concat(i);
        rotate.appendChild(block);
        rotate.style.transform = "rotate(".concat(angle, "deg)");
        angles.push();
        document.querySelector(".box").appendChild(rotate);
        setupEventListeners(rotate);
    }
}
function setupEventListeners(rotate) {
    rotate.addEventListener("click", function (u, o) {
        console.log(u, o);
    }.bind(this, 8));
}
start();
//# sourceMappingURL=script.js.map