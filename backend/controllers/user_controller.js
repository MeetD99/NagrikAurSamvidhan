import User from '../models/user_model.js'
import { errorHandler } from '../utils/error.js'


export const getData = async (req, res, next)=>{
    const { userId } = req.body;
    
    try {
        const userData = await User.findOne({ _id : userId });
        
        res.status(201).json({ message: 'user data featched', userData });   
    } 
    catch (err) {
        next(err);
    }
}