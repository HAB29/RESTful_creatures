const express = require('express')
const router = express.Router()
const fs = require('fs')


router.get('/', (req,res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs);
    // console.log(dinoData)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})


router.get('/new', (req,res) => {
    res.render('dinosaurs/new')
})

router.get('/:idx', (req,res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs);
    console.log('This is the req.params object! ', req.params)
    let dinoIndex = parseInt(req.params.idx)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})


    router.delete('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)
  
    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
  });

  router.get('/edit/:idx', (req, res) => {
    //Grab dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    //Display edit page
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
  });



  router.put('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  //re-assign the name and type fields of the dinosaur to be editted
  dinoData[req.params.idx].name = req.body.name;
  dinoData[req.params.idx].type = req.body.type;

   // save the editted dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
});
module.exports = router;