"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterState {
  categories: string[];
  tags: string[];
  levels: string[];
  prices: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  selectedFilters: FilterState;
  onFilterChange: (type: keyof FilterState, value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onApply?: () => void; 
}

const FilterAccordionItem: React.FC<{
  title: string;
  value: string;
  type: keyof FilterState;
  options: string[];
  selected: string[];
  onChange: (type: keyof FilterState, value: string) => void;
}> = ({ title, value, type, options, selected, onChange }) => (
  <AccordionItem value={value} className="border-b border-gray-100">
    <AccordionTrigger className="text-base font-bold text-cap-dark-blue hover:text-cap-purple hover:no-underline py-4">
      {title}
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-3 pt-1 pb-4 pl-1">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-3">
            <Checkbox 
              id={`${type}-${option}`} 
              checked={selected.includes(option)}
              onCheckedChange={() => onChange(type, option)}
              className="border-gray-300 text-cap-purple focus:ring-cap-purple data-[state=checked]:bg-cap-purple data-[state=checked]:border-cap-purple"
            />
            <Label 
              htmlFor={`${type}-${option}`} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-600 hover:text-cap-dark-blue transition-colors"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onApply,
}) => {
  return (
    <aside className="p-4 lg:p-0 lg:sticky lg:top-24 bg-white rounded-xl lg:bg-transparent self-start">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm khóa học..."
          className="pl-9 bg-white border-gray-200 focus:border-cap-purple focus:ring-cap-purple"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Accordion type="multiple" className="w-full space-y-2">
        {filters.categories.length > 0 && (
          <FilterAccordionItem
            title="Lĩnh vực"
            value="categories"
            type="categories"
            options={filters.categories}
            selected={selectedFilters.categories}
            onChange={onFilterChange}
          />
        )}

        {filters.levels.length > 0 && (
          <FilterAccordionItem
            title="Mức độ"
            value="levels"
            type="levels"
            options={filters.levels}
            selected={selectedFilters.levels}
            onChange={onFilterChange}
          />
        )}

        <FilterAccordionItem
          title="Giá"
          value="prices"
          type="prices"
          options={filters.prices}
          selected={selectedFilters.prices}
          onChange={onFilterChange}
        />

        {filters.tags.length > 0 && (
          <FilterAccordionItem
            title="Từ khoá"
            value="tags"
            type="tags"
            options={filters.tags}
            selected={selectedFilters.tags}
            onChange={onFilterChange}
          />
        )}
      </Accordion>
      
      {onApply && (
        <div className="pt-6 mt-4 border-t border-gray-100 lg:hidden">
          <Button onClick={onApply} className="w-full bg-cap-purple hover:bg-cap-dark-blue text-white h-12 text-base font-medium">
            Xem kết quả
          </Button>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;