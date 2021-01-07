import Phaser from 'phaser';
import gameScene from '../src/app/scenes/game';
import BootScene from '../src/app/scenes/boot';
import PreloaderScene from '../src/app/scenes/preloader';
import GameOverScene from '../src/app/scenes/gameOver';
import LeaderBoardScene from '../src/app/scenes/leaderboard';

function gameRun() {
  const config = {
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
  const game = new Phaser.Game(config);

  return game;
}

export default gameRun;
