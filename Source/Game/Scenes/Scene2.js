'use strict';

class Scene2 extends Engine.Scene {
	
	/**
	 * Shows the end level screen
	 */
	showEndLevelScreen() {
        Engine.Stage.clearActors();
        Engine.UI.clearWidgets();

        new Engine.UI.Label({
            text: 'Level 2 completed with ' + Engine.Stage.scene.usedMoves + ' moves',
            textAlignX: 'center',
            textAlignY: 'center',
            textSize: UNIT / 2,
            x: Engine.Graphics.screenWidth / 2,
            y: UNIT * 4,
            width: UNIT * 8,
            height: UNIT
        });

        new Engine.UI.Button({
            text: 'NEXT →',
            width: UNIT * 2,
            height: UNIT,
            x: Engine.Graphics.screenWidth / 2,
            y: Engine.Graphics.screenHeight - UNIT * 4,
            textSize: UNIT / 3,
            textColor: new Engine.Math.Color(1, 1, 1),
            fillColor: new Engine.Math.Color(0, 0, 0),
            onClick: () => {
                Engine.Stage.loadNextScene();
            }
        });
    }
	
    /**
     * Starts the tutorial step 1
     */
	 
    startTutorial1() {
        let label1 = new Engine.UI.Label({
            text: 'Level 2',
            textSize: UNIT * 0.4,
            //textAlignX: 'end',
            textColor: new Engine.Math.Color(1, 1, 1),
            x: (Engine.Graphics.screenWidth / 2) ,
            y: UNIT * 2,
            width: Engine.Graphics.screenWidth * 0.7
        });
		
        let label2 = new Engine.UI.Label({
            text: 'Mix up those mushrooms! Turn on the guides if you need help.',
            textSize: UNIT * 0.4,
            //textAlignX: 'end',
            textColor: new Engine.Math.Color(1, 1, 1),
            x: (Engine.Graphics.screenWidth / 2) ,
            y: UNIT * 4,
            width: Engine.Graphics.screenWidth * 0.7
        });
		
		let button = new Engine.UI.Button({
            text: 'Next',
            x: Engine.Graphics.screenWidth / 2,
            y: UNIT * 12,
            textSize: UNIT * 0.6,
            textColor: new Engine.Math.Color(1, 1, 1),
            width: UNIT * 4,
            height: UNIT,
            onClick: () => { this.startLevel(); }
        });
    }
	
	/**
	 * Init
	 */
    startLevel() {
        this.usedMoves = 0;
		
        // Remove previous UI widgets
        Engine.UI.clearWidgets();    

        // Retry level
        let retryButton = new Engine.UI.Button({
            text: '↺ RETRY',
            width: UNIT * 2,
            height: UNIT,
            x: UNIT,
            y: UNIT / 2,
            textSize: UNIT / 3,
            textColor: new Engine.Math.Color(1, 1, 1),
            fillColor: new Engine.Math.Color(0, 0, 0),
            onClick: () => {
                Engine.Stage.reloadCurrentScene(); 
            }
        });

        // Skip level
        let skipButton = new Engine.UI.Button({
            text: 'SKIP ↷',
            width: UNIT * 2,
            height: UNIT,
            x: Engine.Graphics.screenWidth - UNIT,
            y: UNIT / 2,
            textSize: UNIT / 3,
            textColor: new Engine.Math.Color(1, 1, 1),
            fillColor: new Engine.Math.Color(0, 0, 0),
            onClick: () => {
                this.showEndLevelScreen();
            }
        });

        // Toggle colour guides
        let colorBlindButton = new Engine.UI.Button({
            text: 'Guides: ✕',
            width: UNIT * 2.5,
            height: UNIT,
            x: Engine.Graphics.screenWidth / 2,
            y: UNIT / 2,
            textColor: new Engine.Math.Color(1, 1, 1),
            fillColor: new Engine.Math.Color(0, 0, 0),
            textSize: UNIT / 3,
            onClick: () => {
                let isOn = colorBlindButton.text.indexOf('✓') < 0;

                colorBlindButton.text = 'Guides: ' + (isOn ? '✓' : '✕');

                for(let gridTile of Engine.Stage.getActors(Game.Actors.GridTile)) {
                    gridTile.lineRenderer1.isEnabled = isOn;
                    gridTile.lineRenderer2.isEnabled = isOn;
                }
            }
        });

        let background = new Engine.Actors.Actor();
        let backgroundSprite = background.addComponent('SpriteRenderer', {
            offset: new Engine.Math.Vector2(0, 0),
            width: Engine.Graphics.screenWidth,
            height: Engine.Graphics.screenHeight,
            useTiling: true
        });

        backgroundSprite.texture = './Content/Textures/T_ForestFloor_D.png';


        let targetGrid = new Game.Actors.TargetGrid();
        let playerGrid = new Game.Actors.PlayerGrid();

        let queue = new Game.Actors.Queue({
            isLooping: true,
            colors: [
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0, 0, 0.5),
				new Engine.Math.Color(0, 0, 0.5),
				new Engine.Math.Color(0.5, 0, 0),
				new Engine.Math.Color(0, 0.5, 0)
            ]
        });
		
		let fire = new Game.Actors.Fire();
    }
	
	    /**
     * Start
     */
    start() {
        this.startTutorial1();
    }
}

Game.Scenes.Scene2 = Scene2;
