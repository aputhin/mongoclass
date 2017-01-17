const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length >= 3,
      message: 'Name must be 3 characters or more!'
    },
    required: [true, 'Name is required']
  },
  posts: [PostSchema],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;