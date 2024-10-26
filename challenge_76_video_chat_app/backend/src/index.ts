import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { startMediasoup, router } from './mediasoupServer';

const app = express();
const server = http.createServer(app);

// Add CORS configuration here
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001', // Adjust to match your frontend URL
    methods: ['GET', 'POST']
  }
});

async function initialize() {
  await startMediasoup();

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    // Your socket event handling logic here
  });

  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

initialize().catch((error) => {
  console.error('Error initializing server:', error);
});
