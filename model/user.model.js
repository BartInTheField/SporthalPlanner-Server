const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regEx = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|de|gov|mil|biz|info|mobi|name|kpn|jobs|ziggo|nl)\b/);

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: [true, 'Email is required.'], 
        unique: true,
        validate: {
            validator: (value) => regEx.test(value),
            message: "Please enter a valid e-mail."
        }
    },
    username: {
        type: String, 
        unique: true,
        validate: {
            validator: (username) => username.length > 1,
            message: 'Username must be at least 2 characters.'
        },
        required: [true, 'Username is required.']
    },
    password: {
        type: String
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;