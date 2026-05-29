"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import ProductCard from "@/components/ProductCard"
import CartBar from "@/components/CartBar"

import { useFavoritesStore } from "@/store/favoritesStore"

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

  relatedProducts?: string[]
  similarProducts?: string[]
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  const [category, setCategory] =
    useState("Все")

  const [subcategory, setSubcategory] =
    useState("Все")

  const [search, setSearch] = useState("")

  const [sort, setSort] =
    useState("POPULAR")

  const [sortOpen, setSortOpen] =
    useState(false)

  const [favoritesOnly, setFavoritesOnly] =
    useState(false)

  const { favorites } =
    useFavoritesStore()

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    )

    const searchFromUrl = params.get("search")

    if (searchFromUrl) {
      setSearch(searchFromUrl)
    }
  }, [])

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const sortLabel = useMemo(() => {
    if (sort === "POPULAR")
      return "Популярные"

    if (sort === "NEW")
      return "Сначала новинки"

    if (sort === "PROMO")
      return "Сначала акции"

    if (sort === "AZ")
      return "По алфавиту"

    return "Сортировка"
  }, [sort])

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ]

    return ["Все", ...unique]
  }, [products])

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

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const categoryMatch =
        category === "Все"
          ? true
          : p.category === category

      const subcategoryMatch =
        subcategory === "Все"
          ? true
          : p.subcategory === subcategory

      const searchMatch =
        (p.title || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (p.brand || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (p.manufacturer || "")
          .toLowerCase()
          .includes(search.toLowerCase())

      const favoriteMatch =
        favoritesOnly
          ? favorites.includes(p.id)
          : true

      return (
        categoryMatch &&
        subcategoryMatch &&
        searchMatch &&
        favoriteMatch
      )
    })

    if (sort === "NEW") {
      filtered = filtered.sort((a, b) => {
        if (a.badge === "NEW") return -1
        if (b.badge === "NEW") return 1
        return 0
      })
    }

    if (sort === "PROMO") {
      filtered = filtered.sort((a, b) => {
        if (a.badge === "PROMO")
          return -1

        if (b.badge === "PROMO")
          return 1

        return 0
      })
    }

    if (sort === "AZ") {
      filtered = filtered.sort((a, b) =>
        (a.title || "").localeCompare(
          b.title || ""
        )
      )
    }

    return filtered
  }, [
    products,
    category,
    subcategory,
    search,
    sort,
    favoritesOnly,
    favorites,
  ])

  return (
    <main className="min-h-screen bg-[#F5F7FA] flex justify-center">

      <div className="w-full max-w-[420px]">

        <div className="sticky top-0 z-40 bg-[#F5F7FA]">

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

          <div className="bg-white px-3 py-3 border-b border-[#E2E8F0]">

            <input
              type="text"
              placeholder="Поиск товара, бренда или производителя"
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

          <div className="bg-white border-b border-[#E2E8F0] px-3 py-3 relative">

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  setSortOpen(!sortOpen)
                }
                className="
                  h-10
                  px-4
                  rounded-2xl
                  bg-[#F5F7FA]
                  text-[#0B1F3A]
                  text-sm
                  font-medium
                  flex
                  items-center
                  gap-2
                "
              >
                ⇅ {sortLabel}

                <span className="text-xs">
                  ▼
                </span>
              </button>

              <button
                onClick={() =>
                  setFavoritesOnly(
                    !favoritesOnly
                  )
                }
                className={`
                  h-10
                  px-4
                  rounded-2xl
                  text-sm
                  font-medium
                  transition-all

                  ${
                    favoritesOnly
                      ? "bg-[#D64545] text-white"
                      : "bg-[#F5F7FA] text-[#0B1F3A]"
                  }
                `}
              >
                {favoritesOnly
                  ? "♥ Избранное"
                  : "♡ Избранное"}
              </button>

            </div>

            {sortOpen && (
              <div
                className="
                  absolute
                  top-[62px]
                  left-3
                  right-3
                  bg-white
                  border
                  border-[#E2E8F0]
                  rounded-2xl
                  shadow-lg
                  overflow-hidden
                  z-50
                "
              >

                <button
                  onClick={() => {
                    setSort("POPULAR")
                    setSortOpen(false)
                  }}
                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    hover:bg-[#F5F7FA]
                    border-b
                    border-[#F1F5F9]
                  "
                >
                  ✓ Популярные
                </button>

                <button
                  onClick={() => {
                    setSort("NEW")
                    setSortOpen(false)
                  }}
                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    hover:bg-[#F5F7FA]
                    border-b
                    border-[#F1F5F9]
                  "
                >
                  🆕 Сначала новинки
                </button>

                <button
                  onClick={() => {
                    setSort("PROMO")
                    setSortOpen(false)
                  }}
                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    hover:bg-[#F5F7FA]
                    border-b
                    border-[#F1F5F9]
                  "
                >
                  🔥 Сначала акции
                </button>

                <button
                  onClick={() => {
                    setSort("AZ")
                    setSortOpen(false)
                  }}
                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    hover:bg-[#F5F7FA]
                  "
                >
                  🔤 По алфавиту
                </button>

              </div>
            )}

          </div>

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

        {loading && (
          <div className="grid grid-cols-2 gap-3 p-3 pb-28">

            {Array.from({ length: 6 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    border
                    border-[#E2E8F0]
                    animate-pulse
                  "
                >

                  <div className="h-40 bg-[#E2E8F0]" />

                  <div className="p-3">

                    <div className="h-4 bg-[#E2E8F0] rounded w-full" />

                    <div className="h-4 bg-[#E2E8F0] rounded w-2/3 mt-2" />

                    <div className="h-10 bg-[#E2E8F0] rounded-xl mt-4" />

                  </div>

                </div>
              )
            )}

          </div>
        )}

        {!loading &&
          filteredProducts.length === 0 && (
            <div className="px-6 py-16 text-center">

              <div className="text-5xl">
                😕
              </div>

              <div className="mt-4 text-[#0B1F3A] font-semibold">
                Ничего не найдено
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Попробуйте изменить запрос
              </div>

            </div>
          )}

        {!loading && (
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

                relatedProducts={product.relatedProducts}
                similarProducts={product.similarProducts}

                allProducts={products}
              />
            ))}

          </div>
        )}

        <CartBar />

      </div>

    </main>
  )
}