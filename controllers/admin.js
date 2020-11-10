const Call = require('../models/call');
const Order = require('../models/order');
const Client = require('../models/client');

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

exports.postOrder = (req, res, next) => {
    const nameOfTheOrder = req.body.nameOfTheOrder;
    const description = req.body.description;
    const name = req.body.name;
    const contactData = req.body.contactData;
    const location = req.body.location;
    const timezone = req.body.timezone;
    const notes = req.body.notes;

    const order = new Order({
        nameOfTheOrder,
        description,
        name,
        contactData,
        location,
        timezone,
        notes
    });

    order.save().then(result => {
        res.status(201).json({ message: 'The order was saved to the db', order: result})
    });
};

exports.getOrders = (req, res, next) => {
    Order.find()
        .then(orders => {
            if(!orders) {
                const error = new Error('Orders had not been found!');
                error.status = 404;
                throw error;
            };
            res.status(200).json({ message: 'Orders had been found successfully!', orders: orders});
        })
        .catch(err=> {
            next(err);
        })
};

exports.putOrder = (req, res, next) => {
    const id = req.body.id;
    const archived = req.body.archived;

    Order.findById(id)
        .then(order => {
            if(!order) {
                res.status(404).json({ message: 'The order with the given id not found!'});
            };
            order.archived = archived;
            return order.save();
        })
        .then(result => {
            res.status(200).json({ message: 'The order was updated!'});
        })
        .catch(err => next(err));
};

exports.getClients = (req, res, next) => {
    Client.find()
        .then(clients => {
            if(!clients) {
                const error = new Error('Clients not found!');
                error.status = 404;
                throw error;
            };
            res.status(200).json({ message: 'Success', clients: clients});
        })
        .catch(err => next(err));
};

exports.postClient = (req, res, next) => {
    if(!req.file) {
        const error = new Error('No image found!');
        error.status = 422;
        throw error;
    };
    const image = req.file.path.replace('\\', '/');
    const link = req.body.link;
    const name = req.body.name;
    const character = req.body.character;
    const subscribtion = req.body.subscribtion;
    const email_subsribtion = req.body.email_subsribtion;
    const contactData = req.body.contactData;
    const moneyTransaction = req.body.moneyTransaction;
    const projects = req.body.projects;
    const satisfactionRate = req.body.satisfactionRate;
    
    const client = new Client({
        imageUrl: image,
        linkToWebsite: link,
        name,
        character,
        subscribtion,
        email_subsribtion,
        contactData,
        moneyTransaction,
        projects,
        satisfactionRate 
    });
    client.save()
        .then(client => {
            res.status(201).json({ message: 'New Client was successfully added to the db'});
        })
};