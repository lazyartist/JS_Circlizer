// Actor
class ActorBase {
    constructor() {
        this.position = {x: 0, y: 0};
        this.components = [];
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
        for (var component in this.components) {
            this.components[component].update(inFramework);
        }
    }

    renderComponents(inFramework) {
        for (var component in this.components) {
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

    addPosition(x, y) {
        this.position.x += x;
        this.position.y += y;
    }
}

class CircleActor extends ActorBase {
    constructor() {
        super();

        this.addComponent(new MoveComponent(this));
        this.addComponent(new ShapeComponent(this));
    }

    // 상속
    // ACircle.prototype.__proto__ = AActor.prototype; // 비표준 방식
    // CircleActor.prototype = Object.create(ActorBase.prototype); // 표준 방식
}

class BlockActor extends ActorBase {
    constructor() {
        super();

        // this.addComponent(new MoveComponent(this));
        this.addComponent(new ShapeComponent(this));
    }
}
