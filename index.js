const express = require('express');
const jwt = require('jsonwebtoken');
const port = 8000;
const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome everyone!'
    })
})
// login a user
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'febbatch',
        email: 'febbatch@codingninjas.com'
    }

    jwt.sign({user}, 'secretKey',  { expiresIn : '60s'} , (err, token) => {
        res.json({
            token
        })
    })
})
// verification
app.post('/api/verify', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, data) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'User access granted!',
                data
            })
        }
    })
})
//Format of token
// Authorization: Bearer token
//To verify the token
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`)
})