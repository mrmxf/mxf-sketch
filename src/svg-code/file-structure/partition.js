import default_properties from '../../svg-blocks/file-structure/partition.json'
import generic_block from './_generic_block'

export default function (block, theme, coord) {
    //make a text array of up to 3 letters from the block name
    let words = [block.name[0], block.name[1], block.name[2]]

    //pass properties to the generic block, highest priority first
    let obj = generic_block(block, theme.partition, default_properties, words, coord)
    return obj
}
