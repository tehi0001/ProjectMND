const mongoose = require('mongoose');
var Pet = require('../models/pet');
var Specie= require('../models/specie');
module.exports = {  //middleware
    getAll: function (req, res) {//retrieves the existing data from the database
        pet.find({}).populate('species').exec(function(err, pet) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(pet);
            }
        });
    },
    createOne: function (req, res) { //creates 
        let newPetDetails = req.body;
        newPetDetails._id = new mongoose.Types.ObjectId();
        let pet = new Pet(newPetDetails);
        pet.save(function (err) {
            res.json(pet);
        });
    },
    getOne: function (req, res) {  //Retrieves one document 
        let petID = new mongoose.Types.ObjectId(req.params.id);
        Pet.findOne({ _id: petID })
            .populate('species')
            .exec(function (err, pet) {
                if (err) return res.status(400).json(err);
                if (!pet) return res.status(404).json();
                res.json(pet);
            });
    },
    updateOne: function (req, res) { //updates the document 
        let petID = new mongoose.Types.ObjectId(req.params.id);
        Pet.findOneAndUpdate({ _id: petID }, req.body, function (err, pet) {
            if (err) return res.status(400).json(err);
            if (!pet) return res.status(404).json();
            res.json(pet);
        });
    },
    deleteOne: function (req, res) { // deletes one
        let petID = new mongoose.Types.ObjectId(req.params.id);
        Pet.findOneAndDelete({ _id: petID}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addSpecie: function (req, res) { // adds species into existing animal
        let specieID = new mongoose.Types.ObjectId(req.params.specieId);
        let petID = new mongoose.Types.ObjectId(req.params.id);

        Pet.findOne({ _id: petID }, function (err, pet) {
            if (err) return res.status(400).json(err);
            if (!pet) return res.status(404).json();
            Specie.findOne({ _id: specieID }, function (err, specie) {
                if (err) return res.status(400).json(err);
                if (!specie) return res.status(404).json();
                pet.specie.push(specie._id);
                pet.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(pet);
                });
            })
        });
    },
    removeSpecie: function(req, res){ //removes specie from animal
        let specieID = new mongoose.Types.ObjectId(req.params.specieId);
        let petID = new mongoose.Types.ObjectId(req.params.petId);

        Specie.findOne({_id: specieID }, function(err, specie){
            if (err) return res.status(400).json(err);
            if (!specie) return res.status(404).json();
            Pet.findOne({_id: petID }, function(err, pet){
                if (err) return res.status(400).json(err);
                if (!specie) return res.status(404).json();
                pet.pets.remove(specie._id);
                pet.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(pet);
                });
            });
        });
    }
};