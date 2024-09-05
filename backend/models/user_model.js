import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
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
    // age: { type: Number },
    // languagePreference: { type: String, default: 'English' }, 
    progress: {
      quizzesCompleted: { type: Number, default: 0 },
      lessonsCompleted: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 }
    },
    dateJoined: { type: Date, default: Date.now },
  });


const User = mongoose.model('User', userSchema);

export default User;