const Call = require('../models/call');

exports.getCalls = (req, res, next) => {
    //fetch calls from the db
    Call.find()
        .then(calls => {
            if(!calls) {
                const error = new Error('Failed to fetch the calls');
                error.status = 404;
                throw error;
            };
            res.status(200).json({ message: 'Here are your calls, mfk!', calls: calls });
        })
        .catch(err => console.log(err))
};

exports.deleteCall = (req, res, next) => {
    const callId = req.params.callId;

    Call.findByIdAndRemove(callId)
        .then(result => {
            res.status(200).json({ message: 'The call was deleted successfully!', call: result });
        })
        .catch(err => console.log(err));
};