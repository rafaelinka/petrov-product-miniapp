"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

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

  description?: string
  composition?: string
  storage?: string
  shelfLife?: string
  packageType?: string
  manufacturer?: string
  websiteUrl?: string

  badge?: string
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])

  const [category, setCategory] = useState("Все")

  const [subcategory, setSubcategory] =
    useState("Все")

  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
      })
  }, [])

  // CATEGORIES
  const categories = useMemo(() => {
    const unique = [
      ...new Set(products.map((p) => p.category)),
    ]

    return ["Все", ...unique]
  }, [products])

  // SUBCATEGORIES
  const subcategories = useMemo(() => {
    const filtered =
      category === "Все"
        ? products
        : products.filter(
            (p) => p.category === category
          )

    return [
      "Все",
      ...new Set(
        filtered
          .map((p) => p.subcategory)
          .filter(Boolean)
      ),
    ]
  }, [products, category])

  // FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        category === "Все"
          ? true
          : p.category === category

      const subcategoryMatch =
        subcategory === "Все"
          ? true
          : p.subcategory === subcategory

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
  }, [
    products,
    category,
    subcategory,
    search,
  ])

  return (
    <main className="min-h-screen bg-[#F5F7FA] flex justify-center">

      <div className="w-full max-w-[420px]">

        {/* STICKY HEADER */}
        <div className="sticky top-0 z-40 bg-[#F5F7FA]">

          {/* TOP BAR */}
          <div
            className="
              bg-white
              px-4
              py-3
              border-b
              border-[#E2E8F0]
              flex
              items-center
              justify-between
            "
          >

            <Link
              href="/"
              className="
                text-sm
                text-[#0B1F3A]
                font-medium
              "
            >
              ← Главная
            </Link>

            <div className="text-sm font-semibold text-[#0B1F3A]">
              Каталог
            </div>

            <div className="w-[70px]" />

          </div>

          {/* CATEGORY TABS */}
          <div
            className="
              flex
              gap-2
              overflow-x-auto
              px-3
              py-3
              bg-white
              border-b
              border-[#E2E8F0]
            "
          >

            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c)
                  setSubcategory("Все")
                }}
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  whitespace-nowrap
                  transition-all
                  border

                  ${
                    category === c
                      ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                      : "bg-white text-[#0B1F3A] border-[#E2E8F0]"
                  }
                `}
              >
                {c}
              </button>
            ))}

          </div>

          {/* SEARCH */}
          <div className="bg-white px-3 py-3 border-b border-[#E2E8F0]">

            <input
              type="text"
              placeholder="Поиск товара или бренда"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-11
                rounded-2xl
                bg-[#F5F7FA]
                px-4
                text-sm
                outline-none
                border
                border-transparent
                focus:border-[#0B1F3A]
              "
            />

          </div>

          {/* SUBCATEGORY */}
          <div
            className="
              flex
              gap-2
              overflow-x-auto
              px-3
              py-3
              bg-white
              border-b
              border-[#E2E8F0]
            "
          >

            {subcategories.map((s) => (
              <button
                key={s}
                onClick={() =>
                  setSubcategory(s || "Все")
                }
                className={`
                  px-3
                  py-2
                  rounded-full
                  text-xs
                  whitespace-nowrap
                  transition-all

                  ${
                    subcategory === s
                      ? "bg-[#2C5D7A] text-white"
                      : "bg-[#F5F7FA] text-[#0B1F3A]"
                  }
                `}
              >
                {s}
              </button>
            ))}

          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-3 p-3 pb-28">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              brand={product.brand}
              weight={product.weight}
              country={product.country}
              image={product.image}

              description={product.description}
              composition={product.composition}
              storage={product.storage}
              shelfLife={product.shelfLife}
              packageType={product.packageType}
              manufacturer={product.manufacturer}
              websiteUrl={product.websiteUrl}

              badge={product.badge}
            />
          ))}

        </div>

        <CartBar />

      </div>

    </main>
  )
}