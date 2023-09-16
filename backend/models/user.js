require('dotenv').config()
const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    current: {type: Schema.Types.ObjectId, ref: 'List'},
    isGuest: {type: Boolean, default: false}
})

userSchema.pre('save', async function(next) {
	// 'this' is the use document
	if (!this.isModified('password')) return next();
	// update the password with the computed hash
	this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
	return next();
  })
  
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: '24h'})
    // creates a token using json web token, the token expires in 24 hours, the secret comes from the .env file
    return token
}

const User = model('User', userSchema)
module.exports = User