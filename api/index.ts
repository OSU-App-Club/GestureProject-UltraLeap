import { connect, disconnect, produce } from './kafka.ts';
import { Server as WebSocketServer, WebSocket } from 'ws';

main();

function main() {
    const wss = new WebSocketServer({ port: 4000, path: '/kafka' });
    console.log('WebSocket server listening on port 4000');

    // Wait for a client to connect to the WebSocket server
    wss.on('connection', async (ws: any, request: any) => {
        console.log('Client connected');

        // forcefully disconnect existing websocket clients
        wss.clients.forEach((client: any) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.terminate();
            }
        });

        // Get query parameters from the request URL
        const urlParams = new URLSearchParams(request.url.split('?')[1]);

        // Get the value of the 'pin' parameter
        const pinCode = urlParams.get('pinCode');

        if (pinCode == null) {
            console.error('Missing pinCode parameter');
            ws.send('Missing pinCode parameter');
            ws.close();
            return;
        }

        // Do something with the pin parameter
        console.log('Received pinCode parameter:', pinCode);

        disconnect();
        await connect();

        // Listen for WebSocket messages
        ws.on('message', (message: any) => {
            const messageString = message.toString();
            console.log('Received message:', messageString);
            produce(pinCode, messageString);
        });

        // Listen for WebSocket close events
        ws.on('close', async () => {
            console.log('Client disconnected');
            disconnect();
        });
    });
}
