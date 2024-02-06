const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
   
}, {
    timestamps: true,
});

const Link = mongoose.model('link', linkSchema);

module.exports = Link;
