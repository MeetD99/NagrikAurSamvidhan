import express from 'express'
import { constitutionByTopic, checkAnswer } from '../controllers/constitution_controller.js'

const router = express.Router();

router.post('/:topic', constitutionByTopic)
router.post('/scenario/check-ans', checkAnswer)


export default router
