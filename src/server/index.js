//server configration
var path = require('path');
const express = require('express');
const app = express();


const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allow
const cors = require('cors');
app.use(cors());

const fetch = require('node-fetch');

app.use(express.static('dist'));

console.log(__dirname);

//To encrypt API key
const dotenv = require('dotenv');
dotenv.config();


//API data
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";
const apikey = process.env.API_KEY;
const etcURL = "&model=general&of=json&lang=en&url=";


app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
const server = app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

//POST to API 
let userURL = [];

app.post('/addAPIdata', async function (req, res) {
    userURL = req.body.url;
    const response = await fetch(baseURL + apikey + etcURL + userURL);
    try {
        const newData = await response.json();
        console.log(newData);
        res.send(newData);
        return newData
    }
    catch (error) {
        console.log("error", error);
    }
});



