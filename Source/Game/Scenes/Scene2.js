'use strict';

class Scene2 extends Engine.Scene {
    start() {
        Engine.UI.clearWidgets();
        
        let colorBlindButton = new Engine.UI.Button({
            text: 'Color Guides: OFF',
            width: UNIT * 3,
            height: UNIT / 2,
            x: Engine.Graphics.screenWidth - UNIT * 2,
            y: UNIT,
            textColor: new Engine.Math.Color(1, 1, 1),
            textSize: UNIT / 4,
            onClick: () => {
                let isOn = colorBlindButton.text.indexOf('ON') < 0;

                colorBlindButton.text = 'Colour Guides: ' + (isOn ? 'ON' : 'OFF');

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
        let queue = new Game.Actors.Queue();
    }
}

Game.Scenes.Scene2 = Scene2;