// src/wsClient.ts
let socket: WebSocket;

export const connectWebSocket = (onMessage: (data: any) => void) => {
  socket = new WebSocket('ws://localhost:4000/ws');

  socket.onopen = () => console.log('WebSocket connected');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected, retrying...');
    setTimeout(() => connectWebSocket(onMessage), 3000);
  };

  setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) socket.send('ping');
  }, 30000);
};