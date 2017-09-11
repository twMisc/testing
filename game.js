	//Create the renderer
	var renderer = PIXI.autoDetectRenderer(1280, 720);
	
	//Create Stage
	var stage = new PIXI.Container();

	//Add the canvas to the HTML document
	document.body.appendChild(renderer.view);
	
	PIXI.loader
		.add("images/cat.png")
		.load(setup);
	
	var cat, cat2;
	var texts = ["這是第一句話","這是第二句話","這是第三句話","沒了"];
	var i = -1;
	space = keyboard(32);
	space.press = function() {
		if (cat.x <= 520 && cat.x>=480 && cat.y<=320 && cat.y >= 280){
			state = end;
			if (i>=3){
			textscene.visible = false;
			hitbox.interactive = false;
			i = -1;
			textscene.removeChild(message);
			SetFont();
			textscene.addChild(message);
			renderer.render(stage);
			state = play;
		}
		else{
			textscene.removeChild(message);
			i = i+1;
			SetFont();
			textscene.addChild(message);
			renderer.render(stage);
		}
		}
	}
	
	
	function setup() {
	  
	  gameScene = new PIXI.Container();
	  stage.addChild(gameScene);
	  
	  //Create the `cat` sprite
	  cat = new PIXI.Sprite.fromImage("images/cat.png");
	  cat.y = 96;
	  cat.vx = 0;
	  cat.vy = 0;
	  gameScene.addChild(cat);
	  
	  cat2 = new PIXI.Sprite.fromImage("images/cat.png");
	  cat2.x = 500;
	  cat2.y = 300;
	  gameScene.addChild(cat2);
	  
	  //Capture the keyboard arrow keys
	  var left = keyboard(37),
		  up = keyboard(38),
		  right = keyboard(39),
		  down = keyboard(40);
		  

		  
	  //Left arrow key `press` method
	  left.press = function() {

		//Change the cat's velocity when the key is pressed
		cat.vx = -5;
		cat.vy = 0;
	  };
	  left.release = function() {
		if (!right.isDown && cat.vy === 0) {
		  cat.vx = 0;
		}
	  };
	  
	  //Up
	  up.press = function() {
		cat.vy = -5;
		cat.vx = 0;
	  };
	  up.release = function() {
		if (!down.isDown && cat.vx === 0) {
		  cat.vy = 0;
		}
	  };

	  //Right
	  right.press = function() {
		cat.vx = 5;
		cat.vy = 0;
	  };
	  right.release = function() {
		if (!left.isDown && cat.vy === 0) {
		  cat.vx = 0;
		}
	  };

	  //Down
	  down.press = function() {
		cat.vy = 5;
		cat.vx = 0;
	  };
	  down.release = function() {
		if (!up.isDown && cat.vx === 0) {
		  cat.vy = 0;
		}
	  };
	
	  //Set the game state
	  state = play;

	  //Start the game loop
	  gameLoop();
	}
	
	var textscene = new PIXI.Container();
	stage.addChild(textscene);
	textscene.visible = false;
	
	//Create click area sprite
	var hitbox = new PIXI.Sprite();
	hitbox.hitArea = new PIXI.RoundedRectangle(10, 460, 1260, 250, 10);
	hitbox.on("pointerdown", onClick);
	textscene.addChild(hitbox);
	
	//draw rectangle
	var roundBox = new PIXI.Graphics();
	roundBox.lineStyle(4, 0xFFFFFF, 1);
	roundBox.beginFill(0xFFFFFF,0.4);
	roundBox.drawRoundedRect(0, 0, 1260, 250, 10)
	roundBox.endFill();
	roundBox.x = 10;
	roundBox.y = 460;
	textscene.addChild(roundBox);
	
	var message = new PIXI.Text();
	textscene.addChild(message);
	
	function keyboard(keyCode) {
	  var key = {};
	  key.code = keyCode;
	  key.isDown = false;
	  key.isUp = true;
	  key.press = undefined;
	  key.release = undefined;
	  //The `downHandler`
	  key.downHandler = function(event) {
		if (event.keyCode === key.code) {
		  if (key.isUp && key.press) key.press();
		  key.isDown = true;
		  key.isUp = false;
		}
		event.preventDefault();
	  };

	  //The `upHandler`
	  key.upHandler = function(event) {
		if (event.keyCode === key.code) {
		  if (key.isDown && key.release) key.release();
		  key.isDown = false;
		  key.isUp = true;
		}
		event.preventDefault();
	  };

	  //Attach event listeners
	  window.addEventListener(
		"keydown", key.downHandler.bind(key), false
	  );
	  window.addEventListener(
		"keyup", key.upHandler.bind(key), false
	  );
	  return key;
	}
		
	function gameLoop(){

	  //Loop this function 60 times per second
	  requestAnimationFrame(gameLoop);

	  //Update the current game state:
	  state();

	  //Render the stage
	  renderer.render(stage);
	}

	function play() {
			//Use the cat's velocity to make it move
			cat.x += cat.vx;
			cat.y += cat.vy
		}
	
	
	function end (){
		textscene.visible = true;
		hitbox.interactive = true;
	}
	
	function SetFont(){
		message = new PIXI.Text(
			texts[i],
			{fontFamily: "Arial", fontSize: 32, fill:"white"}
		);
		message.position.set(100,500);
		textscene.addChild(message);
		renderer.render(stage);
	}
	
	function onClick (){
		console.log("hit!");
		if (i>=3){
			textscene.visible = false;
			hitbox.interactive = false;
			i = -1;
			textscene.removeChild(message);
			SetFont();
			textscene.addChild(message);
			renderer.render(stage);
			state = play;
		}
		else{
			textscene.removeChild(message);
			i = i+1;
			SetFont();
			textscene.addChild(message);
			renderer.render(stage);
		}
	}
