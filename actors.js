// Actor
function ActorBase() {
    this.position = {x: 0, y: 0};
    this.components = [];
    // console.log(this);
}

ActorBase.prototype.components = {};

ActorBase.prototype.addComponent = function (inComponent) {
    this.components[inComponent.getType()] = inComponent;
}

ActorBase.prototype.getComponentByType = function (inComponentType) {
    if (this.components.hasOwnProperty(inComponentType)) {
        return this.components[inComponentType];
    }

    return null;
}

ActorBase.prototype.updateComponents = function (inFramework) {
    for (var component in this.components) {
        this.components[component].update(inFramework);
    }
}

ActorBase.prototype.renderComponents = function (inFramework) {
    for (var component in this.components) {
        this.components[component].render(inFramework);
    }
}

ActorBase.prototype.getPosition = function() {
    return this.position;
}

ActorBase.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
}

ActorBase.prototype.addPosition = function(x, y) {
    this.position.x += x;
    this.position.y += y;
}

function CircleActor() {
    ActorBase.call(this);
    this.addComponent(new MoveComponent(this));
    this.addComponent(new ShapeComponent(this));
}

// 상속
// ACircle.prototype.__proto__ = AActor.prototype; // 비표준 방식
CircleActor.prototype = Object.create(ActorBase.prototype); // 표준 방식


function BlockActor() {
    ActorBase.call(this);
    // this.addComponent(new MoveComponent(this));
    this.addComponent(new ShapeComponent(this));
}

// 상속
// ACircle.prototype.__proto__ = AActor.prototype; // 비표준 방식
BlockActor.prototype = Object.create(ActorBase.prototype); // 표준 방식