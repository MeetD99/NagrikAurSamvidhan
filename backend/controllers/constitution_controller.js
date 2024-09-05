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