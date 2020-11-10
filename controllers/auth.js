const Admin = require('../models/admin');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.postGetSignup = (req, res, next) => {
    const key = req.body.key;
    if( key === 'sexcoffee&trenirovochki') {
        res.status(200).json({ message: 'Allowed to continue to the signup' });
    }
    const error = new Error('The key does not match');
    error.status = 401;
    return next(error);
};

exports.signin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    //find admin by email
    Admin.findOne({ email: email})
        .then(admin => {
            if(!admin) {
                res.status(404).json({ message: 'The admin was not found!'});
            };
            //validate the password with bcrypt
            bcrypt.compare(password, admin.password)
                .then(isEqual => {
                    if(!isEqual) {
                        res.status(401).json({ message: 'The wrong password was entered'});
                    }
                   const token = jwt.sign({
                       email: admin.email,
                       userId: admin._id.toString()
                   }, 
                   'isleptwithrussiangovernment', 
                   { expiresIn: '1h'});
                    res.status(200).json({ 
                        message: 'The admin found, you are allowed to continue', 
                        token: token,
                        userId: admin._id.toString(),
                        expiresIn: 3600000
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.signupAdmin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt.hash(password, 12)
    .then(hashedPw => {
        const admin = new Admin({
            name: name,
            email: email,
            password: hashedPw
        });
        return admin.save();
    })
    .then(admin => {
        res.status(201).json({ message: 'An admin was created', data: admin });
    })
    .catch(err => console.log(err));
};