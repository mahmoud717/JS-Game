import Phaser from 'phaser';

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.score = 0;
    this.scoreText = '';
    this.starsTotal = [];
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  addStars(name, arg, x, y, repeat) {
    const title = name;
    this[title] = arg.physics.add.group({
      key: 'starImage',
      repeat,
      setXY: { x, y, stepX: 105 },
    });

    this[title].children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
      child.setCollideWorldBounds(true);
    });
    arg.physics.add.collider(this[title], this.platforms);
    arg.physics.add.overlap(this.player, this[title], this.collectStar, null, arg);
  }

  addStarsGroup(arg) {
    this.addStars('stars1', arg, 0, 100, 3);
    this.addStars('stars2', arg, 320, 300, 3);
    this.addStars('stars3', arg, 930, 500, 2);
    this.addStars('stars2', arg, 420, 500, 3);
    this.starsTotal.push(this.stars1, this.stars2, this.stars3);
  }

  createBomb() {
    const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    const bomb = this.bombs.create(x, 16, 'bombImage');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  checkbomb() {
    this.bombs.children.iterate((child) => {
      if (child.y > (this.game.config.height - 100)) {
        child.destroy();
        this.createBomb();
      }
    });
  }

  checkStars() {
    let check = true;
    for (let i = 0; i < this.starsTotal.length; i += 1) {
      if (this.starsTotal[i].countActive(true) !== 0) {
        check = false;
      }
    }
    return check;
  }

  hitBomb(player) {
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

    this.platforms.create(600, 700, 'groundImage').refreshBody();
    this.platforms.create(200, 550, 'groundImage');
    this.platforms.create(500, 400, 'groundImage');
    this.platforms.create(120, 240, 'groundImage');
    this.platforms.create(1100, 600, 'groundImage');
    this.platforms.create(1100, 600, 'groundImage');
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
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.addStarsGroup(this);
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

    if (this.player.y > (this.game.config.height - 100)) {
      this.hitBomb(this.player);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-480);
    }

    if (this.bombs.countActive(true) > 0) {
      this.checkbomb();
    }

    if (this.score > 0) {
      if (this.checkStars()) {
        this.starsTotal = [];
        this.addStarsGroup(this);
        this.createBomb();
      }
    }
  }
}