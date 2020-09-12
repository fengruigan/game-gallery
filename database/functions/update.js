const Work = require('../models/workSchemaMongo')

function updateId(id, Work) {
    Work.findByIdAndUpdate(id, Work, (err, newWork) => {
        if (err) {
            console.log("ERROR:", err.message)
        } else {
            console.log(id + " updated")
        }
    })
}

module.exports = {updateId}