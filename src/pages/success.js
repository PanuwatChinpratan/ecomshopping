import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useShoppingCart } from "use-shopping-cart";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useShoppingCart();
  const sessionId = router.query.session_id;

  const { data, error } = useSWR(
    () => (sessionId ? `/api/checkout-sessions/${sessionId}` : null),//เป็นฟังก์ชันที่ใช้ในการคำนวณ URL ว่ามีค่าหรอไม่
    (URL) => axios.get(URL).then((res) => res.data),  //ฟังชันที่ใช้ในการเรียก API ด้วย Axios โดยใช้ URL ที่ได้มาจากขั้นตอนแรก /api/checkout-sessions/${sessionId}` ได้รับมาจาก server จะนำข้อมูลใน res.data นำไปใช้ต่อ
    {
      onSuccess() {  //เมื่อเสร็จแล้วให้ clearcart (method)
        clearCart();
      },
    }
  );
  // console.log(data, error);
  const email = data?.customer_details?.email; //res.data นำมาใช้ตรงนี้

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      {error ? (
        <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
          <p className="text-lg">Sorry , something went wrong!</p>
        </div>
      ) : !data ? (
        <div className="p-2 rounded-md text-gray-500 max-w-md mx-auto">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <div className="py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto">
          <CheckCircleIcon className="w-24 h-24 mx-auto flex-shrink-0 text-lime-600" />
          <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            Thanks for your order!
          </h2>
          <p className="text-lg">
            Check your email ({email}) for your invoice.
          </p>
        </div>
      )}
    </div>
  );
}
