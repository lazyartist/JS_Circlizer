import { Framework } from "./framework.js";
import * as ActorModule from "./actors.js";
import { Matrix2, Vector2 } from "./common.js";
// alert("ho");
let framework = new Framework();
framework.init();
// player
// let playerActor = new ActorModule.CircleActor();
// playerActor.setPosition(100, 100);
// framework.addActor(playerActor); 
// // block
// let blockActor = new ActorModule.BlockActor();
// blockActor.setPosition(100, 200); 
// framework.addActor(blockActor);
// lines
let lineActor = new ActorModule.LineActor(50, 50);
lineActor.setPosition(300, 200);
framework.addActor(lineActor);
let lineActor1 = new ActorModule.LineActor(50, 0);
lineActor1.setPosition(0, 300);
framework.addActor(lineActor1);
let lineActor2 = new ActorModule.LineActor(50, 50);
lineActor2.setPosition(100, 300);
framework.addActor(lineActor2);
let lineActor3 = new ActorModule.LineActor(0, 50);
lineActor3.setPosition(200, 300);
framework.addActor(lineActor3);
let lineActor4 = new ActorModule.LineActor(-50, 50);
lineActor4.setPosition(300, 300);
framework.addActor(lineActor4);
let lineActor5 = new ActorModule.LineActor(0, -50);
lineActor5.setPosition(400, 300);
framework.addActor(lineActor5);
let lineActor6 = new ActorModule.LineActor(-50, -50);
lineActor6.setPosition(500, 300);
framework.addActor(lineActor6);
let lineActor7 = new ActorModule.LineActor(-50, 0);
lineActor7.setPosition(600, 300);
framework.addActor(lineActor7);
framework.setPlayerActor(lineActor);
// framework.setPlayerActor(playerActor);
// framework.start();
// test
let position = new Vector2(200, 200);
let point = new Vector2(0, 100);
for (let index = 0; index < 360; index += 10) {
    let r = Matrix2.createRotation_by_degree(index);
    let v = r.Multiply_With_Vector2D(point);
    console.dir(v);
    framework.canvasContext.fillStyle = "red";
    framework.canvasContext.strokeStyle = "red";
    framework.canvasContext.beginPath();
    framework.canvasContext.arc(position.x + v.x, position.y + v.y, 1, 0, 2 * Math.PI);
    framework.canvasContext.stroke();
}
//# sourceMappingURL=main.js.map