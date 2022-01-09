import { Framework } from "../engine/framework.js";
import * as ActorModule from "../engine/actors.js";
import { Matrix2, Vector2 } from "../engine/common.js";

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

framework.possessActor(lineActor);
// framework.setPlayerActor(playerActor);

framework.start();
