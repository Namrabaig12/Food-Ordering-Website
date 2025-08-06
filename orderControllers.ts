// backend/src/controllers/orderController.ts
import db from '../db/connection';

export const getMenu = async () => {
  const result = await db.query('SELECT * FROM menu_items');
  return result.rows;
};

export const placeOrder = async ({ items, customer, paymentMethod }) => {
  // Insert into orders table
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const orderRes = await db.query(
    'INSERT INTO orders (customer_name, customer_phone, total_amount, status, payment_ref) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [customer.name, customer.phone, total, 'PENDING', paymentMethod]
  );

  const orderId = orderRes.rows[0].id;

  // Insert into order_items
  for (const item of items) {
    await db.query(
      'INSERT INTO order_items (order_id, menu_item_id, qty, price) VALUES ($1, $2, $3, $4)',
      [orderId, item.id, item.qty, item.price]
    );
  }

  // Emit WebSocket event (optional)
  // emitOrderCreated(orderId);

  return { orderId };
};