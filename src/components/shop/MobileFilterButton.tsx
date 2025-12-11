"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Filter } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

interface FilterState {
  categories: string[];
  tags: string[];
  levels: string[];
  prices: string[];
}

interface MobileFilterButtonProps {
  filters: FilterState;
  selectedFilters: FilterState;
  onFilterChange: (type: keyof FilterState, value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  searchTerm,
  onSearchChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-auto flex items-center justify-center">
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Bộ lọc khóa học</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto h-full pb-20">
          <FilterSidebar
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onApply={handleApply}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterButton;