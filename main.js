import {Framework} from "./modules/framework.js";
import * as ActorModule from "./modules/actors.js";

let framework = new Framework();
framework.init();

// player
let playerActor = new ActorModule.CircleActor();
framework.addActor(playerActor);
framework.setPlayerActor(playerActor);

// mon
// let monActor = new ActorModule.CircleActor();
// monActor.setPosition(100, 100);
// framework.addActor(monActor);

// block
let blockActor = new ActorModule.BlockActor();
blockActor.setPosition(0, 30);
framework.addActor(blockActor);

framework.start();
