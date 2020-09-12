const Work = require('../models/workSchemaMongo')

// =============== use .then( callback() ) to handle error and results

function find(query) {
    // let found;
    return Work.find(query)
}

function findById(id) {
    return Work.findById(id)
}

function listCategories() {
    // returns an ARRAY of distinct categories
    return Work.find().distinct('category')
}

function listEvents() {
    // returns an ARRAY of distinct events
    return Work.find().distinct('event')
}

module.exports = {  find, 
                    findById,
                    listCategories, 
                    listEvents
                }