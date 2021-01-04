import '../assets/style/main.scss';
import Phaser from 'phaser';
import config from './conf/config';

let game;

window.onload = function () {
  game = new Phaser.Game(config);
};
