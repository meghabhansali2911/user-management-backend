const mongoose = require('mongoose');
const roleEnum = require('../utility/roleEnum');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(roleEnum),
        default: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;