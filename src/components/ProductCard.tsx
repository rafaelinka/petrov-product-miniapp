"use client"

import { useCartStore } from "@/store/cartStore"

type Props = {
  id: string
  title: string
  brand: string
  weight?: string
  country?: string
}

export default function ProductCard({
  id,
  title,
  brand,
  weight,
  country,
}: Props) {
  const { items, add, inc, dec } = useCartStore()

  const item = items.find((i) => i.id === id)

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-3">

      {/* IMAGE */}
      <div className="h-20 bg-gray-100 rounded-lg mb-2" />

      {/* TITLE */}
      <div className="text-sm font-medium text-[#1A1A1A]">
        {title}
      </div>

      {/* META */}
      <div className="text-[11px] text-gray-500 mt-1">
        {brand} · {weight}
      </div>

      <div className="text-[11px] text-gray-400">
        {country}
      </div>

      {/* ACTION */}
      {!item ? (
        <button
          onClick={() => add({ id, title })}
          className="mt-2 w-full bg-[#0B1F3A] text-white text-xs py-1.5 rounded-lg"
        >
          Добавить
        </button>
      ) : (
        <div className="mt-2 flex items-center justify-between border border-[#E2E8F0] rounded-lg px-2 py-1">

          <button
            onClick={() => dec(id)}
            className="text-[#0B1F3A] text-lg px-2"
          >
            −
          </button>

          <div className="text-sm font-medium">
            {item.qty}
          </div>

          <button
            onClick={() => inc(id)}
            className="text-[#0B1F3A] text-lg px-2"
          >
            +
          </button>

        </div>
      )}

    </div>
  )
}