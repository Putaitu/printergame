'use strict';

/**
 * The tutorial level
 */
class Scene1 extends Engine.Scene {
	/**
	 * Shows the end level screen
	 */
	showEndLevelScreen() {
        Engine.Stage.clearActors();
        Engine.UI.clearWidgets();

        new Engine.UI.Label({
            text: 'Level 1 completed with ' + Engine.Stage.scene.usedMoves + ' moves',
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
            text: 'Drag and drop the glowing mushrooms to the floor tile to add color, mix color so it matches with the guide',
            textSize: UNIT * 0.4,
            //textAlignX: 'end',
            textColor: new Engine.Math.Color(1, 1, 1),
            x: (Engine.Graphics.screenWidth / 2) ,
            y: UNIT * 2,
            width: Engine.Graphics.screenWidth * 0.7
        });
        
        let image1 = new Engine.UI.Image({
            width: UNIT * 7,
            height: UNIT * 7,
            source: './Content/Textures/T_Tutorial1_D.png',
            x: Engine.Graphics.screenWidth / 2,
            y: Engine.Graphics.screenHeight /2
        });
        
        let button = new Engine.UI.Button({
            text: 'Next',
            x: Engine.Graphics.screenWidth / 2,
            y: UNIT * 12,
            textSize: UNIT * 0.6,
            textColor: new Engine.Math.Color(1, 1, 1),
            width: UNIT * 4,
            height: UNIT,
            onClick: () => { this.startTutorial2(); }
        });
    }
    
    /**
     * Starts tutorial step 2
     */
    startTutorial2() {
        // Remove previous UI widgets
        Engine.UI.clearWidgets();       

        let label1 = new Engine.UI.Label({
            text: 'Drag mushrooms from the tray to the fire to discard, hold and drag to remove a mushroom from the floor tile  ',
            textSize: UNIT * 0.4,
            //textAlignX: 'end',
            textColor: new Engine.Math.Color(1, 1, 1),
            x: (Engine.Graphics.screenWidth / 2) ,
            y: UNIT * 2,
            width: Engine.Graphics.screenWidth * 0.7
        });
        
        let image1 = new Engine.UI.Image({
            width: UNIT * 7,
            height: UNIT * 7,
            source: './Content/Textures/T_Tutorial2_D.png',
            x: Engine.Graphics.screenWidth / 2,
            y: Engine.Graphics.screenHeight /2
        });
        
        let button = new Engine.UI.Button({
            text: 'Next',
            x: Engine.Graphics.screenWidth / 2,
            y: UNIT * 12,
            textSize: UNIT * 0.6,
            textColor: new Engine.Math.Color(1, 1, 1),
            width: UNIT * 4,
            height: UNIT,
            onClick: () => { this.startTutorial3(); }
        });
    }
    
        /**
     * Starts tutorial step 3
     */
    startTutorial3() {
        // Remove previous UI widgets
        Engine.UI.clearWidgets();       

        let label1 = new Engine.UI.Label({
            text: 'The "Color guide mode" helps to get you familiar to RGB color mixing, it is also a color blind mode',
            textSize: UNIT * 0.4,
            //textAlignX: 'end',
            textColor: new Engine.Math.Color(1, 1, 1),
            x: (Engine.Graphics.screenWidth / 2) ,
            y: UNIT * 2,
            width: Engine.Graphics.screenWidth * 0.7
        });
        
        let image1 = new Engine.UI.Image({
            width: UNIT * 7,
            height: UNIT * 7,
            source: './Content/Textures/T_Tutorial3_D.png',
            x: Engine.Graphics.screenWidth / 2,
            y: Engine.Graphics.screenHeight /2
        });
        
        let button = new Engine.UI.Button({
            text: 'Start',
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
     * Start level
     */
    startLevel() {
        this.usedMoves = 0;

        // Remove previous UI widgets
        Engine.UI.clearWidgets();       

        // By default, set colour guides to "ON"
        setTimeout(() => {
            for(let gridTile of Engine.Stage.getActors(Game.Actors.GridTile)) {
                gridTile.lineRenderer1.isEnabled = true;
                gridTile.lineRenderer2.isEnabled = true;
            }
        }, 10);
       
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
            text: 'Guides: ✓',
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

        let targetGrid = new Game.Actors.TargetGrid({
            size: 3,
            colors: [
                [new Engine.Math.Color(0.5, 0, 0),new Engine.Math.Color(1, 0, 0), new Engine.Math.Color(0, 0.5, 0)],
                [new Engine.Math.Color(0, 1, 0),new Engine.Math.Color(0, 0, 0.5), new Engine.Math.Color(0, 0, 1)],
                [new Engine.Math.Color(0.5, 0.5, 0),new Engine.Math.Color(0.5, 0, 0.5), new Engine.Math.Color(0, 0.5, 0.5)]
            ]
        });
        
        let playerGrid = new Game.Actors.PlayerGrid({size: 3});
        
        let queue = new Game.Actors.Queue({
            isLooping: true,
            colors: [
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0.5, 0, 0),
                new Engine.Math.Color(0, 0, 0.5),
                new Engine.Math.Color(0, 0.5, 0),
                new Engine.Math.Color(0, 0, 0.5)
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

Game.Scenes.Scene1 = Scene1;
