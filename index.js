
const express = require ('express');
const bodyParser = require('body-parser')
const cors = require ('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8dpf0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express ()

app.use(bodyParser.json());
app.use (cors());
app.use (express.static('service'));

const port = 5000;

app.get('/', (req, res) => {
 res.send ("Hello")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("loginSignupForm").collection("loggedInUsers");
  

  app.post ('/addUser', (req, res) => {

     const order = req.body;
     collection.insertOne (order)
     .then (result => {
         res.send (result.insertedCount > 0)
     })
    })

//   client.close();

app.get ('/users',  ( req, res ) => {
    console.log (req.query.email);
    collection.find ({ email: req.query.email })
    .toArray (( err, documents ) => {
        res.send (documents);
    })
})

});




app.listen (process.env.PORT || port)