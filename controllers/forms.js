const Call = require('../models/call');

exports.postCall = (req, res, next) => {
    console.log(req.body);

    const name = req.body.name;
    const location = req.body.location;
    const timezone = req.body.timezone;
    const contactData = req.body.contactData;
    const additionalInfo = req.body.additionalInfo;

    const call = new Call({
        name: name,
        location: location,
        timezone: timezone,
        contactData: contactData,
        additionalInfo: additionalInfo
    });
    call.save().then(result => {
        res.status(201).json({ message: 'Call was posted to the db', data: result});
    })
    .catch(err => console.log(err))
};

exports.getCalls = (req, res, next) => {
    Call.find()
        .then(calls => {
            res.status(200).json({
                data: calls,
                message: 'The calls were fetched!'
            });
        })
        .catch(err => console.log(err));
};