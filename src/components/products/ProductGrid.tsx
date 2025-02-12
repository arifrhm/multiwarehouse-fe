import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-sm flex flex-col h-full">
          <div className="flex-1">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.imageUrl || "/placeholder-image.jpg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">{product.seller.name}</p>
            <p className="text-sm text-gray-500 mb-2">{product.seller.rating}</p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-md mt-auto"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};