const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Setting up routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/forms');

const password = 'aleksivchenko1344';

const server = express();

server.use(bodyParser.json()); //application/json

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

server.use('/admin', adminRoutes);

server.use('/auth', authRoutes);

server.use('/form', formRoutes);

server.use((error, req, res, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

//Server listening and db connection
mongoose.connect(
    `mongodb+srv://alexsplatter:${password}@4-hands-code-i2ccm.mongodb.net/administrator?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(res => {
    server.listen(8080);
})
.catch(err => console.log(err));