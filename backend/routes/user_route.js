import express from 'express'
import { getData } from '../controllers/user_controller.js'

const router = express.Router();

router.post('/get-data', getData);

export default router
