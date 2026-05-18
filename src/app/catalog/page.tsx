"use client"

import { useMemo, useState } from "react"
import AppShell from "@/components/AppShell"
import { mockProducts } from "@/data/mockProducts"
import ProductCard from "@/components/ProductCard"
import CartBar from "@/components/CartBar"

const categories = [
  { id: "cheese", name: "Сыры" },
  { id: "milk", name: "Молочка" },
  { id: "meat", name: "Колбасы" },
]

export default function CatalogPage() {
  const [category, setCategory] = useState("cheese")

  const filtered = useMemo(() => {
    return mockProducts.filter((p) => p.category === category)
  }, [category])

  return (
    <AppShell>

      <div className="p-3 pb-28">

        {/* HEADER */}
        <div className="mb-3">
          <h1 className="text-[#0B1F3A] text-xl font-semibold">
            Каталог
          </h1>

          <p className="text-xs text-gray-500">
            Сыры, молочка, колбасы
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`
                px-3 py-1 rounded-full text-xs border whitespace-nowrap transition
                ${category === c.id
                  ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                  : "bg-white text-gray-600 border-[#E2E8F0]"}
              `}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-3 mt-3">

          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              brand={p.brand}
              weight={p.weight}
              country={p.country}
            />
          ))}

        </div>

      </div>

      <CartBar />

    </AppShell>
  )
}