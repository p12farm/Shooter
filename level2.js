var Level2 = {
	preload: function(){

        //  We need this because the assets are on github pages
        //  Remove the next 2 lines if running locally
        game.load.baseURL = 'https://p12farm.github.io/Shooter/';
        game.load.crossOrigin = 'p12farm';

        //loading background "Starfield"
        game.load.image('starfield', 'assets/starfield2.png');

        //loading ship and enemies
        game.load.image('ship', 'assets/ship.png');
        game.load.image('first_wave_enemy', 'assets/enemies/enemy2.png');
        game.load.image('second_wave_enemy', 'assets/enemies/enemy3.png');
        game.load.image('meteor', 'assets/comet.png');

        game.load.image('boss', 'assets/enemies/boss2.png');
        
        //loading bullets
        game.load.image('bullet', 'assets/bullets/bullet.png');
        game.load.image('laser-beam', 'assets/bullets/beam.png');
        game.load.image('second_enemy_bullet', 'assets/bullets/second-enemy-bullet.png');
        game.load.image('deathRay', 'assets/bullets/death-ray.png');
        
        //loading items
        game.load.image('bullet_upgrade', 'assets/bullets/upgrade.png');
        game.load.image('health_up', 'assets/bullets/shield.png');
        
        //loading background music
        game.load.audio('level2music', 'assets/music/waking_the_devil.mp3');
        game.load.audio('bossmusic', 'assets/music/doomed.mp3');
        game.load.audio('end', 'assets/music/twist.mp3');

        
        //loading sound effects
        game.load.audio('laser', 'assets/music/laser.mp3');
        game.load.audio('weapon_upgrade', 'assets/music/weapon_upgrade.mp3');
        game.load.audio('health_sound', 'assets/music/health.mp3');
        game.load.audio('player_dead', 'assets/music/player_dead.mp3');
        game.load.audio('enemydie', 'assets/music/enemydie.mp3');
        game.load.audio('meteor_colide', 'assets/music/enemydie2.mp3');
        game.load.audio('hit', 'assets/music/error.mp3');
        game.load.audio('beam', 'assets/music/beam.mp3');
        
        //loading visual effects
        game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);
        
        //loading the custom font
        game.load.bitmapFont('spacefont', 'assets/spacefont/spacefont.png', 'assets/spacefont/spacefont.fnt');
    },

    create: function(){

        level = 2;

        game.scale.pageAlignHorizontally = true;
                
        //  The scrolling starfield background
        starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        //  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        //  Our beam group
        laserBeam = game.add.group();
        laserBeam.enableBody = true;
        laserBeam.physicsBodyType = Phaser.Physics.ARCADE;
        laserBeam.createMultiple(800, 'laser-beam');
        laserBeam.setAll('anchor.x', 0.5);
        laserBeam.setAll('anchor.y', 1);
        laserBeam.setAll('outOfBoundsKill', true);
        laserBeam.setAll('checkWorldBounds', true);

        //  second wave enemy bullets
        secondEnemyBullets = game.add.group();
        secondEnemyBullets.enableBody = true;
        secondEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        secondEnemyBullets.createMultiple(30, 'second_enemy_bullet');
        secondEnemyBullets.setAll('alpha', 0.9);
        secondEnemyBullets.setAll('anchor.x', 0.5);
        secondEnemyBullets.setAll('anchor.y', 0.5);
        secondEnemyBullets.setAll('outOfBoundsKill', true);
        secondEnemyBullets.setAll('checkWorldBounds', true);
        secondEnemyBullets.forEach(function(enemyBullets){
            enemyBullets.body.setSize(20, 20);
        });

        bossBullets = game.add.group();
        bossBullets.enableBody = true;
        bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
        bossBullets.createMultiple(30, 'second_enemy_bullet');
        bossBullets.setAll('alpha', 0.9);
        bossBullets.setAll('anchor.x', 0.5);
        bossBullets.setAll('anchor.y', 0.5);
        bossBullets.setAll('outOfBoundsKill', true);
        bossBullets.setAll('checkWorldBounds', true);
        bossBullets.forEach(function(bossBullets){
            bossBullets.body.setSize(20, 20);
        });

        //upgrade item group
        bulletUpgrade = game.add.group();
        bulletUpgrade.enableBody = true;
        bulletUpgrade.physicsBodyType = Phaser.Physics.ARCADE;
        bulletUpgrade.createMultiple(2, 'bullet_upgrade');
        bulletUpgrade.setAll('anchor.x', 0.5);
        bulletUpgrade.setAll('anchor.y', 0.5);
        bulletUpgrade.setAll('scale.x', 0.5);
        bulletUpgrade.setAll('scale.y', 0.5);
        bulletUpgrade.setAll('outOfBoundsKill', true);
        bulletUpgrade.setAll('checkWorldBounds', true);
        bulletUpgrade.forEach(function(item){ 
            item.body.setSize(20, 20);
        });

        healthUp = game.add.group();
        healthUp.enableBody = true;
        healthUp.physicsBodyType = Phaser.Physics.ARCADE;
        healthUp.createMultiple(2, 'health_up');
        healthUp.setAll('anchor.x', 0.5);
        healthUp.setAll('anchor.y', 0.5);
        healthUp.setAll('scale.x', 1);
        healthUp.setAll('scale.y', 1);
        healthUp.setAll('outOfBoundsKill', true);
        healthUp.setAll('checkWorldBounds', true);
        healthUp.forEach(function(item){ 
            item.body.setSize(40, 40);
        });

        //  The hero!
        player = game.add.sprite(100, game.height / 2, 'ship');
        player.health = 100;
        player.weaponLevel = 1;
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
        player.body.drag.setTo(DRAG, DRAG);
        player.events.onKilled.add(function(){
            shipTrail.kill();
        });

        //First Enemy
        firstEnemy = game.add.group();
        firstEnemy.enableBody = true;
        firstEnemy.physicsBodyType = Phaser.Physics.ARCADE;
        firstEnemy.createMultiple(10, 'first_wave_enemy');
        firstEnemy.setAll('anchor.x', 0.5);
        firstEnemy.setAll('anchor.y', 0.5);
        firstEnemy.setAll('scale.x', 1);
        firstEnemy.setAll('scale.y', 1);
        firstEnemy.setAll('angle', 0);
        firstEnemy.setAll('outOfBoundsKill', true);
        firstEnemy.setAll('checkWorldBounds', true);
        firstEnemy.forEach(function(enemy){
            addEnemyEmitterTrail(enemy);
                enemy.damageAmount = 10;
                enemy.events.onKilled.add(function(){
                enemy.trail.kill();
            });
        });
    
        //Launching the first enemy
        game.time.events.add(1000, launchFirstEnemy);

        //Second enemy
        secondEnemy = game.add.group();
        secondEnemy.enableBody = true;
        secondEnemy.physicsBodyType = Phaser.Physics.ARCADE;
        secondEnemy.createMultiple(30, 'second_wave_enemy');
        secondEnemy.setAll('anchor.x', 0.5);
        secondEnemy.setAll('anchor.y', 0.5);
        secondEnemy.setAll('scale.x', 0.5);
        secondEnemy.setAll('scale.y', 0.5);
        secondEnemy.setAll('angle', 180);
        secondEnemy.forEach(function(enemy){
            enemy.damageAmount = 20;
        });

        //meteor group
        meteor = game.add.group();
        meteor.enableBody = true;
        meteor.physicsBodyType = Phaser.Physics.ARCADE;
        meteor.createMultiple(2, 'meteor');
        meteor.setAll('anchor.x', 0.5);
        meteor.setAll('anchor.y', 0.5);
        meteor.setAll('scale.x', 0.5);
        meteor.setAll('scale.y', 0.5);
        meteor.setAll('outOfBoundsKill', true);
        meteor.setAll('checkWorldBounds', true);
        meteor.forEach(function(meteor){
            meteor.body.setSize(30, 30, 30, 30);
            meteor.damageAmount = 40;
        });

        //  The boss
        boss = game.add.sprite(0, 0, 'boss');
        boss.exists = false;
        boss.alive = false;
        boss.anchor.setTo(0.5, 0.5);
        boss.damageAmount = 40;
        boss.angle = 180;
        boss.scale.x = 0.2;
        boss.scale.y = 0.2;
        game.physics.enable(boss, Phaser.Physics.ARCADE);
        boss.body.maxVelocity.setTo(100, 80);
        boss.dying = false;
        boss.finishOff = function() {
            if (!boss.dying) {
                boss.dying = true;
                bossDeath.x = boss.x;
                bossDeath.y = boss.y;
                bossDeath.start(false, 1000, 50, 20);
                //  kill boss after explotions
                game.time.events.add(1000, function(){
                    var explosion = explosions.getFirstExists(false);
                    var beforeScaleX = explosions.scale.x;
                    var beforeScaleY = explosions.scale.y;
                    var beforeAlpha = explosions.alpha;
                    explosion.reset(boss.body.x + boss.body.halfWidth, boss.body.y + boss.body.halfHeight);
                    explosion.alpha = 0.4;
                    explosion.scale.x = 3;
                    explosion.scale.y = 3;
                    var animation = explosion.play('explosion', 30, false, true);
                    animation.onComplete.addOnce(function(){
                        explosion.scale.x = beforeScaleX;
                        explosion.scale.y = beforeScaleY;
                        explosion.alpha = beforeAlpha;
                    });
                    boss.kill();
                    booster.kill();
                    boss.dying = false;
                    bossDeath.on = false;
                });
                bossMusic.stop();
                bossBullets.callAll('kill');
                firstEnemy.callAll('kill');
                secondEnemy.callAll('kill');
                meteor.callAll('kill');
                endLevel.play();
                
                game.time.events.add(4000, credits);

                
            }
        };

        boss.update = function() {
            if (!boss.alive) {
                booster.kill();
                return;
            }
            //  Fire
            bossBullet1 = bossBullets.getFirstExists(false);
            bossBullet2 = bossBullets.getFirstExists(false);
            if (bossBullet1 &&
                                
                game.time.now > 150) {
                this.lastShot = game.time.now;
                this.bullets--;
                bossBullet1.reset(this.x, this.y - this.height / 3);
                bossBullet1.damageAmount = 5;
                var angle1 = game.physics.arcade.moveToObject(bossBullet1, player, 300);
                bossBullet1.angle = game.math.radToDeg(angle1);
            }

            if (bossBullet2 &&
                                
                game.time.now > 150) {
                this.lastShot = game.time.now;
                this.bullets--;
                bossBullet2.reset(this.x, this.y - this.height / 6);
                bossBullet2.damageAmount = 5;
                var angle2 = game.physics.arcade.moveToObject(bossBullet2, player, 300);
                bossBullet2.angle = game.math.radToDeg(angle2);
            }
            
            if (boss.y > game.height / 2) {
                boss.body.acceleration.y = -100;
            }
            if (boss.y < game.height / 2) {
                boss.body.acceleration.y = 100;
            }
            
            if (boss.x > player.x + 200) {
                boss.body.acceleration.x = -50;
            } else if (boss.x < player.x + 400) {
                boss.body.acceleration.x = 300;
            } else {
                boss.body.acceleration.x = 0;
            }
                            
            //  Squish and rotate boss for illusion of "banking"
            var bank = boss.body.velocity.y / MAXSPEED;
            boss.scale.x = 0.6 - Math.abs(bank) / 3;
            boss.angle = 270 - bank * 20;
                            
            booster.x = boss.x + 100;
            booster.y = boss.y;
            booster.setAll('angle', 90);
                                                    
        }
        //  boss's boosters
        booster = game.add.emitter(boss.body.x, boss.body.y - boss.height / 2);
        booster.width = 0;
        booster.makeParticles('second_enemy_bullet');
        booster.forEach(function(p){
        p.crop({x: 120, y: 0, width: 45, height: 50});

        //  clever way of making 2 exhaust trails by shifing particles randomly left or right
        p.anchor.x = game.rnd.pick([1,-1]) * 0.95 + 0.5;
        p.anchor.y = 0.75;
        });
        booster.setXSpeed(0, 0);
        booster.setRotation(0,0);
        booster.setYSpeed(-30, -50);
        booster.gravity = 0;
        booster.setAlpha(1, 0.1, 400);
        booster.setScale(0.3, 0, 0.7, 0, 5000, Phaser.Easing.Quadratic.Out);
        boss.bringToTop();

        //  And some controls to play the game with
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  Add an emitter for the ship's trail
        shipTrail = game.add.emitter(player.x - 20, player.y, 400);
        shipTrail.height = 10;
        shipTrail.makeParticles('bullet');
        shipTrail.setYSpeed(20, -20);
        shipTrail.setXSpeed(-140, -120);
        shipTrail.setRotation(50, -50);
        shipTrail.setAlpha(1, 0.01, 800);
        shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000,
                Phaser.Easing.Quintic.Out);
        shipTrail.start(false, 5000, 10);

        //  An explosion pool
        explosions = game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(300, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);
        explosions.forEach( function(explosion) {
            explosion.animations.add('explosion');
        });

        //  Big explosion
        playerDeath = game.add.emitter(player.x, player.y);
        playerDeath.width = 50;
        playerDeath.height = 50;
        playerDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 10);
        playerDeath.setAlpha(0.9, 0, 800);
        playerDeath.setScale(0.1, 0.6, 0.1, 0.6, 1000, Phaser.Easing.Quintic.Out);

        //  Big explosion for boss
        bossDeath = game.add.emitter(boss.x, boss.y);
        bossDeath.width = boss.width / 2;
        bossDeath.height = boss.height / 2;
        bossDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 20);
        bossDeath.setAlpha(0.9, 0, 900);
        bossDeath.setScale(0.3, 1.0, 0.3, 1.0, 1000, Phaser.Easing.Quintic.Out);

        //  Shields stat
        shields = game.add.bitmapText(game.world.width - 250, 10, 'spacefont', '' + player.health +'%', 35);
        shields.render = function () {
            shields.text = 'Shields: ' + Math.max(player.health, 0) +'%';
        };
        shields.render();

        //  Score
        scoreText = game.add.bitmapText(10, 10, 'spacefont', '', 35);
        scoreText.render = function () {
            scoreText.text = 'Score: ' + score;
        };
        scoreText.render();

        //  Game over text
        gameOver = game.add.bitmapText(game.world.centerX, game.world.centerY, 'spacefont', 'GAME OVER!', 100);
        gameOver.x = gameOver.x - gameOver.textWidth / 2;
        gameOver.y = gameOver.y - gameOver.textHeight / 3;
        gameOver.visible = false;

        //Adding and playing level 1 background music
        music = game.add.audio('level2music', 1, true);
        music.play();
        bossMusic = game.add.audio('bossmusic', 1, true);

        //adding the sound effects
        endLevel = game.add.audio('end');
        laser = game.add.audio('laser');
        beam = game.add.audio('beam');
        playerDead = game.add.audio('player_dead');
        enemydie = game.add.audio('enemydie');
        meteorColide = game.add.audio('meteor_colide');
        hit = game.add.audio('hit');
        weaponApgradeEffect = game.add.audio('weapon_upgrade');
        healthSound = game.add.audio('health_sound');

        laser.volume = 0.8;
        weaponApgradeEffect.volume = 0.5;
    },

    update: function() {

        //  second wave enemies come in after a score of 1000
        if (!secondEnemyLaunched && score > 1000) {
            secondEnemyLaunched = true;
            launchSecondEnemy();
            //  Not slowing green enemies
            //firstEnemySpacing *= 2;
        }

        if(bossLaunched && boss.health < 5){
            music.stop();
            boss.finishOff();
        }

        //  Launch boss
		if (!bossLaunched && score > 15000) {
            firstEnemySpacing = 5000;
            secondEnemySpacing = 12000;
            //  dramatic pause before boss
            music.stop();
			game.time.events.add(2000, function(){
                bossMusic.play();
				bossLaunched = true;
				launchBoss();
			});
		}

        //  Scroll the background
        starfield.tilePosition.x -= 2;

        //  Reset the player, then check for movement keys
        player.body.acceleration.y = 0;
        player.body.acceleration.x = 0;
        if (cursors.up.isDown) {
            player.body.acceleration.y = -ACCLERATION;
        } else if (cursors.down.isDown) {
            player.body.acceleration.y = ACCLERATION;
        } else if (cursors.left.isDown) {
            player.body.acceleration.x = -ACCLERATION;
        } else if (cursors.right.isDown) {
            player.body.acceleration.x = ACCLERATION;
        }

        //  Stop at screen edges
        if (player.x > game.width - 30) {
            player.x = game.width - 30;
            player.body.acceleration.x = 0;
        }
        if (player.x < 30) {
            player.x = 30;
            player.body.acceleration.x = 0;
        }
        if (player.y > game.height - 15) {
            player.y = game.height - 15;
            player.body.acceleration.y = 0;
        }
        if (player.y < 15) {
            player.y = 15;
            player.body.acceleration.y = 0;
        }

        //  Fire bullet
        if (player.alive && fireButton.isDown) {
            fireBullet();
        }

        //  Keep the shipTrail lined up with the ship
        shipTrail.y = player.y;
        shipTrail.x = player.x - 20;

        //Checcking collisions
        game.physics.arcade.overlap(player, bulletUpgrade, weaponUpgrade, null, this);
        game.physics.arcade.overlap(player, healthUp, healthUpgrade, null, this);

        game.physics.arcade.overlap(bullets, meteor, bulletMeteorCollide, null, this);
        game.physics.arcade.overlap(laserBeam, meteor, bulletMeteorCollide, null, this);
        game.physics.arcade.overlap(secondEnemyBullets, meteor, bulletMeteorCollide, null, this);
        game.physics.arcade.overlap(bossBullets, meteor, bulletMeteorCollide, null, this);

        game.physics.arcade.overlap(player, firstEnemy, shipCollide, null, this);
        game.physics.arcade.overlap(player, meteor, shipCollide, null, this);
        game.physics.arcade.overlap(player, boss, bossCollide, null, this);
        game.physics.arcade.overlap(firstEnemy, bullets, hitEnemy, null, this);
        game.physics.arcade.overlap(firstEnemy, laserBeam, hitEnemy, null, this);
        game.physics.arcade.overlap(secondEnemy, laserBeam, hitEnemy, null, this);
        game.physics.arcade.overlap(boss, laserBeam, hitEnemy, null, this);

        game.physics.arcade.overlap(player, secondEnemy, shipCollide, null, this);
        game.physics.arcade.overlap(secondEnemy, bullets, hitEnemy, null, this);
        game.physics.arcade.overlap(secondEnemyBullets, player, enemyHitsPlayer, null, this);

        game.physics.arcade.overlap(boss, bullets, hitEnemy, bossHitTest, this);
        game.physics.arcade.overlap(bossBullets, player, enemyHitsPlayer, null, this);

        //  Game over?
        if (! player.alive && gameOver.visible === false) {
            gameOver.visible = true;
            gameOver.alpha = 0;
            var fadeInGameOver = game.add.tween(gameOver);
            fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
            fadeInGameOver.onComplete.add(setResetHandlers);
            fadeInGameOver.start();
            function setResetHandlers() {
                //  The "click to restart" handler
                tapRestart = game.input.onTap.addOnce(_restart,this);
                spaceRestart = fireButton.onDown.addOnce(_restart,this);
                function _restart() {
                    tapRestart.detach();
                    spaceRestart.detach();
                    restart();
                }
            }
        }
    }
}