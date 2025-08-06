// backend/src/rpc/handler.ts
import { Request, Response } from 'express';
import { parse, success, error } from 'jsonrpc-lite';
import { getMenu, placeOrder } from '../controllers/orderController';

export const handleRpc = async (req: Request, res: Response) => {
  const parsed = parse(req.body);

  if (parsed.type === 'request') {
    const { method, params, id } = parsed.payload;

    try {
      let result;
      switch (method) {
        case 'getMenu':
          result = await getMenu(params);
          break;
        case 'placeOrder':
          result = await placeOrder(params);
          break;
        // Add other methods like getOrderStatus, confirmPayment etc.
        default:
          return res.json(error(id, { code: -32601, message: 'Method not found' }));
      }

      res.json(success(id, result));
    } catch (err) {
      res.json(error(id, { code: -32000, message: 'Server error', data: err }));
    }
  } else {
    res.status(400).send('Invalid JSON-RPC payload');
  }
};