import default_properties from '../../svg-blocks/file-structure/contentPackage.json'
import generic_block from './_generic_block'

/** draw a contentPackage block
 */
export default function (block, theme, coord) {
    //make a text array of up to 3 items from the block name
    let words = block.name.trim().split(" ").slice(0,2)

    //pass properties to the generic block, highest priority first
    let obj = generic_block(block, theme.contentPackage, default_properties, words, coord)
    return obj
}
