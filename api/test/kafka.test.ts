import { connect, disconnect, produce } from '../kafka.ts';

async function main() {
    await connect();

    produce('mykey', 'my message');

    disconnect();
}

main();
