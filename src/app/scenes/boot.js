import Phaser from 'phaser';

import skyImage from '../../assets/imgs/sky.png';
import starImage from '../../assets/imgs/star.png';
import groundImage from '../../assets/imgs/platform.png';
import dudeImage from '../../assets/imgs/dude.png';
import bombImage from '../../assets/imgs/bomb.png';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('skyImage', skyImage);
    this.load.image('starImage', starImage);
    this.load.image('groundImage', groundImage);
    this.load.spritesheet('dudeImage', dudeImage, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image('bombImage', bombImage);
  }

  create() {
    this.load.image('logo', skyImage);
    const description = 'Welcome to the marathon... Press ENTER to start the game.';
    this.title = this.add.text(16, 16, description, { fontSize: '32px', fill: '#fff' });
    this.tweens.add({
      targets: this.title,
      alpha: { from: 0, to: 1 },
      ease: 'Linear',
      duration: 4000,
      repeat: 0,
      yoyo: true,
      onComplete: () => {
        this.scene.start('GameScene');
      },
    });

    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    if (this.keyEnter.isDown) {
      this.scene.start('GameScene');
      console.log('hello');
    }
  }
}

export default BootScene;