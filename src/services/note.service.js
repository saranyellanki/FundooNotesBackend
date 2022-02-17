import Notes from '../models/note.model';
import { client } from '../config/redis';

export const newNote = async (body) => {
    const data = await Notes.create(body);
    return data;
};

export const getAllNotes = async (body) => {
    const data = await Notes.find({ userId : body.userId, isDeleted : false, isArchieved : false });
    // await client.set('getData',JSON.stringify(data));
    return data;
}


export const singleNote = async (params) => {
    const data = await Notes.find({ _id : params._id });
    // await client.set('singleData',JSON.stringify(data));
    return data;
}

export const archievedNotes = async (body) => {
    const data = await Notes.find({ userId : body.userId , isArchieved:true });
    return data;
}

export const trashedNotes = async (body) => {
    const data = await Notes.find({ userId : body.userId , isDeleted:true });
    return data;
}

export const updateNote = async (req) => {
    // await client.del('singleData');
    const user = await Notes.find({ _id: req.body._id });
    const data = await Notes.findByIdAndUpdate(req.body._id, {
        Title : req.body.Title ? req.body.Title : user[0].Title,
        Description : req.body.Description ? req.body.Description : user[0].Description,
        Color : req.body.Color ? req.body.Color : user[0].Color,
        isArchieved : req.body.isArchieved ? req.body.isArchieved : user[0].isArchieved,
        isDeleted : req.body.isDeleted ? req.body.isDeleted : user[0].isDeleted,
        userId : req.body.userId ? req.body.userId : user[0].userId
    }, {new: true});
    // await client.set('singleData',JSON.stringify(data));
    return data;
}

export const deleteNote = async (req) => {
    const data = await Notes.findByIdAndDelete(req.body._id);
    return data;
}