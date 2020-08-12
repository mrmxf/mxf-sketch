import React from 'react'
import file_structure_partition from '../../svg-components/file-structure/partition.json'

export default function (properties) {

    let svg = (
        <g>
        <rect width={properties.w} height={properties.h} style={{ fill: '#ffcc66', "stroke-width": 1, stroke: '#000' }} />
        <text x={0.5 * properties.w} y={0.25 * properties.h} fill="black" textAnchor='middle' fontWeight="bold">{properties.name[0]}</text>
        <text x={0.5 * properties.w} y={0.50 * properties.h} fill="black" textAnchor='middle' fontWeight="bold">{properties.name[1]}</text>
        <text x={0.5 * properties.w} y={0.75 * properties.h} fill="black" textAnchor='middle' fontWeight="bold">{properties.name[2]}</text>
        </g>
      )
    let obj = {
        svg: svg,
        w: 25,
        h: 100
    }
    return obj
}
