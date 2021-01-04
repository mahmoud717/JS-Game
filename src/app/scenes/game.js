import Phaser from 'phaser';

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.score = 0;
    this.scoreText = '';
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  addStars(arg) {
    this.stars = arg.physics.add.group({
      key: 'starImage',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 105 },
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
      child.setCollideWorldBounds(true);
    });
    arg.physics.add.collider(this.stars, this.platforms);
    arg.physics.add.overlap(this.player, this.stars, this.collectStar, null, arg);
  }

  createBomb() {
    const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    const bomb = this.bombs.create(x, 16, 'bombImage');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  hitBomb(player, bomb, score) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    localStorage.setItem('score', JSON.stringify(this.score));

    this.gameOver = true;
    this.score = 0;
    this.scene.start('GameOverScene');
  }

  create() {
    this.sky = this.add.image(600, 450, 'skyImage');
    this.sky.setScale(1.5);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 850, 'groundImage').setScale(3).refreshBody();

    this.platforms.create(600, 700, 'groundImage');
    this.platforms.create(200, 550, 'groundImage');
    this.platforms.create(1100, 600, 'groundImage');

    this.player = this.physics.add.sprite(100, 450, 'dudeImage');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dudeImage', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dudeImage', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dudeImage', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.player.body.setGravityY(300);

    this.physics.add.collider(this.player, this.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.addStars(this);


    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-480);
    }

    if (this.stars.countActive(true) === 0) {
      this.addStars(this);
      this.createBomb();
    }
  }
}