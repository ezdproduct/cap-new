"use client";

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

const LOGIN_URL = "https://course.learnwithcap.com/tai-khoan/";

export default function WishlistButton({ product, className }: WishlistButtonProps) {
  const { isItemInWishlist, addItem, removeItem } = useWishlist();
  const isInWishlist = isItemInWishlist(product.id);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // TODO: Kết nối với AuthContext thực tế. Hiện tại giả lập chưa đăng nhập để demo popup.
  const isLoggedIn = false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Nếu chưa đăng nhập thì hiện popup
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    
    if (isInWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleClick} 
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={cn("hover:bg-transparent transition-colors", className)}
      >
        <Bookmark 
          className={cn(
            "h-5 w-5 transition-all",
            isInWishlist 
              ? "text-cap-purple fill-cap-purple" 
              : "text-gray-600 hover:text-cap-purple"
          )} 
        />
      </Button>

      <AlertDialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yêu cầu đăng nhập</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn cần đăng nhập tài khoản để lưu khóa học vào danh sách yêu thích của riêng mình.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Hủy</AlertDialogCancel>
            <AlertDialogAction asChild onClick={(e) => e.stopPropagation()} className="bg-cap-dark-blue hover:bg-cap-purple text-white">
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Đăng nhập ngay
              </a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}