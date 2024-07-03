const mongoose = require('mongoose')
require('dotenv').config()


const openMongoConnection = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected to MongoDB");
    });
    mongoose.connect(process.env.ConnectionString);
};

mongoose.set('strictQuery', true)

module.exports = {openMongoConnection};