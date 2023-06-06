const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
// Check date and time
const checkTime = (req, res, next) => {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
    } else {
    res.render('error');
    }
};


app.get('/', checkTime, (req, res) => {
    res.render('home');
});

app.get('/services', checkTime, (req, res) => {
    res.render('services');
});

app.get('/contact', checkTime, (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`The server is running at the port: ${port}`