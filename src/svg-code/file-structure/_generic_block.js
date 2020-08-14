import React from 'react'

/** draw a generic file structure block
 * 
 * indexTable will update coord
 *      - coord.x += indexTable.w
 *      - coord.y unchanged
 *      - coord.w = indexTable.w
 *      - coord.h = indexTable.h
 * 
 * @param {*} block - the properties from the figure definition
 * @param {*} theme - the properties from the theme
 * @param {*} coord - the coordinates x & y, w & h
 */
export default function (block, theme, defaults, text_array, coord) {
    // make a new object where the block properties override the theme override the default_properties
    let props = Object.assign({}, defaults, theme, block)
    let total_width= 0

    props.x = coord.x
    props.y = coord.y
    let repeat = (props.repeat) ? props.repeat : 1
    let children = []
    while (repeat-- > 0) {
        children.push(<rect
            x={props.x}
            y={props.y}
            width={props.w}
            height={props.h}
            style={{ fill: props.fill, strokeWidth: props.strokeWidth, stroke: props.color }}
            className="mxf-sketch" />)

        for (let t = 0; t < Math.min(3, text_array.length); t++) {
            children.push(
                <text
                    x={props.x + 0.5 * props.w}
                    y={props.y + 0.25 * (t + 1) * props.h}
                    textAnchor='middle'
                    className="mxf-sketch">{text_array[t]}</text>)
        }
        props.x += props.w
        total_width += props.w
    }
    let svg = <g>{children}</g>
    return {
        components: svg,
        messages: [],
        coord: {
            x: props.x,
            y: props.y,
            w: total_width,
            h: props.h
        }
    }
}
