// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleRpc } from './rpc/handler';
import { setupWebSocket } from './ws/gateway';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// JSON-RPC endpoint
app.post('/rpc', handleRpc);

// Start server
const server = app.listen(4000, () => {
  console.log('Backend running on port 4000');
});

// WebSocket setup
setupWebSocket(server);