import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    progress: {
      rights: { type: Number, default: 0 },
      duties: { type: Number, default: 0 },
      preamble: { type: Number, default: 0 },
      union: { type: Number, default: 0 },
      principles: { type: Number, default: 0 }
    },
    dateJoined: { 
      type: Date, 
      default: Date.now 
    }
  });


const User = mongoose.model('User', userSchema);

export default User;