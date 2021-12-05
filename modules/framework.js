// import {CollisionSystem} from "./collision_system.js"
import * as ActorModule from "./actors.js"
import * as ComponentModule from "./components.js"

export class Framework {
    constructor() {
        this.canvas = null;
        this.canvasContext = null;

        this.keys = [];
        this.fps = 30;
        this.deltaTime = 1 / this.fps;

        // this.gravity = 9.8;
        this.gravity = 1;
        this.actors = [];

        this.playerActor = null;
    }

    init() {
        let thisFramework = this;
        let body = document.getElementById('body');
        body.onkeydown = function (e) {
            // console.log(e);
            // thisFramework.keys[e.code] = true; // 이 시점에 this는 body
            thisFramework.keys[e.keyCode] = true; // 이 시점에 this는 body
        }
        body.onkeyup = function (e) {
            // console.log(e);
            // thisFramework.keys[e.code] = false;
            thisFramework.keys[e.keyCode] = false;
        }

        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');

        this.playerActor = new ActorModule.CircleActor();

        this.actors.push(new ActorModule.ActorBase());
        this.actors.push(this.playerActor);

        // mon
        let monActor = new ActorModule.CircleActor();
        monActor.setPosition(100, 100);
        this.actors.push(monActor);

        // block
        let blockActor = new ActorModule.BlockActor();
        blockActor.setPosition(0, 30);
        this.actors.push(blockActor);
    }

    start() {
        let thisFramework = this;
        this.gameLoop.bind(this);
        window.setInterval(function () {
            thisFramework.gameLoop(); // 여기서 this는 window 객체를 가리키므로 Framwork의 this를 캡쳐하여 사용한다.
            // gameLoop();
        }, 1000 / this.fps);
    }

    isPressedKey(inKey) {
        return this.keys[inKey.charCodeAt(0)];
    }

    getCanvasContext() {
        return this.canvasContext;
    }

    getDeltaTime() {
        return this.deltaTime;
    }

    getGravity() {
        return this.gravity;
    }

    updateInput() {
        let moveComponent = this.playerActor.getComponentByType(ComponentModule.Type_Move);
        if (null !== moveComponent) {
            moveComponent.updateSpeedByDirection(this);
        }
    }

    update() {
        this.actors.forEach(actor => actor.updateComponents(this));
    }

    render() {
        // clear canvas
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.actors.forEach(actor => actor.renderComponents(this));
    }

    gameLoop() {
        this.updateInput();
        this.update();
        this.render();
    }
}
