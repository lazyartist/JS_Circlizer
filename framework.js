function Framework(){
    this.canvas;
    this.canvasContext;

    this.keys = [];
    this.fps = 60;
    this.deltaTime = 1 / this.fps;

    // this.gravity = 9.8;
    this.gravity = 0;
    this.actors = [];

    this.playerActor = null;
}

Framework.prototype.init = function() {
    var thisFramework = this;
    var body = document.getElementById('body');
    body.onkeydown = function (e) {
        // console.log(e);
        // thisFramework.keys[e.code] = true; // 이 시점에 this는 body
        thisFramework.keys[e.keyCode] = true; // 이 시점에 this는 body
    }
    body.onkeyup = function (e) {
        // console.log(e);
        // thisFramework.keys[e.code] = false;
        thisFramework.keys[e.keyCode] = false;
    }

    this.canvas = document.getElementById('canvas');
    this.canvasContext = canvas.getContext('2d');

    this.playerActor = new CircleActor();

    this.actors.push(new ActorBase());
    this.actors.push(this.playerActor);

}

Framework.prototype.start = function(){
    var thisFramework = this;
    this.gameLoop.bind(this);
    window.setInterval(function (){
        thisFramework.gameLoop(); // 여기서 this는 window 객체를 가리키므로 Framwork의 this를 캡쳐하여 사용한다.
        // gameLoop();
    }, 1000 / this.fps);
}

Framework.prototype.isPressedKey = function(inKey) {
    const result = this.keys[inKey.charCodeAt(0)];
    // console.log(this.keys);
    return result;
}

Framework.prototype.getCanvasContext = function(inKey) {
    return this.canvasContext;
}

Framework.prototype.getDeltaTime = function() {
    return this.deltaTime;
}

Framework.prototype.getGravity = function() {
    return this.gravity;
}

Framework.prototype.updateInput = function() {
    var moveComponent = this.playerActor.getComponentByType(ComponentType_Move);
    if(null !== moveComponent)
    {
        moveComponent.updateSpeedByDirection(this);
    }
}

Framework.prototype.update = function() {
    this.actors.forEach(actor => actor.updateComponents(this));
}

Framework.prototype.render = function() {
    // clear canvas
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var thisFramework = this;
    this.actors.forEach(actor => actor.renderComponents(thisFramework));
}

Framework.prototype.gameLoop = function() {
    this.updateInput();
    this.update();
    this.render();
}
