// CComponent
var ComponentType_Base = "ComponentType_Base";
var ComponentType_Move = "ComponentType_Move";
var ComponentType_Shape = "ComponentType_Shape";
var ComponentType_Physics = "ComponentType_Physics";

// ComponentBase
function ComponentBase(inType, inActor) {
    this.type = inType;
    this.actor = inActor;
    // Component.prototype.actor = inActor; // 모든 인스턴스가 공유하는 객체가 된다.

    // console.log(this.type, this.actor);
}

ComponentBase.prototype.getType = function (inType) {
    return this.type;
}

ComponentBase.prototype.getActor = function () {
    return this.actor;
}

ComponentBase.prototype.update = function () {
    // need override
}

ComponentBase.prototype.render = function () {
    // need override
}

// MoveComponent
function MoveComponent(inActor) {
    ComponentBase.call(this, ComponentType_Move, inActor);

    this.position = {x: 0, y: 0}; // todo move to actor
    this.speedPerSecond = { x: 50, y: 50 };
    this.speed = { x: 0, y: 0 };
}
MoveComponent.prototype = Object.create(ComponentBase.prototype); // 상속

MoveComponent.prototype.update = function (inFramework) {
    // Component.prototype.update.call(this);

    var gravity = inFramework.getGravity();
    var deltaTime = inFramework.getDeltaTime();

    this.updateSpeedByDirection(inFramework);

    this.speed.y += gravity * deltaTime;

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
}

MoveComponent.prototype.clearSpeed = function () {
    this.speed = { x: 0, y: 0 };
}

MoveComponent.prototype.updateSpeedByDirection = function (inFramework) {
    // e.keyCode(e.code)는 대소문자 구분없이 같다.
    // A a:65, D d:68, W w:87, S s:83, space:32

    if (inFramework.isPressedKey("A")) {
        this.speed.x = this.speedPerSecond.x * -1;
    }

    if (inFramework.isPressedKey("D")) {
        this.speed.x = this.speedPerSecond.x;
    }

    if (inFramework.isPressedKey("W")) {
        this.speed.y = this.speedPerSecond.y * -1;
    }

    if (inFramework.isPressedKey("S")) {
        this.speed.y = this.speedPerSecond.y;
    }

    this.speed.x *= inFramework.getDeltaTime();
    this.speed.y *= inFramework.getDeltaTime();
}

MoveComponent.prototype.getPosition = function() {
    return this.position;
}

MoveComponent.prototype.isPressedKey = function(inkeys, inKey) {
    const result = inkeys[inKey.charCodeAt(0)];
    return result;
}

// ShapeComponent
function ShapeComponent(inActor) {
    ComponentBase.call(this, ComponentType_Shape, inActor);

    this.size = { x: 10, y: 10 };
}
ShapeComponent.prototype = Object.create(ComponentBase.prototype);

ShapeComponent.prototype.render = function (inFramework) {
    var moveComponent = this.getActor().getComponentByType(ComponentType_Move);
    if(null !== moveComponent)
    {
        var position = moveComponent.getPosition();
        var canvasContext = inFramework.getCanvasContext();

        // draw
        canvasContext.fillStyle = 'green';
        canvasContext.fillRect(position.x, position.y, this.size.x, this.size.y);

        // console.log(position, this.size);
    }
}
