import Phaser from 'phaser';
import GameText from '../utils/gameText';
import skyImage from '../../assets/imgs/sky.png';
import starImage from '../../assets/imgs/star.png';
import groundImage from '../../assets/imgs/platform.png';
import dudeImage from '../../assets/imgs/dude.png';
import bombImage from '../../assets/imgs/bomb.png';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.sky = this.add.image(600, 450, 'skyImage');
    this.sky.setScale(1.5);
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(240, 270, 320, 50);

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.zone = this.add.zone(this.width / 2, this.height / 2);

    this.loadingText = new GameText(this, 0, -65, 'Loading...', this.zone, '22px', '#fff');

    this.percentText = new GameText(this, 0, -5, '0%', this.zone, '18px', '#fff');

    this.assetText = new GameText(this, -125, 50, '', this.zone, '18px', '#fff');

    this.load.on('progress', (value) => {
      this.percentText.text.setText(`${parseInt((value * 100), 10)}%`);
      this.progressBar.clear();
      this.progressBar.fillStyle(0xffffff, 1);
      this.progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      this.assetText.text.setText(`Loading asset: ${file.key}`);
    });
    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressBox.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
      this.assetText.destroy();
      this.ready();
      this.time.delayedCall(750, this.ready, [], this);
    });


    this.load.image('starImage', starImage);
    this.load.image('groundImage', groundImage);
    this.load.spritesheet('dudeImage', dudeImage, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image('bombImage', bombImage);
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('GameScene');
    }
  }
}