const mongoose = require('mongoose');

let Animal = require('../models/animalmodel');

module.exports = {  //middleware
    getAll: function (req, res) {//retrieves the existing data from the database
        Animal.find({}).exec(function(err, result) {
            if(err) {
                return res.status(500).json({
                    'success': false,
                    'error': err
                });
            }

            res.json({
                'success': true,
                'data': result
            });

        });
    },
    getByFilter: function(req, res) {
        Animal.aggregate([{
            $group: {
                _id: "$eatingGroup"
            }
        }]).exec(function (err, result) {
            if(err) {
                return res.status(500).json({
                    'success': false,
                    'error': err
                });
            }

            result.forEach(function(group, index) {
                Animal.where('eatingGroup').equals(group._id).exec(function (err, data) {

                    if(err) {
                        return res.status(500).json({
                            'success': false,
                            'error': err
                        });
                    }

                    result[index].data = data;

                    if(index == result.length - 1) {
                        res.json({
                            'success': true,
                            'data': result
                        });
                    }
                });
            });
        })
    },
    createOne: function (req, res) { //creates
        req.body._id = new mongoose.Types.ObjectId();
        req.body.eatingGroup = req.body.eatingGroup.toLowerCase();
        let animal = new Animal(req.body);
        animal.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    'success': false,
                    'message': err.toString()
                })
            }
            res.json({
                'success': true,
                'message': "Animal added successfully"
            });
        });
    },
    getOne: function (req, res) {  //Retrieves one document
        let id = new mongoose.Types.ObjectId(req.params.id);
        Animal.findOne({ _id: id })
            .exec(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        'success': false,
                        'message': err.toString()
                    })
                }

                if (!result) {
                    return res.status(404).json({
                        'success': false,
                        'message': 'Not found'
                    });
                }

                res.json({
                    'success': true,
                    'data': result
                });
            });
    },
    updateOne: function (req, res) { //updates the document
        let id = new mongoose.Types.ObjectId(req.params.id);
        Animal.findOneAndUpdate({ _id: id }, req.body, function (err, result) {
            if (err) {
                return res.status(500).json({
                    'success': false,
                    'message': err.toString()
                })
            }

            res.json({
                'success': true,
                'data': result
            });
        });
    },
    deleteOne: function (req, res) { // deletes one
        let id = new mongoose.Types.ObjectId(req.params.id);
        Animal.findOneAndDelete({ _id: id}, function (err) {
            if (err) {
                return res.status(500).json({
                    'success': false,
                    'message': err.toString()
                })
            }

            res.json({
                'success': true,
                'message': 'Animal deleted successfully'
            });
        });
    }
};