"use client"

import Image from "next/image"
import { useCartStore } from "@/store/cartStore"
import { getCountryFlag } from "@/lib/countryFlag"

type Props = {
  id: string
  title: string
  brand: string
  weight?: string
  country?: string
  image?: string
}

export default function ProductCard({
  id,
  title,
  brand,
  weight,
  country,
  image,
}: Props) {
  const {
    items,
    addItem,
    increaseQty,
    decreaseQty,
  } = useCartStore()

  const cartItem = items.find((i) => i.id === id)

  const flag = getCountryFlag(country)

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">

      {/* IMAGE */}
      <div className="bg-[#F5F7FA]">
        {image ? (
          <Image
            src={`/products/${image}`}
            alt={title}
            width={500}
            height={400}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="h-40 flex items-center justify-center text-xs text-gray-400">
            Нет фото
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3">

        <div className="min-h-[42px]">
          <div className="text-sm font-semibold text-[#1A1A1A] line-clamp-2">
            {title}
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-1">
          {brand}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <div>{weight}</div>

          <div className="flex items-center gap-1">
            {flag && <span>{flag}</span>}
          </div>
        </div>

        {/* ACTION */}
        <div className="mt-3">

          {!cartItem ? (
            <button
              onClick={() =>
                addItem({
                  id,
                  title,
                  qty: 1,
                })
              }
              className="w-full bg-[#0B1F3A] text-white py-2.5 rounded-xl text-sm font-medium"
            >
              В заявку
            </button>
          ) : (
            <div className="h-[42px] rounded-xl border border-[#E2E8F0] flex items-center justify-between px-2">

              <button
                onClick={() => decreaseQty(id)}
                className="w-8 h-8 rounded-lg bg-[#F5F7FA] text-[#0B1F3A] text-lg"
              >
                −
              </button>

              <div className="text-sm font-semibold text-[#0B1F3A]">
                {cartItem.qty}
              </div>

              <button
                onClick={() => increaseQty(id)}
                className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-white text-lg"
              >
                +
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  )
}