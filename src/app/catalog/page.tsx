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
  subcategory?: string
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
  const [subcategory, setSubcategory] = useState("")
  const [search, setSearch] = useState("")

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
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

  const subcategories = useMemo(() => {
    const current = products.filter(
      (p) => p.category === category
    )

    return [...new Set(current.map((p) => p.subcategory))]
  }, [products, category])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        p.category === category

      const subcategoryMatch =
        !subcategory ||
        p.subcategory === subcategory

      const searchMatch =
        p.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        p.brand
          .toLowerCase()
          .includes(search.toLowerCase())

      return (
        categoryMatch &&
        subcategoryMatch &&
        searchMatch
      )
    })
  }, [products, category, subcategory, search])

  return (
    <AppShell>

      <div className="p-3 pb-28">

        {/* HEADER */}
        <div className="mb-3">
          <h1 className="text-[#0B1F3A] text-xl font-semibold">
            Каталог
          </h1>

          <p className="text-xs text-gray-500">
            Оптовый ассортимент
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCategory(c.id)
                setSubcategory("")
              }}
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

        {/* SEARCH */}
        <div className="mt-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск товара или бренда"
            className="
              w-full
              bg-white
              border
              border-[#E2E8F0]
              rounded-2xl
              px-4
              py-3
              text-sm
              outline-none
            "
          />
        </div>

        {/* SUBCATEGORIES */}
        <div className="flex gap-2 overflow-x-auto mt-3 pb-2">

          <button
            onClick={() => setSubcategory("")}
            className={`
              px-3 py-1 rounded-full text-xs border whitespace-nowrap
              ${subcategory === ""
                ? "bg-[#2C5D7A] text-white border-[#2C5D7A]"
                : "bg-white text-gray-600 border-[#E2E8F0]"}
            `}
          >
            Все
          </button>

          {subcategories.map((s) => (
            <button
              key={String(s)}
              onClick={() => setSubcategory(String(s))}
              className={`
                px-3 py-1 rounded-full text-xs border whitespace-nowrap
                ${subcategory === s
                  ? "bg-[#2C5D7A] text-white border-[#2C5D7A]"
                  : "bg-white text-gray-600 border-[#E2E8F0]"}
              `}
            >
              {s}
            </button>
          ))}

        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-4 text-sm text-gray-500">
            Загрузка каталога...
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="mt-10 text-center text-sm text-gray-500">
            Ничего не найдено
          </div>
        )}

        {/* GRID */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-3">

            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                id={String(p.id)}
                title={p.title}
                brand={p.brand}
                weight={p.weight}
                country={p.country}
                image={p.image}
              />
            ))}

          </div>
        )}

      </div>

      <CartBar />

    </AppShell>
  )
}