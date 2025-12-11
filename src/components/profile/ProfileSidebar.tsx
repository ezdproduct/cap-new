"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, History, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/profile', label: 'Bảng điều khiển', icon: LayoutDashboard },
  { href: '/profile/my-courses', label: 'Khóa học của tôi', icon: BookOpen },
  { href: '/profile/order-history', label: 'Lịch sử đơn hàng', icon: History },
  { href: '/profile/settings', label: 'Cài đặt', icon: Settings },
];

const NavLink = ({ href, label, icon: Icon }: typeof navItems[0]) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "bg-cap-purple text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export default function ProfileSidebar() {
  const { user } = useAuth();
  const displayName = user?.displayName || 'Student';
  const email = user?.email || '';

  return (
    <aside className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <div className="flex flex-col items-center text-center p-4 border-b mb-4">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarFallback className="text-3xl bg-cap-dark-blue text-white">
            {displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-lg text-cap-dark-blue">{displayName}</h2>
        <p className="text-sm text-gray-500 truncate w-full">{email}</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}