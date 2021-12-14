import {Framework} from "./framework.js";
import * as ActorModule from "./actors.js";

// alert("ho");

let framework = new Framework();
framework.init();

// player
let playerActor = new ActorModule.CircleActor();
playerActor.setPosition(100, 100);

framework.setPlayerActor(playerActor);
framework.addActor(playerActor); 

// mon
// let monActor = new ActorModule.CircleActor();
// monActor.setPosition(100, 100);
// framework.addActor(monActor);

// block
let blockActor = new ActorModule.BlockActor();
blockActor.setPosition(100, 200); 
framework.addActor(blockActor);

framework.start();
