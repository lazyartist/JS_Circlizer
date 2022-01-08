import * as CommonModule from "../common.js";
import { ComponentBase, ComponentType } from "./ComponentBase.js";
import * as PhysicsModule from "../physics.js";
import { CollisionResult } from "../physics.js";
// CollisionComponent
export class CollisionComponent extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Physics;
        this.collisionType = PhysicsModule.Channel_None;
        this.collisionResponses = PhysicsModule.Channel_None;
        this._collisionResult = new CollisionResult(false, 0, 0);
        this.size = new CommonModule.Size(0, 0);
        // var a = this.size.x;
        // this.size = {x: 0, y: 0};
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
    setSize(x, y) {
        this.size.x = x;
        this.size.y = y;
    }
    getWorldRect() {
        let position = this.getActor().getPosition();
        let pivot = this.getActor().getPivot();
        let x1 = position.x - (this.size.x * pivot.x);
        let y1 = position.y - (this.size.y * pivot.y);
        let rect = new CommonModule.Rect(x1, y1, this.size.x, this.size.y);
        // let rect = {x: x1, y: y1, w: this.size.x, h: this.size.y, x2: x1 + this.size.x, y2: y1 + this.size.y};
        return rect;
    }
    getIsRigidBody() {
        return this.isRigidBody;
    }
    setIsRigidBody(inValue) {
        this.isRigidBody = inValue;
    }
    clearIsCollided() {
        this._collisionResult.isCollided = false;
    }
    notifyCollision(inOtherActor, collisionResult) {
        console.log("notifyCollision", this, inOtherActor);
        this._collisionResult = collisionResult;
    }
    render(inFramework) {
        let rect = this.getActor().getWorldRect(this.size);
        let canvasContext = inFramework.getCanvasContext();
        // draw
        if (this._collisionResult.isCollided) {
            canvasContext.strokeStyle = 'yellow';
            canvasContext.beginPath();
            canvasContext.arc(this._collisionResult.position.x, this._collisionResult.position.y, 5, 0, 2 * Math.PI);
            canvasContext.stroke();
        }
        else {
            canvasContext.strokeStyle = 'green';
        }
        canvasContext.strokeRect(rect.x1, rect.y1, rect.w, rect.h);
        // canvasContext.strokeRect(position.x, position.y, this.size.x, this.size.y);
        // canvasContext.stroke(); // clearRect()로 지워지지 않는다.
    }
}
//# sourceMappingURL=CollisionComponent.js.map