import { Suspense } from "react";
import Details from "./Details";

export default function Page() {
  return (
  <Suspense>
    <Details />
  </Suspense>
  )
}