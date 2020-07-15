var Pet = require('../models/pet');
var Specie = require('../models/specie');
const mongoose = require('mongoose');
module.exports = { //middleware
    getAll: function (req, res) {
        Specie.find({}).populate('pets').exec(function (err, species) {
            if (err) return res.status(400).json(err);
            res.json(species);
        });
    },
    createOne: function (req, res) {
        let newSpecieDetails = req.body;
        newSpecieDetails._id = new mongoose.Types.ObjectId();
        Specie.create(newSpecieDetails, function (err, specie) {
            if (err) return res.status(400).json(err);
            res.json(specie);
        });
    },
    getOne: function (req, res) {
        Specie.findOne({ _id: req.params.id })
            .populate('pets')
            .exec(function (err, specie) {
                if (err) return res.status(400).json(err);
                if (!specie) return res.status(404).json();
                res.json(specie);
            });
    },
    updateOne: function (req, res) {
        let specieID = new mongoose.Types.ObjectId(req.params.id);
        Specie.findOneAndUpdate({ _id: specieID }, req.body, function (err, specie) {
            if (err) return res.status(400).json(err);
            if (!specie) return res.status(404).json();
            res.json(specie);
        });
    },
    deleteOne: function(req, res){
        let specieID = new mongoose.Types.ObjectId(req.params.id);
        Specie.findOneAndDelete({_id: specieID }, req.body.id, function(err){
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    removePet: function(req, res){
        let specieID = new mongoose.Types.ObjectId(req.params.specieId);
        let petID = new mongoose.Types.ObjectId(req.params.petId);

        Specie.findOne({_id: specieID}, function(err, specie){
            if (err) return res.params.status(400).json(err);
            if (!specie) return res.status(404).json();
            Pet.findOne({_id: petID}, function (err, pet) {
                if (err) return res.status(400).json();
                if (!specie) return res.status(404).json();
                specie.pets.removeOne(pet._id);
                specie.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(specie);
                });
            });
        });
    },
    addPet: function(req, res){
        let specieID = new mongoose.Types.ObjectId(req.params.specieId);
        let petID = new mongoose.Types.ObjectId(req.params.petId);

        Specie.findOne({ _id: specieID }, function (err, specie) {
            if (err) return res.status(400).json(err);
            if (!specie) return res.status(404).json();
            Pet.findOne({ _id: petID }, function (err, pet) {
                if (err) return res.status(400).json(err);
                if (!pet) return res.status(404).json();
                specie.pets.push(pet._id);
                specie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(specie);
                });
            })
        });
    },
    
};