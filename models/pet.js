const mongoose = require('mongoose');
const petSchema = new mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    numoflegs: {
        validate: {
            validator: Number.isInteger,
            message: 'Number of legs must be an integer'
        },
        type: Number,
        required: true
        },
		lifespan: {
        validate: {
            validator: Number.isInteger,
            message: 'Lifespan  must be an integer from 1-12'
        },
        type: Number,
        required: true
        },
		eatingGroup: String,
    specie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specie'
    }]
});

module.exports = mongoose.model('Pet', petSchema);

