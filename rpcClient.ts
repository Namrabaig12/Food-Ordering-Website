// src/rpcClient.ts
import axios from 'axios';

export const rpcCall = async (method: string, params: any = {}) => {
  const payload = {
    jsonrpc: '2.0',
    method,
    params,
    id: Date.now(),
  };

  try {
    const res = await axios.post('http://localhost:4000/rpc', payload);
    return res.data.result;
  } catch (err) {
    console.error('RPC Error:', err);
    throw err;
  }
};