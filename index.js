import Base from 'gradient-base'

/**
 * @typedef {(number[][]|string[])} Colors - colors input 
 */

/**
 * @typedef {object} BaseOptions - Base configuration object
 * @property {string} interpolation - 'linear' or 'bezier'
 * @property {string} [mode] - 'none', 'lch', 'lab', 'rgb', 'hsv', 'hsl', 'hsi', or 'hcl' (only for linear interpolation)
 * @property {number} samples - number of output colors
 * @property {boolean} lightnessCorrection - lightness correction applier
 */

/**
 * @typedef {object} SvgOptions - SvgOverlay component's configuration object
 * @property {string} type - linear or radial
 * @property {id} string - gradient unique identifier
 * @property {number} angle - between 0 and 359 - for linear gradients
 * @property {number} [x1] - linear gradient's first point's position on the x axis
 * @property {number} [y1] - linear gradient's first point's position on the y axis
 * @property {number} [x2] - linear gradient's second point's position on the x axis
 * @property {number} [y2] - linear gradient's second point position on the y axis
 * @property {number} [cx] - radial gradient's center point position on the x axis
 * @property {number} [cy] - radial gradient's center point position on the y axis
 * @property {number} [r] - radial gradient's radius
 * @property {number} [fx] - radial gradient's focal point position on the x axis
 * @property {number} [fy] - radial gradient's focal point position on the y axis
 * @property {string} [spreadMethod] - radial gradient's spread method: 'pad', 'repeat' or 'reflect'
 * @property {string} [gradientUnits] - objectBoundingBox or userSpaceOnUse
 */

/**
 * @typedef {object} Options
 * @property {BaseOptions} base
 * @property {SvgOptions} svg
 */

/**
 * @class Svg
 * @classdesc
 * Creates Svg gradient elements
 */
export default class Svg {
    constructor() {
        /**
         * @property {Base} _base - Base class instance
         * @private
         */
        this._base = new Base()
    }

    /**
     * Creates full svg gradient element with color stops
     * @param {Colors} colors - colors array
     * @param {Options} options - options object
     * @param {boolean} [raw] - by default set to false so it returns
     * the svg gradient element. It will return an object if set to true
     * @returns {(SVGElement|object)}
     */
    get(colors, options, raw = false) {
        this.colors = this._base.get(colors, options.base)
        this.options = options
        if (raw === true) {
            return this._getRaw()
        }
        return this._getElement()
    }

    /**
     * Creates svg gradient element
     * @returns {SvgElement}
     * @private
     */
    _getElement() {
        const gradient = this._gradientElement(this.options.svg.type)
        const stops = this._stops()
        stops.forEach(stop => gradient.appendChild(stop))
        return gradient
    }

    /**
     * Creates svg gradient as an object
     * @returns {Object} 
     * @private
     */
    _getRaw() {
        const output = {
            type: this.options.svg.type,
            attributes: Object.keys(this.options.svg)
                .filter(key => key !== 'type')
                .reduce((obj, key) => {
                    obj[key] = this.options.svg[key]
                    return obj
                }, {}),
            stops: this.colors.map(
                color => ['stopColor', `${color}`]
            )
        }
        return output
    }

    /**
    * Creates svg gradient element
    * @param {string} type - linear or radial
    * @returns {SvgGradientElement}
    * @private
    */
    _gradientElement(type) {
        const gradient = this._svgElement(`${type}Gradient`)
        const attrs = /((id)|([c|f|x|y|r][x|y|1|2]?)|(gradientUnits))/
        Object.entries(this.options.svg)
            .filter(attr => attrs.test(attr[0]))
            .forEach(attr => {
                if (attr[0] !== 'type') {
                    gradient.setAttribute(attr[0], attr[1])
                }
            })
        if (this.options.svg.angle) {
            gradient.setAttribute('gradientTransform', `rotate(${this.options.svg.angle})`)
        }
        return gradient
    }

    /**
     * Maps colors to stops
     * @returns {SvgElement[]}
     * @private
     */
    _stops() {
        return this.colors.map(
            color => this._createStop(
                color,
                this.colors.indexOf(color),
                this.colors.length
            )
        )
    }

    /**
     * Creates single stop element
     * @param {number[]} color
     * @param {number} index 
     * @param {number} length
     * @returns {SvgElement}
     * @private
     */
    _createStop(color, index, length) {
        const stop = this._svgElement('stop')
        stop.setAttribute('offset', `${100 * (index / length)}%`)
        stop.setAttribute(
            'stop-color',
            `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
        )
        return stop
    }

    /**
     * Creates chosen Svg element
     * @param {string} type - type of the NS element
     * @returns {SvgElement}
     * @private
     */
    _svgElement(type) {
        return document.createElementNS(
            'http://www.w3.org/2000/svg',
            type
        )
    }
}