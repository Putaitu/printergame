'use strict';

/**
 * A class for performing color operations
 */
class Color {
    // Enum: Rule
    static get RULE() {
        return {
            NONE: 0,
            NO_GREYSCALE: 1
        }
    }
    
    // Presets
    static get BLACK() { return new Color(0, 0, 0, 1); }
    static get RED() { return new Color(1, 0, 0, 1); }
    static get GREEN() { return new Color(0, 1, 0, 1); }
    static get BLUE() { return new Color(0, 0, 1, 1); }

    /**
     * Constructor
     */
    constructor(r, g, b, a) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;

        if(this.r > 1) { this.r = 1; };
        if(this.g > 1) { this.g = 1; };
        if(this.b > 1) { this.b = 1; };
        if(this.a > 1) { this.a = 1; };
        
        if(this.r < 0) { this.r = 0; };
        if(this.g < 0) { this.g = 0; };
        if(this.b < 0) { this.b = 0; };
        if(this.a < 0) { this.a = 0; };
    }

    /**
     * Returns negative colour
     *
     * @returns {Color} Negative
     */
    getNegative() {
        return new Color(1 - this.r, 1 - this.g, 1 - this.b, this.a);
    }

    /**
     * Returns true if this colour equals the other
     *
     * @param {Color} color
     *
     * @returns {Boolean} Is equal
     */
    equals(color) {
        return this.compare(color) === 0;
    }
        
    /**
     * Compares to another colour
     *
     * @param {Color} color
     *
     * @returns {Number} Difference
     */
    compare(color) {
        let diff = 0;

        diff += Math.abs(this.r - color.r);
        diff += Math.abs(this.g - color.g);
        diff += Math.abs(this.b - color.b);
        diff += Math.abs(this.a - color.a);

        return diff;
    }

    /**
     * Adds one color to another
     *
     * @param {Color} a
     * @param {Color} b
     *
     * @returns {Color} Result
     */
    static add(a, b) {
        return new Color(a.r + b.r, a.g + b.g, a.b + b.b, a.a + b.a);
    }
    
    /**
     * Subtracts one color to another
     *
     * @param {Color} a
     * @param {Color} b
     *
     * @returns {Color} Result
     */
    static subtract(a, b) {
        return new Color(a.r - b.r, a.g - b.g, a.b - b.b, (a.a >= 1 && b.a >= 1 ? 1 : a.a - b.a));
    }

    /**
     * Gets a random color
     *
     * @param {Number} divisableBy
     *
     * @returns {Color} Color
     */
    static getRandom(divisableBy = 1, rule = Color.RULE.NONE) {
        let dec = 1 / divisableBy;
        let generate = () => {
            return new Color(
                parseFloat((Math.round(Math.random() * dec) / dec).toFixed(1)),
                parseFloat((Math.round(Math.random() * dec) / dec).toFixed(1)),
                parseFloat((Math.round(Math.random() * dec) / dec).toFixed(1)),
                1
            );
        };

        let color = generate();

        // Rule: No greys
        while(rule === Color.RULE.NO_GREYSCALE && color.isGreyscale()) {
            color = generate();
        }

        return color;
    }
   
    /**
     * Gets whether this colour is greyscale
     *
     * @returns {Boolean} Is greyscale
     */
    isGreyscale() {
        return this.r === this.g && this.g === this.b;
    }

    /**
     * Gets a Color value from a Hex string
     *
     * @param {String} hex
     *
     * @returns {Color} Color
     */
    static fromHex(hex) {
        hex = hex.replace('#', '');

        let components = hex.match(/.{1,2}/g);

        for(let i in components) {
            components[i] = parseInt(components[i], 16) / 255;
        }

        return new Color(components[0], components[1], components[2]);
    }
    
    /**
     * Gets a Color value from an RGBA string
     *
     * @param {String} rgba
     *
     * @returns {Color} Color
     */
    static fromRGB(rgba) {
        let components = rgba.match(/\d{1,2}/g);

        for(let i in components) {
            components[i] = parseInt(components[i]);

            if(i === 3) { continue; }

            components[i] = components[i] / 255;
        }

        return new Color(components[0], components[1], components[2], components[3] || 1);
    }

    /**
     * Gets a hex value
     *
     * @returns {String} Hex
     */
    toHex() {
        function componentToHex(c) {
            var hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
        
        return '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
    }
   
    /**
     * Gets an RGB value
     *
     * @returns {String} RGB
     */
    toRGB() {
        return 'rgba(' + Math.round(this.r * 255) + ',' + Math.round(this.g * 255) + ',' + Math.round(this.b * 255) + ',' + this.a + ')';
    }
}

Engine.Math.Color = Color;
