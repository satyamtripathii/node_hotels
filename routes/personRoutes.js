const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
  try{
     const data = req.body; //assuming the request body contain the person data
     const newPerson = new Person(data);

     // save the data to the database
     const response = await newPerson.save();
     console.log('data saved');
      res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: 'Failed to save person data' });
  } 
})

router.get('/', async (req, res) => {
  try{
     const data = await Person.find();
     console.log('data fetched');
     res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch person data' });
  }
})

router.get('/:workType', async (req, res) =>{
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
      const response = await Person.find({work : workType});
      console.log('data fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'Invalid work type' });
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Failed to save menu item' });
  }
} )

router.put('/:id', async (req,res) => {
  try{
    const personId = req.params.id;
    const UpdatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, UpdatedPersonData, {
      new: true,
      runValidators: true,
    })
    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.delete('/:id', async (req,res) => {
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('data deleted');
    res.status(200).json({message: 'person deleted successfully'});

  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;