// backend/src/ws/gateway.ts
import { Server } from 'http';
import WebSocket from 'ws';

let clients: WebSocket[] = [];

export const setupWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    clients.push(ws);
    ws.send(JSON.stringify({ type: 'connected' }));

    ws.on('close', () => {
      clients = clients.filter(c => c !== ws);
    });

    setInterval(() => {
      ws.ping();
    }, 30000);
  });
};

export const emitOrderCreated = (orderId: number) => {
  const message = JSON.stringify({ type: 'order_created', orderId });
  clients.forEach(ws => ws.readyState === WebSocket.OPEN && ws.send(message));
};