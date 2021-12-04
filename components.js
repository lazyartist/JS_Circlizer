// ComponentType
var ComponentType_Base = "ComponentType_Base";
var ComponentType_Move = "ComponentType_Move";
var ComponentType_Shape = "ComponentType_Shape";
var ComponentType_Physics = "ComponentType_Physics";

// ComponentBase
class ComponentBase {
    constructor(inActor) {
        this.actor = inActor;
        this.type = ComponentType_Base;
    }

    // Component.prototype.actor = inActor; // 모든 인스턴스가 공유하는 객체가 된다.

    getType(inType) {
        return this.type;
    }

    getActor() {
        return this.actor;
    }

    update(inFramework) {
        // need override
    }

    render(inFramework) {
        // need override
    }
}

// MoveComponent
class MoveComponent extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType_Move;

        this.type = ComponentType_Move;

        this.speedMax = {x: 6, y: 50};
        this.speed = {x: 0, y: 0};
        this.friction = {x: -70, y: 0};
        this.accel = {x: 0, y: 0};
        this.accelMax = {x: 90, y: 0};
        this.jumpSpeed = {x: 0, y: 50};
    }

    update(inFramework) {
        // Component.prototype.update.call(this);

        var gravity = inFramework.getGravity();
        var deltaTime = inFramework.getDeltaTime();

        this.speed.x += this.accel.x;
        this.speed.y += this.accel.y;

        var speedSignBefore = 1;
        if (0 != this.speed.x) {
            speedSignBefore = this.speed.x / Math.abs(this.speed.x);
        }

        this.speed.x += this.friction.x * deltaTime * speedSignBefore;
        this.speed.y += gravity * deltaTime;

        var speedSignAfter = 1;
        if (0 != this.speed.x) {
            speedSignAfter = this.speed.x / Math.abs(this.speed.x);
        }

        // speed 계산 이전과 이후 부호가 바뀌었다면 마찰력에 의한 것이기 때문에 멈춰준다.
        if (speedSignBefore != speedSignAfter) {
            this.speed.x = 0;
        }

        if (Math.abs(this.speedMax.x) < Math.abs(this.speed.x)) {
            this.speed.x = Math.abs(this.speedMax.x) * speedSignAfter;
        }

        console.log(this.speed.x);

        this.getActor().addPosition(this.speed.x, this.speed.y);
    }

    clearSpeed() {
        this.speed = {x: 0, y: 0};
    }

    updateSpeedByDirection(inFramework) {
        // e.keyCode(e.code)는 대소문자 구분없이 같다.
        // A a:65, D d:68, W w:87, S s:83, space:32

        this.accel.x = 0;
        this.accel.y = 0;

        if (inFramework.isPressedKey("A")) {
            this.accel.x = this.accelMax.x * -1;
        }

        if (inFramework.isPressedKey("D")) {
            this.accel.x = this.accelMax.x;
        }

        if (inFramework.isPressedKey("W")) {
            this.accel.y = this.accelMax.y * -1;
        }

        if (inFramework.isPressedKey("S")) {
            this.accel.y = this.accelMax.y;
        }

        this.accel.x *= inFramework.getDeltaTime();
        this.accel.y *= inFramework.getDeltaTime();
    }

    isPressedKey(inkeys, inKey) {
        const result = inkeys[inKey.charCodeAt(0)];
        return result;
    }
}

// ShapeComponent
class ShapeComponent extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType_Shape;
        this.size = {x: 10, y: 10};
    }

    render(inFramework) {
        var position = this.getActor().getPosition();
        var canvasContext = inFramework.getCanvasContext();

        // draw
        canvasContext.fillStyle = 'green';
        canvasContext.fillRect(position.x, position.y, this.size.x, this.size.y);
    }
}
