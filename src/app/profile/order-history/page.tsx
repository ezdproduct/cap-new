"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

interface Order {
  id: number;
  date_created: string;
  total: string;
  status: string;
}

const statusMap: { [key: string]: { text: string; className: string } } = {
  'processing': { text: 'Đang xử lý', className: 'bg-blue-100 text-blue-800' },
  'completed': { text: 'Hoàn thành', className: 'bg-green-100 text-green-800' },
  'on-hold': { text: 'Tạm giữ', className: 'bg-yellow-100 text-yellow-800' },
  'pending': { text: 'Chờ thanh toán', className: 'bg-gray-100 text-gray-800' },
  'cancelled': { text: 'Đã hủy', className: 'bg-red-100 text-red-800' },
  'refunded': { text: 'Đã hoàn tiền', className: 'bg-purple-100 text-purple-800' },
  'failed': { text: 'Thất bại', className: 'bg-red-200 text-red-900' },
};

const AuthRequiredMessage = () => (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
        <LogIn className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-cap-dark-blue mb-2">Yêu cầu đăng nhập</h3>
        <p className="text-gray-500 mb-6">Vui lòng đăng nhập để xem lịch sử đơn hàng của bạn.</p>
        <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue">
            <Link href="/login">Đăng nhập ngay</Link>
        </Button>
    </div>
);

export default function OrderHistoryPage() {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchOrders = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/profile', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Failed to fetch orders');
          const data = await res.json();
          setOrders(data.orders);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [token, isAuthenticated]);

  if (!isAuthenticated && !isLoading) {
      return <AuthRequiredMessage />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-cap-dark-blue">Lịch sử đơn hàng</h1>
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã ĐH</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{format(new Date(order.date_created), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusMap[order.status]?.className || ''}>
                      {statusMap[order.status]?.text || order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat('vi-VN').format(parseFloat(order.total))} đ</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Bạn chưa có đơn hàng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}