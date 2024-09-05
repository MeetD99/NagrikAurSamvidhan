import mongoose from 'mongoose'

const constitutionSchema = new mongoose.Schema({
    section: { 
        type: String, 
        required: true 
    }, // e.g., 'Fundamental Rights', 'Preamble', 'Directive Principles'
    articleNumber: { 
        type: Number, 
        required: true 
    },
    originalText: { 
        type: String, 
        required: true 
    },
    simplifiedText: { 
        type: String, 
        required: true 
    }, // Simplified version for easier understanding
    story: [{
        location:{
            let: {
                type: Number
            },
            lng: {
                type: Number
            }
        },
        dialogue: {
            type: String
        }
    }],
    multimedia: {
      images: [{ type: String }],
      videos: [{ type: String }]
    },
  });
  
  
const Constitution = mongoose.model('Constitution', constitutionSchema);

export default Constitution;
  