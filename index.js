const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');
const app = express()
const PORT = 3500

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(methodOverride('_method'));

//body-parser middleware
app.use(express.urlencoded({extended: false}))

app.use('/dinosaurs',require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures',require('./controllers/prehistoric_creatures'))



// app.get('/',(req,res)=>{
//     res.redirect('/show')
// })

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})