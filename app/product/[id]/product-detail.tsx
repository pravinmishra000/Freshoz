"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { Header } from "@/components/freshoz/header";
import { Footer } from "@/components/freshoz/footer";
import { BottomNav } from "@/components/freshoz/bottom-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Star } from "lucide-react";
import { ProductCard } from "@/components/freshoz/product-card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart, removeFromCart, getCartItem } = useCart();

  const product = products.find((p) => p.id === id);
  const cartItem = product ? getCartItem(product.id) : undefined;

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Product not found.</p>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const discountPercent =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const suggestedProducts = products
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const boughtTogetherProducts = products.filter((p) =>
    ["p5", "p17", "p20", "p29", "p30"].includes(p.id)
  );

  const variants = [
    {
      id: "v1",
      size: "1 kg",
      price: product.price,
      mrp: product.mrp,
      discount: discountPercent,
    },
    {
      id: "v2",
      size: "2 kg",
      price: product.price * 2 * 0.9,
      mrp: product.mrp * 2,
      discount: Math.round(
        ((product.mrp * 2 - product.price * 2 * 0.9) / (product.mrp * 2)) * 100
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Image + Details */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name_en}
                fill
                className="object-cover"
              />
              {discountPercent > 0 && (
                <Badge className="absolute right-3 top-3 bg-destructive text-base">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-primary">{product.brand}</p>
                <h1 className="text-3xl font-bold">{product.name_en}</h1>
                <p className="mt-1 text-lg text-muted-foreground">
                  {product.pack_size}
                </p>
              </div>

              {product.rating && product.rating_count && (
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-white">
                    <span>{product.rating.toFixed(1)}</span>
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span>({product.rating_count.toLocaleString()} ratings)</span>
                </div>
              )}

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price}
                </span>
                {product.mrp > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.mrp}
                  </span>
                )}
              </div>

              {discountPercent > 0 && (
                <p className="font-bold text-green-600">Special price</p>
              )}

              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}

              {product.stock_qty <= 5 && (
                <p className="font-semibold text-destructive">
                  Only {product.stock_qty} left in stock!
                </p>
              )}

              {/* Cart Actions */}
              <div className="mt-4">
                {cartItem ? (
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <span className="w-12 text-center text-xl font-bold">
                        {cartItem.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => addToCart(product)}
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Variants */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Select Variant</h2>
            <RadioGroup defaultValue={variants[0].id} className="space-y-4">
              {variants.map((variant) => (
                <Label
                  key={variant.id}
                  htmlFor={variant.id}
                  className="block cursor-pointer rounded-lg border-2 border-transparent has-[input:checked]:border-primary p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={variant.id} id={variant.id} />
                      <div>
                        {variant.discount > 0 && (
                          <Badge variant="destructive" className="mb-1">
                            {variant.discount}% OFF
                          </Badge>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">
                            ₹{Math.round(variant.price)}
                          </span>
                          <span className="text-muted-foreground line-through">
                            ₹{variant.mrp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{variant.size}</p>
                      <p className="text-sm text-muted-foreground">
                        @ ₹{Math.round(variant.price / parseInt(variant.size))} /kg
                      </p>
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Bought Together */}
          <div className="mt-16">
            <Separator />
            <h2 className="my-8 text-3xl font-bold">Bought Together</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {boughtTogetherProducts.map((p) => (
                <div key={p.id} className="w-40 flex-shrink-0">
                  <ProductCard product={p} view="suggestion" />
                </div>
              ))}
            </div>
          </div>

          {/* Similar Products */}
          {suggestedProducts.length > 0 && (
            <div className="mt-16">
              <Separator />
              <h2 className="my-8 text-3xl font-bold">Similar Products</h2>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {suggestedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
