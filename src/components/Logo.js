import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/finallogo.png" alt="Logo" width={42} height={42} />
      <span className="hidden sm:inline-block font-extrabold text-3xl text-gray-700">
        MiloStore
      </span>
    </Link>
  );
}
