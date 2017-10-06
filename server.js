const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((request,response,next) => {
    var now= new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write to log file');
        }
    });
    next();
});

// app.use((request,response,next) => {
//     response.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request,response) => {
   //response.send('<h1>Hello Express!!</h1>');
   //  response.send({
   //      name : 'Babina Arora',
   //      likes: ['Node JS', 'Angular JS']
   //  });
    response.render('home.hbs',{
        pageTitle:'Home Page',
        //currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to our website!!'
    });
});

app.get('/about', (request,response) => {
    response.render('about.hbs',{
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (request,response) => {
    response.send({
        errorMessage: 'Request failed'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});