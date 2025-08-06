// src/pages/Cart.tsx
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../store/cartSlice';

export default function Cart() {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.map((item: any) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span>{item.name} x {item.qty}</span>
          <span>₹{item.price * item.qty}</span>
          <button onClick={() => dispatch(removeItem(item.id))} className="text-red-500">Remove</button>
        </div>
      ))}
    </div>
  );
}