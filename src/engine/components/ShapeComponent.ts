import * as CommonModule from "../common.js";
import { Matrix2, Rect, Vector2 } from "../common.js";
import { Framework } from "../framework.js";
import { ComponentBase, ComponentType } from "./ComponentBase.js";


// ShapeComponent
export class ShapeComponentBase extends ComponentBase {
    type: any;
    size;
    color;

    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Shape;
        this.size = new CommonModule.Size(10, 10);
    }

    setSize(x, y) {
        this.size.x = x;
        this.size.y = y;
    }

    setColor(inColor) {
        this.color = inColor;
    }

    getWorldRect() : CommonModule.Rect {
        let position : CommonModule.Vector2 = this.getActor().getPosition();
        let pivot : Vector2 = this.getActor().getPivot();

        let x1 = position.x - (this.size.x * pivot.x);
        let y1 = position.y - (this.size.y * pivot.y);
        let rect : Rect = new Rect(x1, y1, this.size.x, this.size.y);

        // let rect : CommonModule.Rect = new CommonModule.Rect(position.x, position.y, this.size.x, this.size.y);

        return rect;
    }

    getLocalRect() : CommonModule.Rect {
        let position : CommonModule.Vector2 = this.getActor().getPosition();
        let pivot : Vector2 = this.getActor().getPivot();

        let x1 = this.size.x - (this.size.x * pivot.x);
        let y1 = this.size.y - (this.size.y * pivot.y);
        let rect : Rect = new Rect(x1, y1, x1 + this.size.x, y1 + this.size.y);

        // let rect : CommonModule.Rect = new CommonModule.Rect(position.x, position.y, this.size.x, this.size.y);

        return rect;
    }

    render(inFramework : Framework) {
        // let position : CommonModule.Vector2 = this.getActor().getPosition();
        // let rect : CommonModule.Rect = this.getActor().getWorldRect(this.size);
        // let canvasContext : CanvasRenderingContext2D = inFramework.getCanvasContext();
    }

    render_post(inFramework : Framework) {
        let position : CommonModule.Vector2 = this.getActor().getPosition();
        let rect : CommonModule.Rect = this.getActor().getWorldRect(this.size);
        let canvasContext : CanvasRenderingContext2D = inFramework.getCanvasContext();

        // draw position
        canvasContext.fillStyle = CommonModule.ColorSet.Position;
        canvasContext.strokeStyle = CommonModule.ColorSet.Position;
        canvasContext.beginPath();
        canvasContext.arc(position.x, position.y, 1, 0, 2 * Math.PI);
        canvasContext.stroke();
    }
}

// ShapeComponent
export class BoxShapeComponent extends ShapeComponentBase {
    type: any;
    size;
    color;

    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Shape;
        this.size = new CommonModule.Size(10, 10);
    }

    setSize(x, y) {
        this.size.x = x;
        this.size.y = y;
    }

    setColor(inColor) {
        this.color = inColor;
    }

    render(inFramework : Framework) {
        super.render(inFramework);

        let transform : CommonModule.Transform2 = this.getActor().transform;
        let position : CommonModule.Vector2 = this.getActor().position;
        let rect : CommonModule.Rect = this.getLocalRect();
        // let rect : CommonModule.Rect = this.getActor().getWorldRect(this.size);
        let canvasContext : CanvasRenderingContext2D = inFramework.getCanvasContext();
        let rotationMatrix : Matrix2 = this.getActor().transform.rotationMatrix;

        let v1 : Vector2 = rotationMatrix.multiply_with_vector2(new Vector2(rect.x1, rect.y1));
        let v2 : Vector2 = rotationMatrix.multiply_with_vector2(new Vector2(rect.x2, rect.y2));

        // draw
        canvasContext.strokeStyle = this.color;
        // canvasContext.strokeStyle = "blue";
        // canvasContext.strokeRect(rect.x1, rect.y1, rect.w, rect.h);
        // canvasContext.strokeRect(transform.position.x + v1.x, transform.position.y + v1.y, transform.position.x + v2.x, transform.position.y + v2.y);
        // canvasContext.strokeRect(position.x + v1.x, position.y + v1.y, position.x + v2.x, position.y + v2.y);
        // canvasContext.arc(position.x, position.y, 1, 0, 2 * Math.PI);
        canvasContext.moveTo(position.x + v1.x, position.y + v1.y);
        canvasContext.arc(position.x + v1.x, position.y + v1.y, 5, 0, 2 * Math.PI);
        canvasContext.moveTo(position.x + v2.x, position.y + v2.y);
        canvasContext.arc(position.x + v2.x, position.y + v2.y, 5, 0, 2 * Math.PI);
        canvasContext.stroke();
    }
}

// LineComponent
export class LineShapeComponent extends ShapeComponentBase {
    constructor(inActor) {
        super(inActor);
        this.type = ComponentType.Shape;
        this.size = new CommonModule.Size(10, 10);
        this.setColor("gray");
    }

    setSize(x, y) {
        this.size.x = x;
        this.size.y = y;
    }

    setColor(inColor) {
        this.color = inColor;
    }

    // getWorldRect() : CommonModule.Rect {
    //     let position : CommonModule.Vector2 = this.getActor().getPosition();
    //     let rect : CommonModule.Rect = new CommonModule.Rect(position.x, position.y, this.size.x, this.size.y);

    //     return rect;
    // }

    render(inFramework : Framework) {
        super.render(inFramework);

        let rect = this.getWorldRect();
        let canvasContext  = inFramework.getCanvasContext();

        // draw
        canvasContext.fillStyle = this.color;
        canvasContext.strokeStyle = this.color;

        canvasContext.beginPath();       // Start a new path
        canvasContext.moveTo(rect.x1, rect.y1);
        canvasContext.lineTo(rect.x2, rect.y2);
        canvasContext.stroke();
    }
}