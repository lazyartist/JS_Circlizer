// Actor
function ActorBase() {
    this.components = [];
    // console.log(this);
}

ActorBase.prototype.components = {};

ActorBase.prototype.addComponent = function (inComponent) {
    this.components[inComponent.getType()] = inComponent;
}

ActorBase.prototype.getComponentByType = function (inComponentType) {
    if(this.components.hasOwnProperty(inComponentType))
    {
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

function CircleActor() {
    ActorBase.call(this);
    this.addComponent(new MoveComponent(this));
    this.addComponent(new ShapeComponent(this));
}

// 상속
// ACircle.prototype.__proto__ = AActor.prototype; // 비표준 방식
CircleActor.prototype = Object.create(ActorBase.prototype); // 표준 방식
