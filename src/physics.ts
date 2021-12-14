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
            let actor = inActors[i];
            for (let j = i + 1; j < inActors.length; j++) {
                let otherActor = inActors[j];

                let physicsComponent = actor.getComponentByType(ComponentsModule.Type_Physics);
                let physicsComponent_other = otherActor.getComponentByType(ComponentsModule.Type_Physics);

                let collisionType = physicsComponent.getCollisionType();
                let collisionType_other = physicsComponent_other.getCollisionType();
                let collisionResponses = physicsComponent.getCollisionResponses();
                let collisionResponses_other = physicsComponent_other.getCollisionResponses();

                let collisionResponsesResult1 = collisionType & collisionResponses_other;
                let collisionResponsesResult2 = collisionType_other & collisionResponses;
                let isDoHitTest = collisionResponsesResult1 && collisionResponsesResult2;

                // console.log("collisionType", collisionType, collisionType_other);
                // console.log("collisionResponses", collisionResponses, collisionResponses_other);
                // console.log("isDoHitTest", isDoHitTest);

                physicsComponent.clearIsCollided();
                physicsComponent_other.clearIsCollided();

                if (isDoHitTest) {
                    let isCollided = this.checkBoxCollision(physicsComponent, physicsComponent_other);
                    if (isCollided) {

                        // ridigbody
                        if(collisionType != Channel_Static && collisionType_other == Channel_Static){

                        }

                        // console.log("Collided!!", actor, otherActor);
                        physicsComponent.notifyCollision(otherActor);
                        physicsComponent_other.notifyCollision(actor);
                    }
                }
            }
        }

        // let actorsByChannel = [];
        // for (const actor in inActors) {
        //     let physicsComponent = actor.getComponentByType(ComponentsModule.Type_Physics);
        //     if (undefined === physicsComponent) {
        //         continue;
        //     }
        //
        //     let collitionType = physicsComponent.getCollisionType();
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