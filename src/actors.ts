import * as ComponentModule from "./components.js"
import * as PhysicsModule from "./physics.js"

// Actor
export class ActorBase {
    position;
    pivot;
    components;

    constructor() {
        this.position = { x: 0, y: 0 };
        this.pivot = { x: 0.5, y: 1.0 }; // pivot: lefttop(0,0), rightbottom(1,1)
        this.components = {};
    }

    addComponent(inComponent) {
        this.components[inComponent.getType()] = inComponent;
    }

    getComponentByType(inComponentType) {
        if (this.components.hasOwnProperty(inComponentType)) {
            return this.components[inComponentType];
        }

        return null;
    }

    updateComponents(inFramework) {
        for (let component in this.components) {
            this.components[component].update(inFramework);
        }
    }

    renderComponents(inFramework) {
        for (const component in this.components) {
            this.components[component].render(inFramework);
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

        let rect = { x: x1, y: y1, w: inSize.x, h: inSize.y, x2: x1 + inSize.x, y2: y1 + inSize.y };

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

        this.addComponent(new ComponentModule.MoveComponent(this));

        let shapeComponent = new ComponentModule.ShapeComponent(this);
        shapeComponent.setSize(50, 50);
        shapeComponent.setColor("red");
        this.addComponent(shapeComponent);

        let collisionComponent = new ComponentModule.CollisionComponent(this);
        collisionComponent.setCollisionType(PhysicsModule.Channel_Movable);
        collisionComponent.setCollisionResponses(PhysicsModule.Channel_Static | PhysicsModule.Channel_Movable);
        collisionComponent.setSize(50, 50);
        this.addComponent(collisionComponent);
    }

    // 상속
    // ACircle.prototype.__proto__ = AActor.prototype; // 비표준 방식
    // CircleActor.prototype = Object.create(ActorBase.prototype); // 표준 방식
}

export class BlockActor extends ActorBase {
    constructor() {
        super();

        let shapeComponent = new ComponentModule.ShapeComponent(this);
        shapeComponent.setSize(50, 50);
        // shapeComponent.setColor("red");
        this.addComponent(shapeComponent);

        // this.addComponent(new ComponentModule.ShapeComponent(this));

        let collisionComponent = new ComponentModule.CollisionComponent(this);
        collisionComponent.setCollisionType(PhysicsModule.Channel_Static);
        collisionComponent.setCollisionResponses(PhysicsModule.Channel_Movable);
        collisionComponent.setSize(50, 50);
        this.addComponent(collisionComponent);
    }
}
