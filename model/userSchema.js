const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
        minLength: [5, 'Name must be less than 50 char'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already registered']
    },
    password: {
        type: String,
        select: false
    },
    forgetPasswordToken: {
        type: String
    },
    forPasswordExpiryDate: {
        type: Date
    }
},  {
    timestamps: true
});

userSchema.methods = {
    jtwToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            { expireIn: '24h'}
        )
    }
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;