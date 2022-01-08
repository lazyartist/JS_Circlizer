import {Framework} from "./framework.js";
import * as ActorModule from "./actors.js";

// alert("ho");

let framework = new Framework();
framework.init();

// // player
// let playerActor = new ActorModule.CircleActor();
// playerActor.setPosition(100, 100);
// framework.addActor(playerActor); 

// // block
// let blockActor = new ActorModule.BlockActor();
// blockActor.setPosition(100, 200); 
// framework.addActor(blockActor);

// lines
let lineActor1 = new ActorModule.LineActor();
lineActor1.setPosition(300, 300); 
framework.addActor(lineActor1);

// lines
let lineActor2 = new ActorModule.LineActor();
lineActor2.setPosition(400, 400); 
framework.addActor(lineActor2);

// framework.setPlayerActor(playerActor);
framework.start();
