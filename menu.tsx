// src/pages/Menu.tsx
import { useEffect, useState } from 'react';
import { rpcCall } from '../rpcClient';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    rpcCall('getMenu').then(setMenu);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {menu.map((item: any) => (
        <div key={item.id} className="border p-2 rounded shadow">
          <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover" />
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>₹{item.price}</p>
          <button
            className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
            onClick={() => dispatch(addItem({ ...item, qty: 1 }))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}