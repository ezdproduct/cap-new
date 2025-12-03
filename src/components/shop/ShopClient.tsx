"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import MobileFilterButton from "@/components/shop/MobileFilterButton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShopClientProps {
  initialProducts: Product[];
}

interface FilterState {
  categories: string[];
  tags: string[];
  levels: string[];
  prices: string[];
}

const ITEMS_PER_PAGE = 9;

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default"); // State cho sắp xếp
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    categories: [],
    tags: [],
    levels: [],
    prices: [],
  });

  // Extract available filters from products
  const availableFilters = useMemo<FilterState>(() => {
    const uniqueCategories = new Set<string>();
    const uniqueTags = new Set<string>();
    const uniqueLevels = new Set<string>();

    initialProducts.forEach((product) => {
      product.categories.forEach((cat) => uniqueCategories.add(cat.name));
      product.tags?.forEach((tag) => uniqueTags.add(tag));
      if (product.level) uniqueLevels.add(product.level);
    });

    return {
      categories: Array.from(uniqueCategories).sort(),
      tags: Array.from(uniqueTags).sort(),
      levels: Array.from(uniqueLevels).sort(),
      prices: ["Miễn phí", "Trả phí"],
    };
  }, [initialProducts]);

  const handleFilterChange = (
    type: keyof FilterState,
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleSearchChange = (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    // 1. Filter
    let result = initialProducts.filter((product) => {
      const searchMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const levelMatch =
        selectedFilters.levels.length === 0 ||
        (product.level && selectedFilters.levels.includes(product.level));
      
      const categoryMatch =
        selectedFilters.categories.length === 0 ||
        product.categories.some((cat) =>
          selectedFilters.categories.includes(cat.name)
        );
      
      const tagMatch =
        selectedFilters.tags.length === 0 ||
        (product.tags && product.tags.some((tag) => selectedFilters.tags.includes(tag)));
      
      const priceMatch =
        selectedFilters.prices.length === 0 ||
        selectedFilters.prices.some((priceFilter) => {
          const isFree = product.price === "0";
          if (priceFilter === "Miễn phí") return isFree;
          if (priceFilter === "Trả phí") return !isFree;
          return false;
        });

      return searchMatch && levelMatch && categoryMatch && tagMatch && priceMatch;
    });

    // 2. Sort
    if (sortOption !== "default") {
      result = [...result].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        switch (sortOption) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "price_asc":
            return priceA - priceB;
          case "price_desc":
            return priceB - priceA;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [initialProducts, searchTerm, selectedFilters, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-6 pb-8 pt-24 bg-white min-h-screen">
      <div className="lg:hidden mb-6">
        <MobileFilterButton
          filters={availableFilters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <div className="hidden lg:block">
          <FilterSidebar
            filters={availableFilters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
        
        <div className="flex flex-col justify-between">
           {/* Header: Result count & Sorting */}
           <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="text-sm text-gray-500">
               Hiển thị {paginatedProducts.length} / {filteredProducts.length} khóa học
             </div>
             
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sắp xếp theo:</span>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px] bg-white border-gray-200">
                    <SelectValue placeholder="Mặc định" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Mới nhất</SelectItem>
                    <SelectItem value="name_asc">Tên: A - Z</SelectItem>
                    <SelectItem value="name_desc">Tên: Z - A</SelectItem>
                    <SelectItem value="price_asc">Giá: Thấp đến Cao</SelectItem>
                    <SelectItem value="price_desc">Giá: Cao đến Thấp</SelectItem>
                  </SelectContent>
                </Select>
             </div>
           </div>
          
          <ProductGrid products={paginatedProducts} />
          
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(Math.max(1, currentPage - 1));
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                        <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                            }}
                        >
                            {page}
                        </PaginationLink>
                        </PaginationItem>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                      return <PaginationItem key={i}><span className="px-4">...</span></PaginationItem>
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(Math.min(totalPages, currentPage + 1));
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}