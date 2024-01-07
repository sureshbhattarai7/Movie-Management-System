const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'Username must be unique!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email must be unique'],
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email address!"]
    },
    photo: {
        type: String,
        default: 'default.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            //This only works on 'CREATE' and 'SAVE'
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password must be same!'
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    //Only run this function if password was modified 
    if (!this.isModified('password')) return next();

    //Password is encrypted in the cost of '12'. Default is '10'.
    this.password = await bcrypt.hash(this.password, 12);

    //Delete the passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    //this points to the current query
    this.find({ active: { $ne: false } });
    next();
})

//Instance method - It is available in all documents of a certain collection
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    //'candidatePassword' is coming from user and 'userPassword' is password stored in database
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }

    //False means password is not changed
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log({ resetToken }, this.passwordResetToken);
    return resetToken;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
