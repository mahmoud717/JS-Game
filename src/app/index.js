import '../assets/style/main.scss';
import Phaser from 'phaser';
import { handleScores, postScore } from './API/HandleAPI';
import config from './conf/config';

let game;

window.onload = function () {
  game = new Phaser.Game(config);
};

handleScores();
postScore('mahmoud', '60');