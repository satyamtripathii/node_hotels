const mongoose = require('mongoose');

// Define a schema for a person
const personSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true },
    age: { 
      type: Number, 
     },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
       type: String, 
       required: true, 
       unique: true 
    },
    address: {
        type: String,
    }
});

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;