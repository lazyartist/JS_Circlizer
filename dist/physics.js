import { Vector2D } from "./common.js";
import * as ComponentsModule from "./components/ComponentBase.js";
export const Channel_None = 0;
export const Channel_Static = 1;
export const Channel_Movable = 2;
export const Channel_Line = 4;
export let Channels = [Channel_None, Channel_Static, Channel_Movable, Channel_Line];
export class Physics {
    constructor() {
    }
    updateCollision(inActors) {
        for (let i = 0; i < inActors.length; i++) {
            let actor = inActors[i];
            for (let jj = i + 1; jj < inActors.length; jj++) {
                let otherActor = inActors[jj];
                let collisionComponent = actor.getComponentByType(ComponentsModule.ComponentType.Physics);
                let collisionComponent_other = otherActor.getComponentByType(ComponentsModule.ComponentType.Physics);
                collisionComponent.clearIsCollided();
                collisionComponent_other.clearIsCollided();
            }
        }
        for (let i = 0; i < inActors.length; i++) {
            let actor = inActors[i];
            for (let jj = i + 1; jj < inActors.length; jj++) {
                let otherActor = inActors[jj];
                let collisionComponent = actor.getComponentByType(ComponentsModule.ComponentType.Physics);
                let collisionComponent_other = otherActor.getComponentByType(ComponentsModule.ComponentType.Physics);
                let collisionType = collisionComponent.getCollisionType();
                let collisionType_other = collisionComponent_other.getCollisionType();
                let collisionResponses = collisionComponent.getCollisionResponses();
                let collisionResponses_other = collisionComponent_other.getCollisionResponses();
                let collisionResponsesResult1 = collisionType & collisionResponses_other;
                let collisionResponsesResult2 = collisionType_other & collisionResponses;
                let isDoHitTest = collisionResponsesResult1 && collisionResponsesResult2;
                // console.log("collisionType", collisionType, collisionType_other);
                // console.log("collisionResponses", collisionResponses, collisionResponses_other);
                // console.log("isDoHitTest", isDoHitTest);
                if (isDoHitTest) {
                    // let isCollided = this.checkBoxCollision(collisionComponent, collisionComponent_other);
                    let collisionResult = this.checkLineCollision(collisionComponent, collisionComponent_other);
                    if (collisionResult.isCollided) {
                        // ridigbody
                        if (collisionType != Channel_Static && collisionType_other == Channel_Static) {
                        }
                        // console.log("Collided!!", actor, otherActor);
                        collisionComponent.notifyCollision(otherActor, collisionResult);
                        collisionComponent_other.notifyCollision(actor, collisionResult);
                        continue;
                    }
                }
            }
        }
    }
    checkBoxCollision(inCollisionComponent_l, inCollisionComponent_r) {
        let position_l = inCollisionComponent_l.getActor().getPosition();
        let position_r = inCollisionComponent_r.getActor().getPosition();
        let size_l = inCollisionComponent_l.getSize();
        let size_r = inCollisionComponent_r.getSize();
        let rect_l = { x1: position_l.x, y1: position_l.y, x2: position_l.x + size_l.x, y2: position_l.y + size_l.y };
        let rect_r = { x1: position_r.x, y1: position_r.y, x2: position_r.x + size_r.x, y2: position_r.y + size_r.y };
        let collidedX = rect_r.x1 <= rect_l.x2 && rect_r.x2 >= rect_l.x1;
        let collidedY = rect_r.y1 <= rect_l.y2 && rect_r.y2 >= rect_l.y1;
        let collisionResult = new CollisionResult(false, collidedX, collidedY);
        if (collidedX && collidedY) {
            console.log("hit");
            collisionResult.isCollided = true;
        }
        return collisionResult;
    }
    checkLineCollision(inCollisionComponent_l, inCollisionComponent_r) {
        let collisionResult = new CollisionResult(false, 0, 0);
        let rect_l = inCollisionComponent_l.getWorldRect();
        let rect_r = inCollisionComponent_r.getWorldRect();
        // let denominator : null = (q2.x - q1.x) * (p1.y - p2.y) - (p1.x - p2.x) * (q2.y - q1.y);
        let denominator = (rect_r.x2 - rect_r.x1) * (rect_l.y1 - rect_l.y2) - (rect_l.x1 - rect_l.x2) * (rect_r.y2 - rect_r.y1);
        if (denominator == 0) {
            // 평행한 경우 다른 방식으로 검출해야한다.
            console.log("Parallel");
            return collisionResult;
        }
        // float t = ((q1.y - q2.y) * (p1.x - q1.x) + (q2.x - q1.x) * (p1.y - q1.y)) / denominator;
        // float s = ((p1.y - p2.y) * (p1.x - q1.x) + (p2.x - p1.x) * (p1.y - q1.y)) / denominator;
        // t : P1->P2에서 교점의 비율, s : Q1->Q2에서 교점의 비율
        let t = ((rect_r.y1 - rect_r.y2) * (rect_l.x1 - rect_r.x1) + (rect_r.x2 - rect_r.x1) * (rect_l.y1 - rect_r.y1)) / denominator;
        let s = ((rect_l.y1 - rect_l.y2) * (rect_l.x1 - rect_r.x1) + (rect_l.x2 - rect_l.x1) * (rect_l.y1 - rect_r.y1)) / denominator;
        let v = rect_l.getVector2D();
        let w = rect_r.getVector2D();
        // float x = v.x * t + p1.x;
        // float y = v.y * t + p1.y;
        let x = v.x * t + rect_l.x1;
        let y = v.y * t + rect_l.y1;
        // console.log(t + ", " + s + ", " + denominator);
        collisionResult.position.setXY(x, y);
        if (t < 0.0 || t > 1.0 || s < 0.0 || s > 1.0) {
            collisionResult.isCollided = false;
            console.log("No Collision");
        }
        else if (t == 0 && s == 0) {
            collisionResult.isCollided = false;
            console.info("Overlap"); // 이 상황은 없다.
        }
        else {
            collisionResult.isCollided = true;
            console.warn("Collided");
        }
        return collisionResult;
    }
    updateRigidBody() {
    }
}
export class CollisionResult {
    constructor(isCollided, x, y) {
        this._isCollided = isCollided;
        this._position = new Vector2D(x, y);
    }
    get isCollided() {
        return this._isCollided;
    }
    set isCollided(value) {
        this._isCollided = value;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
}
//# sourceMappingURL=physics.js.map