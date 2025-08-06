// src/pages/Checkout.tsx
import { useSelector, useDispatch } from 'react-redux';
import { rpcCall } from '../rpcClient';
import { clearCart } from '../store/cartSlice';
import { useState } from 'react';

export default function Checkout() {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = async () => {
    const order = {
      items: cart,
      customer: form,
      paymentMethod: 'dummy',
    };
    const res = await rpcCall('placeOrder', order);
    alert(`Order placed! ID: ${res.orderId}`);
    dispatch(clearCart());
  };

  return (
    <div className="p-4">
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 mt-2">Place Order</button>
    </div>
  );
}