import Svg from './index.js'

test(
    'If SvgOverlay creates a gradient correctly',
    () => {
        const colors = [
            [1, 224, 128, 0.4],
            [100, 55, 4, 0.1]
        ]
        const options = {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'rgb',
                lightnessCorrection: false
            },
            svg: {
                type: 'linear',
                id: 'gradient-0',
                x1: 0,
                x2: 0,
                y1: 100,
                y2: 100,
                angle: 100,
                gradientUnits: 'userSpaceOnUse'
            }
        }
        const overlay = new Svg()
        expect(overlay.get(colors, options)).toBeInstanceOf(SVGElement)
    }
)

test(
    'If SvgOverlay creates a raw gradient correctly',
    () => {
        const colors = [
            [1, 224, 128, 0.4],
            [100, 55, 4, 0.1]
        ]
        const options = {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'rgb',
                lightnessCorrection: false
            },
            svg: {
                type: 'linear',
                id: 'gradient-0',
                x1: 0,
                x2: 0,
                y1: 100,
                y2: 100,
                angle: 100,
                gradientUnits: 'userSpaceOnUse'
            }
        }
        const overlay = new Svg()
        expect(overlay.get(colors, options, true)).toBeInstanceOf(Object)
        expect(overlay.get(colors, options, true).stops.length).toBe(options.base.samples)
    }
)