const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  instaId: String
});

mongoose.model('users', userSchema);