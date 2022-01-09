import { ActorBase } from "../../engine/actors.js";
import { CollisionComponent } from "../../engine/components/CollisionComponent.js";
import { MoveComponent } from "../../engine/components/MoveComponent.js";
import { BoxShapeComponent } from "../../engine/components/ShapeComponent.js";
import * as PhysicsModule from "../../engine/physics.js";

export class RotateActor extends ActorBase
{
    constructor() {
        super();

        // this.transform.rotation = Math.PI / 30; // 30도
        this.pivot.setXY(.5, .5);

        let moveComponent = new MoveComponent(this);
        this.addComponent(moveComponent);

        let shapeComponent = new BoxShapeComponent(this);
        shapeComponent.setSize(50, 50);
        this.addComponent(shapeComponent);

        let collisionComponent = new CollisionComponent(this);
        collisionComponent.setCollisionType(PhysicsModule.Channel_Static);
        collisionComponent.setCollisionResponses(PhysicsModule.Channel_Movable);
        collisionComponent.setSize(50, 50);
        this.addComponent(collisionComponent);
    }

    tick(inFramework) {
        this.transform.rotation += 0.1;
        // console.log(this);
    }
}