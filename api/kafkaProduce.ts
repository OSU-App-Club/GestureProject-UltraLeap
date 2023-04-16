import { Kafka, Producer, ProducerRecord } from 'kafkajs';

const kafka = new Kafka({
    brokers: ['winning-chipmunk-13286-us1-kafka.upstash.io:9092'],
    sasl: {
        mechanism: 'scram-sha-256',
        username:
            'd2lubmluZy1jaGlwbXVuay0xMzI4NiRu6Cm3A9Mo_Q6mThRD_7s0zqgOo3T7pIE',
        password: '9f10c92e53ff4e96baafdadbc2c9c6fe'
    },
    ssl: true
});

const producer: Producer = kafka.producer();

export const connect = async (): Promise<void> => {
    await producer.connect();
    console.log('Connected to Kafka');
};

export const disconnect = async (): Promise<void> => {
    await producer.disconnect();
    console.log('Disconnected from Kafka');
};

export const produce = async (key: string, value: any): Promise<void> => {
    const record: ProducerRecord = {
        topic: 'Gestures',
        messages: [{ key, value }]
    };
    const ret = await producer.send(record);
    console.log(JSON.stringify(ret));
};
