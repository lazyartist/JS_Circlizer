import * as CommonModule from "../common.js";
import { ComponentBase, ComponentType } from "./ComponentBase.js";
// ShapeComponent
export class ShapeComponentBase extends ComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Shape;
        this.size = new CommonModule.Size(10, 10);
        // this.size = {x: 10, y: 10};
        this.setColor("gray");
    }
    setSize(x, y) {
        this.size.x = x;
        this.size.y = y;
    }
    setColor(inColor) {
        this.color = inColor;
    }
    render(inFramework) {
        let position = this.getActor().getPosition();
        let rect = this.getActor().getWorldRect(this.size);
        // let position = this.getActor().getPosition();
        let canvasContext = inFramework.getCanvasContext();
        // draw position
        canvasContext.fillStyle = this.color;
        canvasContext.strokeStyle = this.color;
        canvasContext.beginPath();
        canvasContext.arc(position.x, position.y, 5, 0, 2 * Math.PI);
        canvasContext.stroke();
    }
}
// ShapeComponent
export class BoxShapeComponent extends ShapeComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Shape;
        this.size = new CommonModule.Size(10, 10);
        // this.size = {x: 10, y: 10};
        this.setColor("gray");
    }
    setSize(x, y) {
        this.size.x = x;
        this.size.y = y;
    }
    setColor(inColor) {
        this.color = inColor;
    }
    render(inFramework) {
        super.render(inFramework);
        let rect = this.getActor().getWorldRect(this.size);
        // let position = this.getActor().getPosition();
        let canvasContext = inFramework.getCanvasContext();
        // draw position
        // canvasContext.beginPath();
        // canvasContext.arc(rect.x1, rect.y1, 5, 0, 2 * Math.PI);
        // canvasContext.stroke();
        // draw
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(rect.x1, rect.y1, rect.w, rect.h);
    }
}
// LineComponent
export class LineShapeComponent extends ShapeComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Shape;
        this.size = new CommonModule.Size(10, 10);
        // this.size = {x: 10, y: 10};
        this.setColor("gray");
    }
    setSize(x, y) {
        this.size.x = x;
        this.size.y = y;
    }
    setColor(inColor) {
        this.color = inColor;
    }
    getWorldRect() {
        let position = this.getActor().getPosition();
        let rect = new CommonModule.Rect(position.x, position.y, this.size.x, this.size.y);
        return rect;
    }
    render(inFramework) {
        super.render(inFramework);
        let rect = this.getWorldRect();
        // let position = this.getActor().getPosition();
        let canvasContext = inFramework.getCanvasContext();
        // draw
        canvasContext.fillStyle = this.color;
        canvasContext.strokeStyle = this.color;
        canvasContext.beginPath(); // Start a new path
        canvasContext.moveTo(rect.x1, rect.y1);
        canvasContext.lineTo(rect.x2, rect.y2);
        canvasContext.stroke();
    }
}
//# sourceMappingURL=ShapeComponent.js.map