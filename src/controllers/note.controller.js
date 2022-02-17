import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const newNote = async (req, res, next) => {
    try {
        const data = await NoteService.newNote(req.body);
        res.status(HttpStatus.CREATED).json({
            data: data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getAllNotes = async (req, res, next) => {
    try {
        const data = await NoteService.getAllNotes(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All notes fetched successfully'
        });
    } catch (error) {
        next(error);
    }
}

export const singleNote = async (req, res, next) => {
    try {
        const data = await NoteService.singleNote(req.params);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note fetched successfully'
        });
    } catch (error) {
        next(error);
    }
}

export const archievedNotes = async (req, res, next) => {
    try {
        const data = await NoteService.archievedNotes(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Archieved Notes'
        });
    } catch (error) {
        next(error)
    }
}

export const trashedNotes = async (req, res, next) => {
    try {
        const data = await NoteService.trashedNotes(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data : data,
            message: 'Deleted Notes'
        })
    } catch (error) {
        next(error)
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const data = await NoteService.updateNote(req);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note Updated successfully'
        });
    } catch (error) {
        next(error)
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const data = await NoteService.deleteNote(req);
        res.status(HttpStatus.OK).json({
            message: 'Note Deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}