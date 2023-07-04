import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
       <Meta />
       <Header />
      <main className="flex-grow bg-[#f7f7f7]">
       {children}
      </main>
      <Footer />
    </div>
  );
}
