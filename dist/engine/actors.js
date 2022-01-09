import { Rect, Vector2 } from "./common.js";
import { CollisionComponent } from "./components/CollisionComponent.js";
import { MoveComponent } from "./components/MoveComponent.js";
import * as ShapeComponentModule from "./components/ShapeComponent.js";
import * as PhysicsModule from "./physics.js";
// Actor
export class ActorBase {
    constructor() {
        // this.transform = new Transform2(0, 0, 0, 1);
        this.position = new Vector2(0, 0);
        this.pivot = new Vector2(0.5, 1.0); // { x: 0.5, y: 1.0 }; // pivot: lefttop(0,0), rightbottom(1,1)
        this.components = new Map();
    }
    addComponent(inComponent) {
        this.components.set(inComponent.getType(), inComponent);
    }
    getComponentByType(inComponentType) {
        if (this.components.has(inComponentType)) {
            return this.components.get(inComponentType);
        }
        return null;
    }
    tick(inFramework) {
        // override
    }
    updateComponents(inFramework) {
        for (const [key, values] of this.components) {
            values.update(inFramework);
            // console.log(`KEY: ${key}, VALUE: ${values}`);
        }
    }
    renderComponents(inFramework) {
        for (const [key, values] of this.components) {
            values.render(inFramework);
            // console.log(`KEY: ${key}, VALUE: ${values}`);
        }
    }
    getPosition() {
        return this.position;
    }
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    getPivot() {
        return this.pivot;
    }
    setPivot(x, y) {
        this.pivot.x = x;
        this.pivot.y = y;
    }
    getWorldRect(inSize) {
        let x1 = this.position.x - (inSize.x * this.pivot.x);
        let y1 = this.position.y - (inSize.y * this.pivot.y);
        let rect = new Rect(x1, y1, inSize.x, inSize.y);
        return rect;
    }
    addPosition(x, y) {
        this.position.x += x;
        this.position.y += y;
    }
}
export class CircleActor extends ActorBase {
    constructor() {
        super();
        this.addComponent(new MoveComponent(this));
        let shapeComponent = new ShapeComponentModule.BoxShapeComponent(this);
        shapeComponent.setSize(50, 50);
        shapeComponent.setColor("red");
        this.addComponent(shapeComponent);
        let collisionComponent = new CollisionComponent(this);
        collisionComponent.setCollisionType(PhysicsModule.Channel_Movable);
        collisionComponent.setCollisionResponses(PhysicsModule.Channel_Static | PhysicsModule.Channel_Movable);
        collisionComponent.setSize(50, 50);
        this.addComponent(collisionComponent);
    }
}
export class BlockActor extends ActorBase {
    constructor() {
        super();
        let shapeComponent = new ShapeComponentModule.BoxShapeComponent(this);
        shapeComponent.setSize(50, 50);
        this.addComponent(shapeComponent);
        let collisionComponent = new CollisionComponent(this);
        collisionComponent.setCollisionType(PhysicsModule.Channel_Static);
        collisionComponent.setCollisionResponses(PhysicsModule.Channel_Movable);
        collisionComponent.setSize(50, 50);
        this.addComponent(collisionComponent);
    }
}
export class LineActor extends ActorBase {
    constructor(x = 50, y = 50) {
        super();
        this.setPivot(0, 0);
        this.addComponent(new MoveComponent(this));
        let shapeComponent = new ShapeComponentModule.LineShapeComponent(this);
        shapeComponent.setSize(x, y);
        this.addComponent(shapeComponent);
        let collisionComponent = new CollisionComponent(this);
        collisionComponent.setCollisionType(PhysicsModule.Channel_Line);
        collisionComponent.setCollisionResponses(PhysicsModule.Channel_Line);
        collisionComponent.setSize(x, y);
        this.addComponent(collisionComponent);
    }
}
//# sourceMappingURL=actors.js.map