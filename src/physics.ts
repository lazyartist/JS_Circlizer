import { ActorBase } from "./actors.js";
import * as ComponentsModule from "./components.js"

export const Channel_None = 0;
export const Channel_Static = 1;
export const Channel_Movable = 2;
export let Channels = [Channel_None, Channel_Static, Channel_Movable];


export class Physics {
    constructor() {
    }

    updateCollision(inActors) {
        for (let i = 0; i < inActors.length; i++) {
            let actor : ActorBase = inActors[i];
            for (let jj = i + 1; jj < inActors.length; jj++) {
                let otherActor = inActors[jj];

                let collisionComponent : ComponentsModule.CollisionComponent = actor.getComponentByType(ComponentsModule.ComponentType.Physics) as ComponentsModule.CollisionComponent;
                let collisionComponent_other : ComponentsModule.CollisionComponent = otherActor.getComponentByType(ComponentsModule.ComponentType.Physics) as ComponentsModule.CollisionComponent;

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

                collisionComponent.clearIsCollided();
                collisionComponent_other.clearIsCollided();

                if (isDoHitTest) {
                    let isCollided = this.checkBoxCollision(collisionComponent, collisionComponent_other);
                    if (isCollided) {

                        // ridigbody
                        if(collisionType != Channel_Static && collisionType_other == Channel_Static){

                        }

                        // console.log("Collided!!", actor, otherActor);
                        collisionComponent.notifyCollision(otherActor);
                        collisionComponent_other.notifyCollision(actor);
                    }
                }
            }
        }

        // let actorsByChannel = [];
        // for (const actor in inActors) {
        //     let collisionComponent = actor.getComponentByType(ComponentsModule.Type_Physics);
        //     if (undefined === collisionComponent) {
        //         continue;
        //     }
        //
        //     let collitionType = collisionComponent.getCollisionType();
        //     if (Channel_None === collitionType) {
        //         continue;
        //     }
        //
        //     let actors = null;
        //     if (undefined === actorsByChannel[actorsByChannel]) {
        //         actors = [];
        //         actorsByChannel[actorsByChannel] = actors;
        //     } else {
        //         actors = actorsByChannel[actorsByChannel];
        //     }
        //
        //     actors.push(actor);
        // }
    }

    checkBoxCollision(inCollisionComponent_l, inCollisionComponent_r) {
        let position_l = inCollisionComponent_l.getActor().getPosition();
        let position_r = inCollisionComponent_r.getActor().getPosition();
        let size_l = inCollisionComponent_l.getSize();
        let size_r = inCollisionComponent_r.getSize();

        let rect_l = {x1: position_l.x, y1: position_l.y, x2: position_l.x + size_l.x, y2: position_l.y + size_l.y};
        let rect_r = {x1: position_r.x, y1: position_r.y, x2: position_r.x + size_r.x, y2: position_r.y + size_r.y};

        let collidedX = rect_r.x1 <= rect_l.x2 && rect_r.x2 >= rect_l.x1;
        let collidedY = rect_r.y1 <= rect_l.y2 && rect_r.y2 >= rect_l.y1;

        if (collidedX && collidedY) {
            console.log("hit");
            return true;
        }

        return false;
    }

    updateRigidBody() {

    }
}