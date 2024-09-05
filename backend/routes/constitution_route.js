import express from 'express'
import { constitutionByTopic, updateProgress } from '../controllers/constitution_controller.js'

const router = express.Router();

router.post('/:topic', constitutionByTopic)
router.post('/progress-update', updateProgress)


export default router
