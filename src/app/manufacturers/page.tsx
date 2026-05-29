"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import AppShell from "@/components/AppShell"

type Product = {
  id: string
  title: string
  brand?: string
  manufacturer?: string
  category?: string
  image?: string
}

export default function ManufacturersPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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

  const manufacturers = useMemo(() => {
    const map = new Map<string, number>()

    products.forEach((product) => {
      const name =
        product.manufacturer ||
        product.brand ||
        ""

      if (!name) return

      map.set(name, (map.get(name) || 0) + 1)
    })

    return Array.from(map.entries())
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) =>
        a.name.localeCompare(b.name)
      )
  }, [products])

  return (
    <AppShell>
      <div className="p-4">

        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="text-sm text-[#0B1F3A] font-medium"
          >
            ← Главная
          </Link>

          <div className="text-sm font-semibold text-[#0B1F3A]">
            Производители
          </div>

          <div className="w-[70px]" />

        </div>

        <div className="mt-5">

          <h1 className="text-2xl font-semibold text-[#0B1F3A]">
            Производители
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Быстрый переход к продукции брендов и заводов
          </p>

        </div>

        {loading && (
          <div className="mt-6 space-y-3">

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-20
                  bg-white
                  border
                  border-[#E2E8F0]
                  rounded-2xl
                  animate-pulse
                "
              />
            ))}

          </div>
        )}

        {!loading && manufacturers.length === 0 && (
          <div className="mt-16 text-center">

            <div className="text-5xl">
              🏭
            </div>

            <div className="mt-4 text-[#0B1F3A] font-semibold">
              Производители не найдены
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Проверьте поля manufacturer или brand в таблице
            </div>

          </div>
        )}

        {!loading && manufacturers.length > 0 && (
          <div className="mt-6 space-y-3">

            {manufacturers.map((manufacturer) => (
              <Link
                key={manufacturer.name}
                href={`/catalog?search=${encodeURIComponent(
                  manufacturer.name
                )}`}
              >

                <div
                  className="
                    bg-white
                    border
                    border-[#E2E8F0]
                    rounded-2xl
                    p-4
                    shadow-sm
                    active:scale-[0.99]
                    transition
                  "
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-11
                          h-11
                          rounded-2xl
                          bg-[#F5F7FA]
                          flex
                          items-center
                          justify-center
                          text-xl
                        "
                      >
                        🏭
                      </div>

                      <div>

                        <div className="text-sm font-semibold text-[#0B1F3A]">
                          {manufacturer.name}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                          Товаров: {manufacturer.count}
                        </div>

                      </div>

                    </div>

                    <div className="text-gray-400">
                      →
                    </div>

                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>
    </AppShell>
  )
}