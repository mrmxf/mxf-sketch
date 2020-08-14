/** @module lib-mm-stash
 * 
 * a class for hierarchically stashing groups objects being synthesised
 */
import moment from 'moment'

/* ids are simple numbers generated in miliseconds
 * define an epoch so that the ids are not too long to read
*/


export default class mm_stash {
    constructor(prefix) {
        this._id_epoch = moment().startOf('minute').subtract(1, 'minute')
        this._id_prefix = (typeof prefix == 'string') ? prefix : "id"
        this._id = this._new_id()
        this._is_a_stash = true
        this.events = []
    }

    _new_id() {
        return this.id_prefix + moment().diff(this.id_epoch).valueOf().toString()
    }

    /** store an array of objects in the stash.  Use extract to extract elements later
     * 
     * There is some special logic to make the code more readable
     * - store incoming stashes as pplain objects
     * - put other plain objects in a single value array if needed.
     */
    add(incoming) {
        let obj
        if (incoming._is_a_stash) {
            obj = incoming
        } else {
            obj = (Array.isArray(incoming)) ? incoming : [incoming]
        }
        let id = this._new_id()
        this.events.push({
            id: id,
            event: 'add',
            data: obj
        })
        return id
    }

    /** extract (in sequence) an array of elements from the stash
     * 
     * Writing this recursively proved too tricky to debug so
     * its written as a filter on a list that we unwind.
     * 
     * 1. start with the list of events and a new empty list
     * 2. if list element is a stash, push all data elements onto new list
     * 3. if element is an array, push each matshing element to new list
     * repeat until everything is matching element
     */
    extract(key) {
        let old_list
        let new_list = []
        let change_needed = true
        this.events.forEach(event => new_list.push(event.data))

        while (change_needed) {
            old_list = new_list
            new_list = []
            change_needed = false

            for (let i in old_list) {
                let element = old_list[i]
                if (element._is_a_stash) {
                    // if the element is a stash then use its data in the new list
                    for (let e in element.events){
                        let data = element.events[e].data
                        new_list.push(data)
                    }
                    change_needed = true
                }
                if (Array.isArray(element)) {
                    // if the element is an array then put each element in the new list
                    new_list = new_list.concat(element)
                    change_needed = true
                } else if (element[key]) {
                    // if the element has a matching key then put it in the new list
                    new_list.push(element)
                }
            }
        }
        //we should now have an ordered list of objects that have a matching key
        let res = []
        new_list.forEach(element => {
            res.push(element[key])
        })
        return res
    }

    old_extract(key) {
        let res = []

        //iterate over all the stash events
        this.events.forEach(event => {
            if (event.data._is_a_stash) {
                //data property is another stash, so extract the key elements
                let children = event.data.extract(key)
                if (children.length > 0)
                    res = res.concat(children)
            } else {
                //data property is an array of objects
                event.data.forEach(obj => {
                    //if the key holds data then push it onto the list
                    if (obj[key]) {
                        if (Array.isArray(obj[key])) {
                            res.concat(obj[key])
                        } else {
                            res.push(obj[key])
                        }
                    }
                })
            }
        });
        return res
    }
}
