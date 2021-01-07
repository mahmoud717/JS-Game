import 'core-js/stable';
import 'babel-polyfill';
import 'regenerator-runtime/runtime';
import '../assets/style/main.scss';
import Phaser from 'phaser';
import config from './conf/config';


// eslint-disable-next-line no-unused-vars
let game;

window.onload = function run() {
  game = new Phaser.Game(config);
};
