import express from 'express'
import { constitutionByTopic } from '../controllers/constitution_controller.js'

const router = express.Router();

router.post('/:topic', constitutionByTopic)

export default router
