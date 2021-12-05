import * as Physics from "./physics.js";

// Symbol.for : public member 전역공간에서 공유되는 심볼.
// 여기저기서 많이 사용되는 공용상수를 사용할때 사용
// 오브젝트에 동적으로 Symbol 키를 추가하면 for..in으로 조회가 안된다. 정적으로 유일한 키를 만들 경우에 사용.
// const Type_Base = Symbol.for("ComponentType_Base1");
// const ComponentType_Move = Symbol.for("ComponentType_Move2");
// const ComponentType_Shape = Symbol.for("ComponentType_Shape3");
// const ComponentType_Physics = Symbol.for("ComponentType_Physics4");
export const Type_Base = "Type_Base";
export const Type_Move = "ComponentType_Move";
export const Type_Shape = "ComponentType_Shape";
export const Type_Physics = "ComponentType_Physics";

// ComponentBase
export class ComponentBase {
    constructor(inActor) {
        this.actor = inActor;
        this.type = Type_Base;
    }

    // Component.prototype.actor = inActor; // 모든 인스턴스가 공유하는 객체가 된다.

    getType() {
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
export class MoveComponent extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = Type_Move;

        this.speedMax = {x: 6, y: 50};
        this.speed = {x: 0, y: 0};
        this.friction = {x: -70, y: 0};
        this.accel = {x: 0, y: 0};
        this.accelMax = {x: 90, y: 0};
        this.jumpSpeed = {x: 0, y: 50};
    }

    update(inFramework) {
        // Component.prototype.update.call(this);

        let gravity = inFramework.getGravity();
        let deltaTime = inFramework.getDeltaTime();

        this.speed.x += this.accel.x;
        this.speed.y += this.accel.y;

        let speedSignBefore = 1;
        if (0 !== this.speed.x) {
            speedSignBefore = this.speed.x / Math.abs(this.speed.x);
        }

        this.speed.x += this.friction.x * deltaTime * speedSignBefore;
        this.speed.y += gravity * deltaTime;

        let speedSignAfter = 1;
        if (0 !== this.speed.x) {
            speedSignAfter = this.speed.x / Math.abs(this.speed.x);
        }

        // speed 계산 이전과 이후 부호가 바뀌었다면 마찰력에 의한 것이기 때문에 멈춰준다.
        if (speedSignBefore !== speedSignAfter) {
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
}

// ShapeComponent
export class ShapeComponent extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = Type_Shape;
        this.size = {x: 10, y: 10};
        this.setColor("gray");
    }

    setColor(inColor) {
        this.color = inColor;
    }

    render(inFramework) {
        let position = this.getActor().getPosition();
        let canvasContext = inFramework.getCanvasContext();

        // draw
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(position.x, position.y, this.size.x, this.size.y);
    }
}

// CollisionComponent
export class CollisionComponent extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = Type_Physics;
        this.collisionType = Physics.Channel_None;
        this.collisionResponses = Physics.Channel_None;
        this.isCollided = false;

        this.size = {x: 0, y: 0};
        this.isRigidBody = false;
    }

    getCollisionType() {
        return this.collisionType;
    }

    setCollisionType(inCollisionType) {
        this.collisionType = inCollisionType;
    }

    getCollisionResponses() {
        return this.collisionResponses;
    }

    setCollisionResponses(inCollisionResponses) {
        this.collisionResponses = inCollisionResponses;
    }

    getSize() {
        return this.size;
    }

    setSize(inSize) {
        this.size = inSize;
    }

    getIsRigidBody() {
        return this.isRigidBody;
    }

    setIsRigidBody(inValue) {
        this.isRigidBody = inValue;
    }

    clearIsCollided() {
        this.isCollided = false;
    }

    notifyCollision(inOtherActor) {
        console.log("notifyCollision", this, inOtherActor);
        this.isCollided = true;
    }

    render(inFramework) {
        let position = this.getActor().getPosition();
        let canvasContext = inFramework.getCanvasContext();

        // draw
        if (this.isCollided) {
            canvasContext.strokeStyle = 'yellow';
        } else {
            canvasContext.strokeStyle = 'green';
        }

        canvasContext.strokeRect(position.x, position.y, this.size.x, this.size.y);
        // canvasContext.stroke(); // clearRect()로 지워지지 않는다.
    }
}
