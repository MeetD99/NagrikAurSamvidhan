import Constitution from '../models/constitution_model.js'
import { errorHandler } from '../utils/error.js'


export const constitutionByTopic = async (req, res, next)=>{
    const { section } = req.body;
    
    try {
        const constitutions = await Constitution.find({ section });

        
        res.status(201).json({ message: 'constitution featched', constitutions });   
    } 
    catch (err) {
        next(err);
    }
}


export const checkAnswer = async (req, res, next) => {
  try {
    const { ans, conId } = req.body;  

    const constitution = await Constitution.findById(conId);

    if (!constitution) {
      return res.status(404).json({ message: 'constitution not found' });
    }

    const isCorrect = ans === constitution.correct;

   
    return res.status(200).json({ message: 'answer checked', isCorrect });

  } catch (error) {
    next(err)
  }
};
