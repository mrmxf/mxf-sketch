import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import { Message } from 'semantic-ui-react'

import Stash from '../lib/lib-mm-stash'

import contentPackage from '../svg-code/file-structure/contentPackage'
import indexTable from '../svg-code/file-structure/indexTable'
import metadata from '../svg-code/file-structure/metadata'
import partition from '../svg-code/file-structure/partition'
import rip from '../svg-code/file-structure/rip'

let depth = 0
const DBG = false
const stash_prefix = 'id-mfs'

export default class FileStructure extends Component {
    constructor(props) {
        super(props)
        this.stash = new Stash(stash_prefix)
    }

    /** recursive function to render a group
     * 
     * go through the list and recurse when the block is a group
     * otherwise render the desired element
    */
    render_group(blocks, theme, coord) {
        let stash = new Stash(stash_prefix)
        //let start_x = coord.x
        depth += 1

        for (let n in blocks) {
            let block = blocks[n]
            let child_stash

            switch (block.type) {
                case 'group':
                    if (DBG)
                        stash.add({ messages: (<Message content={`${depth} block: group:  ${block.name}`} />) })
                    child_stash = this.render_group(block.blocks, theme, coord)
                    break
                case 'partition':
                    child_stash = partition(block, theme, coord)
                    break
                case 'indexTable':
                    child_stash = indexTable(block, theme, coord)
                    break
                case 'contentPackage':
                    child_stash = contentPackage(block, theme, coord)
                    break
                case 'metadata':
                    child_stash = metadata(block, theme, coord,)
                    break
                case 'rip':
                    child_stash = rip(block, theme, coord,)
                    break
                default:
                    child_stash = { messages: (<Message negative content={`Unknown block: ${blocks[n].type}: at depth ${depth} named ${blocks[n].name}`} />) }
            }
            //render the next object to the right of the previous one
            if (child_stash.coord)
                coord.x += child_stash.coord.w
            stash.add(child_stash)
        }

        depth -= 1
        stash.coord = coord
        return stash
    }

    /* render a file-structure diagram
    */
    render() {
        const { sketch, theme } = this.props
        
        //initial coord is set to zero - it grows as objects are added
        const coord = { x: 0, y: 0, w: 0, h: 0 }
        let body_stash = this.render_group(sketch.blocks, theme, coord)
        
        //extract the display elements from the stash
        let svg_components = body_stash.extract("components")
        let svg_element = (
            <svg width={1500} height={200} viewBox="0 0 1500 200" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                {svg_components}
            </svg>
        )
        
        //update the svg text for the parent obect to download
        let txt = ReactDOMServer.renderToStaticMarkup(svg_components)
        this.props.update_svg(txt)
        let messages = body_stash.extract("messages")

        //@ToDo - provide a callback to handle body.tracker.messages
        return (<div>{svg_element}{messages}</div>)
    }
}
