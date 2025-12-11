import { useState, useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlist';

export const useWishlist = () => {
  const { items, addItem, removeItem, isItemInWishlist } = useWishlistStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    items: isMounted ? items : [],
    addItem,
    removeItem,
    isItemInWishlist: isMounted ? isItemInWishlist : () => false,
    totalItems: isMounted ? items.length : 0,
  };
};