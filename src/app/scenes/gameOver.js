import Phaser from 'phaser';
import { postScore } from '../API/HandleAPI';
import restartImage from '../../assets/imgs/sprBtnRestart.png';
import leaderboardImage from '../../assets/imgs/sprBtnRecord.png';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {
    this.load.image('sprBtnRestart', restartImage);
    this.load.image('sprBtnRecord', leaderboardImage);
  }

  create() {
    this.scores = localStorage.getItem('score');
    this.add.text(515, 400, `Score: ${this.scores}`, {
      color: '#d0c600', fontFamily: 'sans-serif', fontSize: '30px', lineHeight: 1.3, align: 'center',
    });

    // restart button
    this.btnRestart = this.add.sprite(460, 500, 'sprBtnRestart');

    this.btnRestart.setInteractive();
    this.createButton(this.btnRestart, 'sprBtnRestart', 'sprBtnRestart', 'sprBtnRestart');
    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.scene.start('GameScene');
    }, this);

    // record button
    this.btnRecord = this.add.sprite(700, 500, 'sprBtnRecord');

    this.btnRecord.setInteractive();
    this.createButton(this.btnRecord, 'sprBtnRecord', 'sprBtnRecord', 'sprBtnRecord');
    this.btnRecord.on('pointerup', () => {
      this.btnRecord.setTexture('sprBtnRecord');
      this.scene.start('LeaderBoardScene');
    }, this);


    this.title = this.add.text(500, 20, 'Game Over', { fontSize: '32px', fill: '#fff' });

    this.userName = '';

    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" id="nameField" placeholder="Enter your name" style="font-size: 1.5rem width: ${this.game.config.width * 0.25}"><br>
        <input type="button" name="submitButton" value="Submit Score" style="font-size: 1.5rem">
        `;


    const element = this.add.dom(280, 480, div);
    element.setVisible(true);
    element.addListener('click');

    element.on('click', (event) => {
      if (event.target.name === 'submitButton') {
        const inputText = document.getElementById('nameField');
        if (inputText.value !== '') {
          element.removeListener('click');
          element.setVisible(false);
          this.userName = inputText.value;
          this.submit = postScore(this.userName, this.scores);
          this.submit.then(() => {
            this.scene.start('LeaderBoardScene');
          });
        }
      }
    });
  }

  createButton(btn, spr, sprHover, sprDown) {
    btn.on('pointerover', () => {
      btn.setTexture(sprHover);
    }, this);

    btn.on('pointerout', () => {
      btn.setTexture(spr);
    });

    btn.on('pointerdown', () => {
      btn.setTexture(sprDown);
    }, this);
  }
}

export default SceneGameOver;