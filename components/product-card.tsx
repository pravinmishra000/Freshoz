'use client';

import Image from "next/image";
import { CURRENCY } from "@/utils/config";

export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string; // optional, agar image missing ho
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void; // optional handler
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.log("Add to cart clicked:", product);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition">
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-[150px] w-[150px] items-center justify-center bg-gray-100 rounded-xl">
          <span className="text-gray-400 text-sm">No Image</span>
        </div>
      )}

      <h3 className="mt-3 text-lg font-semibold text-center">{product.name}</h3>

      <p className="mt-1 text-gray-700 text-base font-medium">
        {CURRENCY}{product.price}
      </p>

      <button
        onClick={handleAdd}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
