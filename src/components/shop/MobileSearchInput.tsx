"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MobileSearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function MobileSearchInput({ searchTerm, onSearchChange }: MobileSearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Tìm kiếm khóa học..."
        className="pl-9 bg-white border-gray-200 focus:border-cap-purple focus:ring-cap-purple h-10"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}