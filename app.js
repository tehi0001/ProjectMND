//The app.js is the entry point of my application and will be used to launch the server at port 8080.
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose'); //Defines schemas for  data collections
const animal = require('./routers/animalrouter');
const app = express();
app.use(bodyParser.json()); // To get a nicely formatted body when a POST or PUT HTTP request is received
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect('mongodb://localhost:27017/animals', {useUnifiedTopology: true, useNewUrlParser: true },function(err) {
    if(err){
        return console.log('Mongoose - connection error: ', err);
    }
    console.log('MongoDB Connected');
});
//CRUD OPERATION
//GET:  This method is used to retrieve the existing data from the database.
//POST: This method is used to write new data into the database
//PUT:  This method is used to update existing data in the database
//DELETE: This method is used to remove an existing row or document from the database.
//Pet RESTFul endpoionts 
app.get('/', animal.getAll);
app.post('/add', animal.createOne);
app.get('/:id', animal.getOne);
app.post('/:id/update', animal.updateOne);
app.delete('/:id', animal.deleteOne);

app.listen(8080, () => {
    console.log("App listening on port 8080");
});


