import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { startMediasoup, router } from './mediasoupServer';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

async function initialize() {
    await startMediasoup();

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Example event to create a transport
        socket.on('create-transport', async (_, callback) => {
            const transport = await router.createWebRtcTransport({
                listenIps: [{ ip: '0.0.0.0', announcedIp: 'YOUR_PUBLIC_IP' }],
                enableUdp: true,
                enableTcp: true,
                preferUdp: true
            });

            callback({
                id: transport.id,
                iceParameters: transport.iceParameters,
                iceCandidates: transport.iceCandidates,
                dtlsParameters: transport.dtlsParameters
            });
        });
    });

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

initialize().catch((error) => {
    console.error('Error initializing server:', error);
});
