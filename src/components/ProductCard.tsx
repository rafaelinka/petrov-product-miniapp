"use client"

import Image from "next/image"
import { useCartStore } from "@/store/cartStore"

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
  const { addItem } = useCartStore()

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">

      {/* IMAGE */}
      <div className="relative h-40 bg-[#F5F7FA]">

        {image ? (
          <Image
            src={`/products/${image}.jpg`}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-gray-400">
            Нет фото
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-3">

        <div className="text-sm font-semibold text-[#1A1A1A] line-clamp-2 min-h-[40px]">
          {title}
        </div>

        <div className="text-xs text-gray-500 mt-1">
          {brand}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">

          <div>{weight}</div>

          <div>{country}</div>

        </div>

        {/* ACTION */}
        <button
          onClick={() =>
            addItem({
              id,
              title,
              qty: 1,
            })
          }
          className="
            mt-3
            w-full
            bg-[#0B1F3A]
            text-white
            py-2
            rounded-xl
            text-sm
            font-medium
            active:scale-[0.99]
            transition
          "
        >
          В заявку
        </button>

      </div>

    </div>
  )
}