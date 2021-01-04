import Phaser from 'phaser';
import skyImage from '../../assets/imgs/sky.png';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('skyImage', skyImage);
  }

  create() {
    this.scene.start('Preloader');
  }
}

export default BootScene;