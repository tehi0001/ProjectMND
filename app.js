//The app.js is the entry point of my application and will be used to launch the server at port 8080.
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose'); //Defines schemas for  data collections
const pets = require('./routers/pet');
const species = require('./routers/specie');
const app = express();
app.listen(8080);
app.use(bodyParser.json()); // To get a nicely formatted body when a POST or PUT HTTP request is received
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect('mongodb://localhost:27017/animals', {useUnifiedTopology: true, useNewUrlParser: true },function(err) {
    if(err){
        return console.log('Mongoose - connection error: ', err);
    }
    console.log('Connected Successfully');
});
//CRUD OPERATION
//GET:  This method is used to retrieve the existing data from the database.
//POST: This method is used to write new data into the database
//PUT:  This method is used to update existing data in the database
//DELETE: This method is used to remove an existing row or document from the database.
//Pet RESTFul endpoionts 
app.get('/pets', pets.getAll);
app.post('/pets', pets.createOne);
app.get('/pets/:id', pets.getOne);
app.put('/pets/:id', pets.updateOne);
app.put('/pets/:id/:specieId', pets.addSpecie);
app.delete('/pets/:id', pets.deleteOne);
app.delete('/pets/:petId/:specieId', pets.removeSpecie);

//Specie RESTFul  endpoints
app.get('/species', species.getAll);
app.post('/species', species.createOne);
app.get('/species/:id', species.getOne);
app.put('/species/:id', species.updateOne);
app.delete('/species/:id', species.deleteOne);
app.delete('/species/:specieId/:petId', species.removePet);
app.put('/species/:specieId/:petId', species.addPet);


