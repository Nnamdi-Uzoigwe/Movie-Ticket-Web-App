import { Suspense } from "react";
import ReceiptPage from "./ReceiptPage";


export default function Page() {
  return (
  <Suspense>
    <ReceiptPage />
  </Suspense>
  )
}