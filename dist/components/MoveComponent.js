import * as CommonModule from "../common.js";
import { ComponentBase, ComponentType } from "./ComponentBase.js";
// MoveComponent
export class MoveComponent extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Move;
        this.speed = new CommonModule.Vector2D(0, 0);
        this.accel = new CommonModule.Vector2D(0, 0);
        // for gravity
        // this.speedMax = new CommonModule.Vector2D(8, 4);
        // this.friction = new CommonModule.Vector2D(-70, 0);
        // this.accelMax = new CommonModule.Vector2D(120, 50);
        // for no gravity
        this.speedMax = new CommonModule.Vector2D(12, 12);
        this.friction = new CommonModule.Vector2D(-70, -70);
        this.accelMax = new CommonModule.Vector2D(120, 120);
        this.jumpSpeed = new CommonModule.Vector2D(0, 50);
    }
    update(inFramework) {
        // Component.prototype.update.call(this);
        let gravity = inFramework.getGravity();
        let deltaTime = inFramework.getDeltaTime();
        this.speed.x += this.accel.x;
        let xSpeedSignBefore = 1;
        if (0 !== this.speed.x) {
            xSpeedSignBefore = this.speed.x / Math.abs(this.speed.x);
        }
        this.speed.x += this.friction.x * deltaTime * xSpeedSignBefore;
        let xSpeedSignAfter = 1;
        if (0 !== this.speed.x) {
            xSpeedSignAfter = this.speed.x / Math.abs(this.speed.x);
        }
        // speed 계산 이전과 이후 부호가 바뀌었다면 마찰력에 의한 것이기 때문에 멈춰준다.
        if (xSpeedSignBefore !== xSpeedSignAfter) {
            this.speed.x = 0;
        }
        if (Math.abs(this.speedMax.x) < Math.abs(this.speed.x)) {
            this.speed.x = Math.abs(this.speedMax.x) * xSpeedSignAfter;
        }
        this.speed.y += this.accel.y;
        if (0 != gravity) {
            this.speed.y += gravity * deltaTime;
        }
        else {
            let ySpeedSignBefore = 1;
            if (0 !== this.speed.y) {
                ySpeedSignBefore = this.speed.y / Math.abs(this.speed.y);
            }
            this.speed.y += this.friction.y * deltaTime * ySpeedSignBefore;
            let ySpeedSignAfter = 1;
            if (0 !== this.speed.y) {
                ySpeedSignAfter = this.speed.y / Math.abs(this.speed.y);
            }
            if (ySpeedSignBefore !== ySpeedSignAfter) {
                this.speed.y = 0;
            }
            if (Math.abs(this.speedMax.y) < Math.abs(this.speed.y)) {
                this.speed.y = Math.abs(this.speedMax.y) * ySpeedSignAfter;
            }
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
//# sourceMappingURL=MoveComponent.js.map