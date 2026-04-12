"use client"

import { Suspense } from "react"
import Client from "./Client"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  )
}