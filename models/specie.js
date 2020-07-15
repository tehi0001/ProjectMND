const mongoose = require('mongoose');
const specieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    typeofAnimal: {
        type: String,
        required: true
    },
    pets: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Pet'
    }]
});
module.exports = mongoose.model('Specie', specieSchema);