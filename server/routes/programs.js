import express from "express";

import { getAllPrograms, getProgramById, createProgram, updateProgram, deleteProgram } from "../controllers/programs.js";
// import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/getAllPrograms', getAllPrograms);
router.get('/getProgram/:id', getProgramById);
router.post('/createProgram', createProgram);
router.patch('/updateProgram', updateProgram);
router.delete('/deleteProgram/:id', deleteProgram);


export default router;