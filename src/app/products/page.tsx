// src/app/(dashboard)/products/page.tsx
"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterSection } from "@/components/products/FilterSection";
import { SearchBar } from "@/components/products/SearchBar";
import { Product, ProductFilter } from "@/types/product";
import { Pagination } from "@/components/products/Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Smartphone X",
      sku: "SKU001",
      price: 599.99,
      category: "Electronics",
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S1", name: "TechGadgets", rating: 4.7 },
    },
    {
      id: "2",
      name: "Designer Jeans",
      sku: "SKU002",
      price: 89.99,
      category: "Clothing",
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S2", name: "FashionHub", rating: 4.5 },
    },
    {
      id: "3",
      name: "Smart Home Hub",
      sku: "SKU003",
      price: 129.99,
      category: "Electronics",
      stock: 75,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S1", name: "TechGadgets", rating: 4.7 },
    },
    {
      id: "4",
      name: "Ergonomic Chair",
      sku: "SKU004",
      price: 199.99,
      category: "Furniture",
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S3", name: "ComfortLiving", rating: 4.8 },
    },
    {
      id: "5",
      name: "Fitness Tracker",
      sku: "SKU005",
      price: 79.99,
      category: "Electronics",
      stock: 150,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S1", name: "TechGadgets", rating: 4.7 },
    },
    {
      id: "6",
      name: "Gourmet Coffee Maker",
      sku: "SKU006",
      price: 149.99,
      category: "Appliances",
      stock: 40,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S4", name: "KitchenWonders", rating: 4.6 },
    },
    {
      id: "7",
      name: "Wireless Earbuds",
      sku: "SKU007",
      price: 129.99,
      category: "Electronics",
      stock: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S1", name: "TechGadgets", rating: 4.7 },
    },
    {
      id: "8",
      name: "Yoga Mat",
      sku: "SKU008",
      price: 29.99,
      category: "Sports",
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S5", name: "ActiveLife", rating: 4.4 },
    },
    {
      id: "9",
      name: "Stainless Steel Water Bottle",
      sku: "SKU009",
      price: 24.99,
      category: "Accessories",
      stock: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S5", name: "ActiveLife", rating: 4.4 },
    },
    {
      id: "10",
      name: "Portable Charger",
      sku: "SKU010",
      price: 49.99,
      category: "Electronics",
      stock: 150,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { id: "S1", name: "TechGadgets", rating: 4.7 },
    },
  ]);

  const [filters, setFilters] = useState<ProductFilter>({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // You can adjust this number

  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = (product: Product) => {
    // Implement add to cart functionality
    console.log("Adding to cart:", product);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.category === "" || product.category === filters.category) &&
      product.price >= (filters.minPrice ?? 0) &&
      product.price <= (filters.maxPrice ?? Infinity),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="mx-auto p-8">
      <h1 className="text-2xl font-bold pb-6">Products</h1>
      <div className="flex pb-6">
        <div className="w-1/4 pr-4">
          <FilterSection filter={filters} setFilter={setFilters} />
        </div>
        <div className="w-3/4">
          <SearchBar onSearch={setSearchTerm} />
          <div className="pt-6">
            <ProductGrid
              products={paginatedProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
