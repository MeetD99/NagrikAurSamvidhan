import mongoose from 'mongoose'

const constitutionSchema = new mongoose.Schema({
    section: { 
        type: String, 
        required: true 
    },  // [ rights, duties, preamble, union, principles ]
    title: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        lat: {
            type: mongoose.Types.Decimal128
        },
        lng: {
            type: mongoose.Types.Decimal128
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
  