import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  return {
    items: isMounted ? items : [],
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: isMounted ? totalItems : 0,
    totalPrice: isMounted ? totalPrice : 0,
  };
};