const { model } = require('mongoose');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password:{type: String, required:true}
  
});


const AdminUser = model('AdminUser', userSchema);

module.exports = AdminUser;
