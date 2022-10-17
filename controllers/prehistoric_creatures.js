const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures);
    res.render('prehistoric_creatures/index', {myCreature: creatureData})
    
})

//for the new
router.get('/new', (req, res) =>{
  res.render('prehistoric_creatures/new')

})



router.get('/:id', (req, res) => {
    // get creatures
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
  
    
    let creatureIndex = parseInt(req.params.id);
  

    res.render('prehistoric_creatures/show', {myCreature: creatureData[creatureIndex]});
});



  router.post('/', (req, res) => {
    // read creatures file
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);

   
    creatureData.push(req.body);
  
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  
    res.redirect('/prehistoric_creatures');
  });
  
  router.delete('/:id', (req,res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    
    creatureData.splice(req.params.id, 1)

    // save the new dinosaurs to the data.json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));



    res.redirect('/prehistoric_creatures')
})

router.get('/edit/:id', (req,res)=>{
  
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)

  //display edit page
  res.render('prehistoric_creatures/edit',
   {myCreature: creatureData[req.params.id], 
      creatureId: req.params.id})
})


router.put('/:id', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json');
  let creatureData = JSON.parse(creatures);

  
  creatureData[req.params.id].img_url = req.body.img_url;
  creatureData[req.params.id].type = req.body.type;

   // save the editted dinosaurs to the data.json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  res.redirect('/prehistoric_creatures');
})



module.exports = router