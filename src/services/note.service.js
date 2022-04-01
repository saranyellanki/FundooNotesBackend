import Notes from '../models/note.model';
import cron from 'node-cron';
import { client } from '../config/redis';

export const newNote = async (body) => {
    const data = await Notes.create(body);
    return data;
};

export const getAllNotes = async (body) => {
    const data = await Notes.find({ userId: body.userId, isDeleted: false, isArchieved: false });
    // await client.set('getData',JSON.stringify(data));
    return data;
}


export const singleNote = async (params) => {
    const data = await Notes.find({ _id: params._id });
    // await client.set('singleData',JSON.stringify(data));
    return data;
}

export const archievedNotes = async (body) => {
    const data = await Notes.find({ userId: body.userId, isArchieved: true, isDeleted: false });
    return data;
}

export const trashedNotes = async (body) => {
    const data = await Notes.find({ userId: body.userId, isDeleted: true });
    return data;
}

export const updateNote = async (req) => {
    // await client.del('singleData');
    const user = await Notes.findOne({ _id: req.body._id });
    const data = await Notes.findByIdAndUpdate({_id:req.body._id}, {
        $set: {
            Title: req.body.Title ? req.body.Title : user.Title,
            Description: req.body.Description ? req.body.Description : user.Description,
            Color: req.body.Color ? req.body.Color : user.Color,
            isArchieved: req.body.isArchieved ? req.body.isArchieved : user.isArchieved,
            isDeleted: req.body.isDeleted ? req.body.isDeleted : user.isDeleted,
            userId: req.body.userId ? req.body.userId : user.userId
        }
    }, { new: true });
    // await client.set('singleData',JSON.stringify(data));
    return data;
}

export const deleteNote = async (req) => {
    const data = await Notes.findByIdAndDelete(req.body._id);
    return data;
}

cron.schedule('* * */30 * *', async () => {
    console.log("Deleted");
    await Notes.deleteMany({ isDeleted: true });
})