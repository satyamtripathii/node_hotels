const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem');

router.get('/', async (req, res) => {
  try{
    const item = await MenuItem.find();
    console.log('menu items fetched');
    res.status(200).json(item);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Failed to fetch menu items' });
  }
})

router.post('/', async (req, res) => {
  try{
    const item = req.body;
    const newItem = new MenuItem(item);
    const response = await newItem.save();
    console.log('item saved');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Failed to save menu item' });
  }
})

router.get('/:taste', async (req, res) =>{
  try{
    const taste = req.params.taste;
    if(taste == 'spicy' || taste == 'sour' || taste == 'sweet'){
      const response = await MenuItem.find({taste : taste});
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


module.exports = router;