const amqp = require('amqplib');

module.exports = class MQ {
    constructor(q) {
        this.conn;
        this.uri = process.env.AMPQ_URL
        this.channel;
        this.q = q;
    }
    async setupConnection() {
        console.log(this.uri);
        this.conn = await amqp.connect('amqp://localhost');
        this.channel = await this.conn.createChannel();

        await this.channel.assertQueue(this.q, { durable: false });
    }   

    send(msg) {
        this.channel.sendToQueue(this.q, Buffer.from(msg));
        console.log(` ${this.q} sent with buffer ${msg}`);
    }

    async recv() {
        await this.channel.consume(this.q), (msg) =>{
            const result = msg.content.toString();
            console.log(`Receive ${result}`);
        };
    }
}