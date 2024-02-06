const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    shortUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    urlId: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true  //soft delete
    }
}, {
    timestamps: true,
});

const Link = mongoose.model('link', linkSchema);

module.exports = Link;
