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
                x1: 0,
                x2: 0,
                y1: 100,
                y2: 100,
                angle: 100,
                gradientUnits: 'userSpaceOnUse'
            }
        }
        const overlay = new Svg(colors, options)
        expect(overlay.get()).toBeInstanceOf(SVGElement)
    }
)