import express from 'express';
import * as noteController from '../controllers/note.controller';
import { auth } from '../middlewares/auth.middleware';
import { redisCheck, checkSingleNote } from '../middlewares/redis.middleware';

const router = express.Router();

//route to add notes
router.post('', auth, noteController.newNote);

//route to get all notes
router.get('', auth, redisCheck, noteController.getAllNotes);

//route to get archieved notes
router.get('/archievedNotes', auth, noteController.archievedNotes);

//route to get trashed notes
router.get('/trashedNotes', auth, noteController.trashedNotes);

// route to get single note
router.get('/:_id', auth, checkSingleNote ,noteController.singleNote);

// route to update note
router.put('', auth, noteController.updateNote);

// route to delete note
router.delete('', auth, noteController.deleteNote);

export default router;