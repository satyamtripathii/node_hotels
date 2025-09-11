const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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
    },
    username: {
        require: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

personSchema.pre('save', async function(next){
    const person = this;
    
    // hash the password if it has been modified(or new)
    if(!person.isModified('password')) return next();

    try{
        // hash paswworr generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password
        person.password = hashedPassword;
        next();

    }
    catch(err){
        return next(err);
    }
}
)

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // use bcrypt to compare the password

        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);
module.exports = Person;