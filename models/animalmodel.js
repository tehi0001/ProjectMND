const mongoose = require('mongoose');
const AnimalSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    species: {
        type: String,
        required: [true, 'Species is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    legCount: {
        type: Number,
        required: [true, 'Number of legs is required']
    },
    lifeSpan: {
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Lifespan  cannot be negative number'
        },
        type: Number,
        required: [true, 'Lifespan is required']
    },
    eatingGroup: {
        type: String,
        required: [true, 'Eating group is required'],
        enum: ['herbivore', 'carnivore', 'omnivore']
    }
});

module.exports = mongoose.model('Animal', AnimalSchema);

