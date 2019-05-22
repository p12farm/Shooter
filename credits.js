var Credits = {
	preload: function(){
        game.load.audio('credits', 'assets/music/warped.mp3');
	},

	create: function(){ 
		
		endtheme = game.add.audio('credits', 1, true);
		endtheme.play();
		game.stage.backgroundColor = '#000000';
		game.scale.setGameSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
		end1 = game.add.bitmapText(250, 800, 'spacefont', 'It was fun creating this game', 40);
		end2 = game.add.bitmapText(250, 1000, 'spacefont', 'CREDITS', 30);
		end3 = game.add.bitmapText(250, 1200, 'spacefont', 'it may have some bugs...', 25);
		end4 = game.add.bitmapText(250, 1400, 'spacefont', 'of course it can be better', 25);
		end5 = game.add.bitmapText(250, 1600, 'spacefont', 'but...', 25);
		end6 = game.add.bitmapText(250, 1800, 'spacefont' , 'I like it.', 25);
		end7 = game.add.bitmapText(250, 2000, 'spacefont', 'so..', 25);
		end8 = game.add.bitmapText(250, 2200,'spacefont', 'I hope you enjoyed it', 25);
		end9 = game.add.bitmapText(250, 2400,'spacefont', 'Thank you',25);
		end10 = game.add.bitmapText(250, 2600,'spacefont', 'Till the next game.', 25);

		game.time.events.add(20000, menu);
},
	update: function(){

		end1.position.y = end1.position.y-2;
		end2.position.y = end2.position.y-2;
		end3.position.y = end3.position.y-2;
		end4.position.y = end4.position.y-2;
		end5.position.y = end5.position.y-2;
		end6.position.y = end6.position.y-2;
		end7.position.y = end7.position.y-2;
		end8.position.y = end8.position.y-2;
		end9.position.y = end9.position.y-2;
		end10.position.y = end10.position.y-2
	}

}