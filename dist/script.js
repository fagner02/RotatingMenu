var initial = null;
var startingPoint = 0;
var radius = 200;
var blockSize = 50;
var animationTimers = [];
var elementNum = 5;
var transitionTime = 1000;
var transition = "all ".concat(transitionTime, "ms cubic-bezier(0.9, 2.1, 0.8, 1)");
function start() {
    var imgs = [
        "gradient.png",
        "layers.png",
        "pen-tool.png",
        "performance.png",
        "web-design.png",
    ];
    for (var i = 0; i < elementNum; i++) {
        var color = (360 / elementNum) * i;
        var angle = startingPoint + color;
        var img = document.createElement("img");
        img.width = 50;
        img.height = 50;
        img.src = imgs[i];
        var block = document.createElement("div");
        block.className = "block";
        block.style.transform = "rotate(".concat(-angle, "deg)");
        // block.style.backgroundColor = `hsl(${color}, 80%, 60%)`;
        block.appendChild(img);
        var rotate = document.createElement("div");
        rotate.className = "rotate-box";
        rotate.id = "r".concat(i);
        rotate.appendChild(block);
        rotate.style.transform = "rotate(".concat(angle, "deg)");
        var half = Math.floor(elementNum / 2) + 1;
        var blur_1 = i >= half ? elementNum - i : i;
        blur_1 %= half;
        blur_1 *= 2;
        block.style.filter = "blur(".concat(blur_1, "px)");
        document.querySelector(".box").appendChild(rotate);
        setupEventListeners(rotate);
    }
}
function setupEventListeners(rotate) {
    rotate.addEventListener("click", function () {
        if (animationTimers.length > 0) {
            animationTimers.forEach(function (x) { return window.clearTimeout(x); });
            animationTimers = [];
        }
        var index = parseInt(rotate.id.replace("r", ""));
        var i = index;
        var element = rotate;
        initial !== null && initial !== void 0 ? initial : (initial = document.querySelector("#r0"));
        var oldAngle = parseFloat(element.style.transform.replace("rotate(", ""));
        var targetAngle = parseFloat(initial.style.transform.replace("rotate(", ""));
        var left = -(Math.abs(oldAngle) - targetAngle);
        var right = 360 - (Math.abs(oldAngle) - targetAngle);
        var direction = Math.abs(left) < Math.abs(right) ? left : right;
        var pos = 0;
        var half = Math.floor(elementNum / 2) + 1;
        do {
            oldAngle = parseFloat(element.style.transform.replace("rotate(", ""));
            var angle = oldAngle + direction;
            var child = element.firstElementChild;
            element.style.transition = transition;
            child.style.transition = transition;
            element.style.transform = "rotate(".concat(angle, "deg)");
            child.style.transform = "rotate(".concat(-angle, "deg)");
            var blur_2 = pos >= half ? elementNum - pos : pos;
            blur_2 %= half;
            blur_2 *= 2;
            child.style.filter = "blur(".concat(blur_2, "px)");
            var timeout = setTimeout(function (funcElement, funcChild, funcAngle) {
                funcElement.style.transition = "any";
                funcChild.style.transition = "any";
                funcAngle = funcAngle < 0 ? 360 + funcAngle : funcAngle;
                funcElement.style.transform = "rotate(".concat(funcAngle % 360, "deg)");
                funcChild.style.transform = "rotate(".concat(-(funcAngle % 360), "deg)");
            }.bind(this, element, child, angle), transitionTime);
            animationTimers.push(timeout);
            pos++;
            i = (elementNum + i - 1) % elementNum;
            element = document.querySelector("#r".concat(i));
        } while (i != index);
        initial = rotate;
    });
}
start();
//# sourceMappingURL=script.js.map