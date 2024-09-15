const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
const port= 80;

// starting mongoose
const mongoose = require('mongoose');
// Replace 'your_database_url' with your MongoDB connection string
const uri = 'mongodb://localhost:27017/danceContact';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // Defining schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
  desc: String,
});
// Creating a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

// CONTACT PAGE
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("this content has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Items are not saved to the database. Error: " + err.message);
    })
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});