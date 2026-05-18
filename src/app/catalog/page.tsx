"use client"

import { useEffect, useMemo, useState } from "react"
import AppShell from "@/components/AppShell"
import ProductCard from "@/components/ProductCard"
import CartBar from "@/components/CartBar"

type Product = {
  id: string
  title: string
  brand: string
  category: string
  weight?: string
  country?: string
  image?: string
}

const categories = [
  { id: "cheese", name: "Сыры" },
  { id: "milk", name: "Молочка" },
  { id: "meat", name: "Колбасы" },
]

export default function CatalogPage() {
  const [category, setCategory] = useState("cheese")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        const res = await fetch("/api/products")
        const data = await res.json()

        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => p.category === category)
  }, [products, category])

  return (
    <AppShell>

      <div className="p-3 pb-28">

        {/* HEADER */}
        <div className="mb-3">
          <h1 className="text-[#0B1F3A] text-xl font-semibold">
            Каталог
          </h1>

          <p className="text-xs text-gray-500">
            Живые данные из Excel
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
                  ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                  : "bg-white text-gray-600 border-[#E2E8F0]"}
              `}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-sm text-gray-500 mt-4">
            Загрузка товаров...
          </div>
        )}

        {/* GRID */}
        {!loading && (
          <div className="grid grid-cols-2 gap-3 mt-3">

            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                id={String(p.id)}
                title={p.title}
                brand={p.brand}
                weight={p.weight}
                country={p.country}
              />
            ))}

          </div>
        )}

      </div>

      <CartBar />

    </AppShell>
  )
}