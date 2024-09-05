import express from 'express'
import { getData, updateProgress } from '../controllers/user_controller.js'

const router = express.Router();

router.post('/get-data', getData);
router.post('/progress-update', updateProgress)

export default router
