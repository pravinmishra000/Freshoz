export async function generateStaticParams() {
  const { products } = await import("@/lib/data");
  return products.map((product) => ({
    id: product.id,
  }));
}