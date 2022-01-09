import { Framework } from "../../engine/framework.js";
import { Matrix2, Vector2 } from "../../engine/common.js";
import { RotateActor } from "./RotateActor.js";
let framework = new Framework();
framework.init();
// player
// let playerActor = new ActorModule.CircleActor();
// playerActor.setPosition(100, 100);
// framework.addActor(playerActor); 
// // block
let rotateActor = new RotateActor();
rotateActor.setPosition(100, 200);
framework.addActor(rotateActor);
framework.possessActor(rotateActor);
framework.start();
// test
let position = new Vector2(300, 300);
let point = new Vector2(50, 0);
for (let index = 0; index < 360; index += 10) {
    let r = Matrix2.rotation_by_degree(index);
    let v = r.multiply_with_vector2(point);
    // console.dir(v);
    if (0 == index) {
        framework.canvasContext.fillStyle = "red";
        framework.canvasContext.strokeStyle = "red";
    }
    else {
        framework.canvasContext.fillStyle = "green";
        framework.canvasContext.strokeStyle = "green";
    }
    framework.canvasContext.beginPath();
    framework.canvasContext.arc(position.x + v.x, position.y + v.y, 1, 0, 2 * Math.PI);
    framework.canvasContext.stroke();
}
//# sourceMappingURL=Test_MatrixMain.js.map