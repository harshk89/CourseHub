import express from "express";

import { getAllPrograms, getProgramById, createProgram, updateProgram, deleteProgram, getProgramsByDomain } from "../controllers/programs.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/getAllPrograms', auth, getAllPrograms);
router.get('/getProgram/:id', auth, getProgramById);
router.get('/getProgramsByDomain', auth, getProgramsByDomain);
router.post('/createProgram', auth, createProgram);
router.patch('/updateProgram', auth, updateProgram);
router.delete('/deleteProgram/:id', auth, deleteProgram);


export default router;