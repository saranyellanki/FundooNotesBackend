import { createClient } from 'redis';
import logger from './logger';
export const client = createClient();

const redis = async () => {
    try {
        await client.connect();    
        logger.info("Redis Connected")
    } catch (error) {
        console.log(error);
    }
}

// const redis = () => {
//     client.on('error', (error) => {
//         console.log('Error' , error);
//     })
//     client.on('connect', (error, res) => {
//         console.log("Redis connected", res);
//     })
// }

export default redis;