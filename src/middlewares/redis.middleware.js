import { client } from "../config/redis"

export const redisCheck = async (req, res, next) => {
    // const value = await client.get('getData');
    const value = 5;
    if(value===null) {
        res.status(200).json({
            code: 200,
            data: JSON.parse(value),
            message: 'Notes fetched successfully from redis'
        });
    } else {
        next();
    }
}

export const checkSingleNote = async (req, res, next) => {
    const id = req.params._id;
    await client.del('singleData');
    const data = await client.get('singleData');
    // const data = await JSON.parse(value);
    if(data==null){
        next();
    } else {
        res.status(200).json({
            code: 200,
            data: data,
            message: 'Note fetched successfully from redis'
        });
    }
}