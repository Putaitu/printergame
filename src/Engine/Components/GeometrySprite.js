'use strict';

/**
 * A component for drawing simple geometry
 */
class GeometrySprite extends Engine.Components.Component {
    /**
     * Constructor
     */
    constructor(config) {
        super(config);
    }
   
    /**
     * Defaults
     */
    defaults() {
        super.defaults();

        this.radius = 10;
        this.fillColor = '#000000';
        this.type = 'circle';
		this.pivot = { x: 0.5, y: 0.5 };
    }

    /**
     * Draw
     */
    draw() {
        switch(this.type) {
            case 'circle':
                Engine.Graphics.drawCircle(
                    this.actor.position.x + this.position.x + this.radius - this.pivot.x * (this.radius * 2),
                    this.actor.position.y + this.position.y + this.radius - this.pivot.y * (this.radius * 2),
                    this.radius,
					this.strokeWidth,
                    this.strokeColor,
					this.fillColor
                );
			
			case 'rectangle' :
				Engine.Graphics.drawRectangle (
                    this.actor.position.x + this.position.x - this.pivot.x * this.width,
                    this.actor.position.y + this.position.y - this.pivot.y * this.height,
                    this.width,
					this.height,
                    this.strokeWidth,
					this.strokeColor,
					this.fillColor
				) ;
				
			case 'line' :
				Engine.Graphics.drawLine (
                    this.actor.position.x + this.position.x,
                    this.actor.position.y + this.position.y,
                    this.moveX,
					this.moveY,
					this.strokeWidth,
					this.strokeColor
				) ;
				
                break;
        }
    }
}

Engine.Components.GeometrySprite = GeometrySprite;
