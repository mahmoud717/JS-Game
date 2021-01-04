import Phaser from 'phaser';
import gameScene from '../scenes/game';
import BootScene from '../scenes/boot';
// import gameOverScene from '../scenes/gameOver';
// import leaderboardScene from '../scenes/leaderboard';

export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 900,
  },
  scene: [BootScene, gameScene],
  resolution: 1,
  zoom: 1,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 350,
      },
    },
  },
};
