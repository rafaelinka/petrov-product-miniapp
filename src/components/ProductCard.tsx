"use client"

import Image from "next/image"
import { useState } from "react"
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
  const { items, addItem, increaseQty, decreaseQty } = useCartStore()

  const cartItem = items.find((i) => i.id === id)

  const flag = getCountryFlag(country)

  const [openPreview, setOpenPreview] = useState(false)

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">

        {/* IMAGE */}
        <div
          className="bg-[#F5F7FA] cursor-pointer"
          onClick={() => setOpenPreview(true)}
        >
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

          {/* TITLE */}
          <div className="min-h-[42px]">
            <div className="text-sm font-semibold text-[#1A1A1A] line-clamp-2">
              {title}
            </div>
          </div>

          {/* BRAND */}
          <div className="text-xs text-gray-500 mt-1">
            {brand}
          </div>

          {/* META */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">

            <div>{weight}</div>

            {/* FLAG */}
            <div className="text-base">{flag}</div>

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
                  className="w-8 h-8 rounded-lg bg-[#F5F7FA] text-[#0B1F3A] text-lg font-medium"
                >
                  −
                </button>

                <div className="text-sm font-semibold text-[#0B1F3A]">
                  {cartItem.qty}
                </div>

                <button
                  onClick={() => increaseQty(id)}
                  className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-white text-lg font-medium"
                >
                  +
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* 🔥 PREVIEW MODAL (заготовка под следующий шаг) */}
      {openPreview && (
        <div
          className="fixed inset-0 bg-black/60 flex items-end justify-center z-[100]"
          onClick={() => setOpenPreview(false)}
        >
          <div
            className="w-full max-w-[420px] bg-white rounded-t-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >

            {/* IMAGE BIG */}
            <div className="rounded-2xl overflow-hidden bg-[#F5F7FA]">
              {image ? (
                <Image
                  src={`/products/${image}`}
                  alt={title}
                  width={800}
                  height={600}
                  className="w-full h-60 object-cover"
                />
              ) : (
                <div className="h-60 flex items-center justify-center text-gray-400">
                  Нет фото
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="mt-4">

              <div className="text-lg font-semibold text-[#0B1F3A]">
                {title}
              </div>

              <div className="text-sm text-gray-500 mt-1">
                {brand}
              </div>

              <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                <div>{weight}</div>
                <div className="text-xl">{flag}</div>
              </div>

            </div>

            {/* ACTION */}
            <div className="mt-5">

              {!cartItem ? (
                <button
                  onClick={() => {
                    addItem({ id, title, qty: 1 })
                    setOpenPreview(false)
                  }}
                  className="w-full bg-[#0B1F3A] text-white py-3 rounded-2xl font-medium"
                >
                  Добавить в заявку
                </button>
              ) : (
                <div className="flex items-center justify-between border rounded-2xl px-3 py-2">

                  <button
                    onClick={() => decreaseQty(id)}
                    className="w-10 h-10 bg-[#F5F7FA] rounded-xl"
                  >
                    −
                  </button>

                  <div className="font-semibold">
                    {cartItem.qty}
                  </div>

                  <button
                    onClick={() => increaseQty(id)}
                    className="w-10 h-10 bg-[#0B1F3A] text-white rounded-xl"
                  >
                    +
                  </button>

                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </>
  )
}