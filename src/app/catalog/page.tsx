"use client"

import { useMemo, useState } from "react"
import AppShell from "@/components/AppShell"
import { mockProducts } from "@/data/mockProducts"

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
      <div className="p-3">

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
                px-3 py-1 rounded-full text-xs border whitespace-nowrap
                ${category === c.id
                  ? "bg-[#0B1F3A] text-white"
                  : "bg-white text-gray-600"}
              `}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-3 mt-3">

          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#E2E8F0] rounded-xl p-3"
            >

              {/* IMAGE PLACEHOLDER */}
              <div className="h-20 bg-gray-100 rounded-lg mb-2" />

              {/* TITLE */}
              <div className="text-sm font-medium text-[#1A1A1A]">
                {p.title}
              </div>

              {/* META */}
              <div className="text-[11px] text-gray-500 mt-1">
                {p.brand} · {p.weight}
              </div>

              <div className="text-[11px] text-gray-400">
                {p.country}
              </div>

              {/* ACTION */}
              <button className="mt-2 w-full bg-[#0B1F3A] text-white text-xs py-1.5 rounded-lg">
                Добавить
              </button>

            </div>
          ))}

        </div>

      </div>
    </AppShell>
  )
}