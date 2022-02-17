import amqp from 'amqplib';
import * as mailer from '../middlewares/nodemailer'

export const sender = async (data) => {
    try {
        const strData = JSON.stringify(data);
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("register");
        channel.sendToQueue("register", Buffer.from(strData));
        console.log(`Job sent successfully ${strData}`);
    }
    catch (ex) {
        console.error(ex)
    }
}

const receivers =  async () => {
    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("register");
        channel.consume("register", (strData) => {
            const input = JSON.parse(strData.content.toString())
            console.log(input);
        },{
            noAck:true
        });
    }
    catch (ex) {
        console.error(ex)
    }
}