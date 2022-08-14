var initial = null;
var startingPoint = 30;
var animationTimers = [];
var elementNum = 5;
function start() {
    for (var i = 0; i < elementNum; i++) {
        var color = (360 / elementNum) * i;
        var angle = startingPoint + color;
        var block = document.createElement("div");
        block.className = "block";
        block.style.transform = "rotate(".concat(-angle, "deg)");
        block.style.backgroundColor = "hsl(".concat(color, ", 80%, 60%)");
        var rotate = document.createElement("div");
        rotate.className = "rotate-box";
        rotate.id = "r".concat(i);
        rotate.appendChild(block);
        rotate.style.transform = "rotate(".concat(angle, "deg)");
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
        do {
            oldAngle = parseFloat(element.style.transform.replace("rotate(", ""));
            var angle = oldAngle + direction;
            var child = element.firstElementChild;
            element.style.transition = "all 2s ease-in";
            child.style.transition = "all 2s ease-in";
            element.style.transform = "rotate(".concat(angle, "deg)");
            child.style.transform = "rotate(".concat(-angle, "deg)");
            // child.style.filter = `blur(${pos}px)`;
            var timeout = setTimeout(function (funcElement, funcChild, funcAngle) {
                funcElement.style.transition = "any";
                funcChild.style.transition = "any";
                funcAngle = funcAngle < 0 ? 360 + funcAngle : funcAngle;
                funcElement.style.transform = "rotate(".concat(funcAngle % 360, "deg)");
                funcChild.style.transform = "rotate(".concat(-(funcAngle % 360), "deg)");
            }.bind(this, element, child, angle), 2000);
            animationTimers.push(timeout);
            pos++;
            i = (elementNum + i - 1) % elementNum;
            element = document.querySelector("#r".concat(i));
        } while (i != index);
        initial = rotate;
    }.bind(this, 8));
}
start();
//# sourceMappingURL=script.js.map