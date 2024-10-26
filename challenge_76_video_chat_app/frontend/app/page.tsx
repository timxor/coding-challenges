"use client";

import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// Create a connection to the backend signaling server
const socket: Socket = io('http://localhost:3000'); // Adjust URL as needed

const VideoChat: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Connection setup for WebSocket
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to backend');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from backend');
    });

    // Listen for messages from the backend
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Clean up event listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  return (
    <main>
      <h1>Video Chat Application</h1>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>

      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default VideoChat;
