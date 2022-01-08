import * as Physics from "../physics.js";
import * as CommonModule from "../common.js";
import { ActorBase } from "../actors.js";
import { Framework } from "../framework.js";
import { Rect } from "../common.js";

// Symbol.for : public member 전역공간에서 공유되는 심볼.
// 여기저기서 많이 사용되는 공용상수를 사용할때 사용
// 오브젝트에 동적으로 Symbol 키를 추가하면 for..in으로 조회가 안된다. 정적으로 유일한 키를 만들 경우에 사용.
// const Type_Base = Symbol.for("ComponentType_Base1");
// const ComponentType_Move = Symbol.for("ComponentType_Move2");
// const ComponentType_Shape = Symbol.for("ComponentType_Shape3");
// const ComponentType_Physics = Symbol.for("ComponentType_Physics4");

// Typescript로 변경 후 enum으로 변경
// export const Type_Base = "Type_Base";
// export const Type_Move = "ComponentType_Move";
// export const Type_Shape = "ComponentType_Shape";
// export const Type_Physics = "ComponentType_Physics";

export enum ComponentType{
    None, Base, Move, Shape, Physics
}

// ComponentBase
export class ComponentBase {
    actor : ActorBase;
    type : ComponentType;

    constructor(inActor) {
        this.actor = inActor;
        this.type = ComponentType.Base;
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
    speedMax : CommonModule.Vector2D;
    speed : CommonModule.Vector2D;
    friction : CommonModule.Vector2D;
    accel : CommonModule.Vector2D;
    accelMax : CommonModule.Vector2D;
    jumpSpeed : CommonModule.Vector2D;

    constructor(inActor) {

        super(inActor);
        this.type = ComponentType.Move;

        this.speedMax = new CommonModule.Vector2D( 6, 50 );
        this.speed = new CommonModule.Vector2D( 0, 0 );
        // this.size = new CommonModule.Size();
        this.friction = new CommonModule.Vector2D( -70, 0 );
        this.accel = new CommonModule.Vector2D( 0, 0 );
        this.accelMax = new CommonModule.Vector2D( 90, 0 );
        this.jumpSpeed = new CommonModule.Vector2D( 0, 50 );
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

        // console.log(this.speed.x);

        this.getActor().addPosition(this.speed.x, this.speed.y);
    }

    clearSpeed() {
        this.speed.setXY(0, 0);
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
