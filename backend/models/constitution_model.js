import mongoose from 'mongoose'

const constitutionSchema = new mongoose.Schema({
    section: { 
        type: String, 
        required: true 
    },  // [ rights, duties, preamble, union, principles ]
    description: {
        type: String
    },
    location: {
        let: {
            type: Number
        },
        lng: {
            type: Number
        },
        name: {
            type: String
        }
    },
    story: {
        type: String
    },
    question: {
        type: String
    },
    options: [{
        type: String
    }],
    correct: {
        type: Number
    },
    image: {
        type: String
    }
  });
  
  
const Constitution = mongoose.model('Constitution', constitutionSchema);

export default Constitution;
  