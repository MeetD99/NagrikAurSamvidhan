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


export const updateProgress = async (req, res, next)=>{
    const { section, userId } = req.body;
    
    try {
        const updateField = `progress.${section}`;
    
        // Update the user's progress for the specified topic by +1 
        const updatedUser = await User.findOneAndUpdate(
          { _id : userId },
          { $inc: { [updateField]: 1 } }, 
          { new: true }
        );
    
        if (updatedUser) {
            res.status(200).json({ message: `${section} progress updated:` });   
        } else {
          return next(errorHandler(404, "User not found."))
        }
      } catch (error) {
        next(err)
      }
}