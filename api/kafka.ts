// referenced code from https://developer.confluent.io/get-started/nodejs/#build-producer

import Kafka from 'node-rdkafka';

const producer = new Kafka.Producer({
    'bootstrap.servers': 'pkc-rgm37.us-west-2.aws.confluent.cloud:9092',
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': '44TSILYQLLH3SNPX',
    'sasl.password':
        '9g7KBW0emCSUXjb5Fa069DPqGrrTHhOf5UY78oZlZmLns1lLbAvnlQdBnu6rle/Y',
    'security.protocol': 'sasl_ssl',
    dr_msg_cb: true
});

export const connect = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        producer
            .on('ready', () => {
                console.log('Connected to Kafka');
                resolve();
            })
            .on('delivery-report', (err, report) => {
                if (err) {
                    console.warn('Error producing', err);
                } else {
                    let { topic, key, value } = report;

                    console.log(
                        `Produced event to topic ${topic}: key = ${key}, value = ${value}`
                    );
                }
            })
            .on('event.error', (err) => {
                console.warn('event.error', err);
                reject(err);
            });
        producer.connect();
    });
};

export const disconnect = () => {
    producer.flush(10000, () => {
        producer.disconnect();
    });
    console.log('Disconnected from Kafka');
};

export const produce = (key: string | undefined | null, value: string) => {
    const topic = 'Gestures';
    const valueBuff = Buffer.from(value);

    producer.produce(topic, -1, valueBuff, key);
};
