import 'babel-polyfill';
import Phaser from 'phaser';
import gameScene from '../scenes/game';
import BootScene from '../scenes/boot';
import PreloaderScene from '../scenes/preloader';
import GameOverScene from '../scenes/gameOver';
import LeaderBoardScene from '../scenes/leaderboard';

export default {
  type: Phaser.WEBGL,
  parent: 'container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 900,
  },
  dom: {
    createContainer: true,
  },
  scene: [BootScene, gameScene, PreloaderScene, GameOverScene, LeaderBoardScene],
  resolution: 1,
  zoom: 1,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 350,
      },
    },
  },
};
