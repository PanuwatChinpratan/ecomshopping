import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-hot-toast";
import { formatCurrencyString } from "use-shopping-cart/core";

export default function ProductCard({ product }) {
  const { addItem } = useShoppingCart();
  function AddtoCart(e) {
    e.preventDefault();
    const id = toast.loading("Add one item...");
    addItem(product);
    toast.success(`${product.name} added`, { id });
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="border-2 rounded-md group overflow-hidden"
    >
      <div className="relative w-full h-64">
        <Image
          src={product.image}
          alt={product.name}
          priority={true}
          fill
          sizes="100%"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="p-6 bg-white">
        <p className="font-semibold text-lg">{product.name}</p>
        <Rating />
        <div className="mt-4 flex items-center justify-between space-x-2">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">
              {formatCurrencyString({
                currency: product.currency,
                value: product.price,
              })}
            </p>
          </div>
          <button className="border rounded-lg py-1 px-4" onClick={AddtoCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
