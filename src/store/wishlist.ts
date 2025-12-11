import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isItemInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        if (!items.find(item => item.id === product.id)) {
          set({ items: [...items, product] });
          toast.success(`${product.name} added to your wishlist.`);
        } else {
          // Optional: If you want to remove it when clicking again
          // get().removeItem(product.id);
        }
      },
      removeItem: (productId) => {
        const itemToRemove = get().items.find(item => item.id === productId);
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
        if (itemToRemove) {
          toast.error(`${itemToRemove.name} removed from your wishlist.`);
        }
      },
      isItemInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);