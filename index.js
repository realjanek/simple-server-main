const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();
 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const data = {
    likes: [],
};

const COOKIE_NAME = 'counter';

app.get('/count', (req, res) => {

    let count = 1;
    if (COOKIE_NAME in req.cookies) {
        count = req.cookies[COOKIE_NAME];
        //count ++;
        //count ++;
        count = parseInt(count) + 3;
    }
    res.cookie(COOKIE_NAME, count);
    res.json({count: count});
});

app.get('/likes', (req, res) => {
    res.json(data.likes);
});

app.post('/likes', (req, res) => {
    if( req.body && 'thing' in req.body) {
        data.likes.push(req.body.thing);
        res.json({status: 'success'});
    }  else {
        res.json({status: 'error', message: 'missing thing'});
    }
});

const port = 3123;
console.log(`Server running at http://localhost:${port}`);
app.listen(port);



