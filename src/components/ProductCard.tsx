"use client"

import Image from "next/image"
import { useState } from "react"
import { useCartStore } from "@/store/cartStore"
import { getCountryFlag, getCountryLabel } from "@/lib/countryFlag"

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

  const [openPreview, setOpenPreview] = useState(false)

  const flag = getCountryFlag(country)
  const countryLabel = getCountryLabel(country)

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

          <div className="text-sm font-semibold text-[#1A1A1A] line-clamp-2">
            {title}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            {brand}
          </div>

          {/* COUNTRY + FLAG */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div>{weight}</div>

            <div className="flex items-center gap-1">
              <span>{flag}</span>
              <span>{countryLabel}</span>
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-3">

            {!cartItem ? (
              <button
                onClick={() =>
                  addItem({ id, title, qty: 1 })
                }
                className="w-full bg-[#0B1F3A] text-white py-2.5 rounded-xl text-sm font-medium"
              >
                В заявку
              </button>
            ) : (
              <div className="h-[42px] rounded-xl border flex items-center justify-between px-2">

                <button
                  onClick={() => decreaseQty(id)}
                  className="w-8 h-8 bg-[#F5F7FA] rounded-lg"
                >
                  −
                </button>

                <div className="font-semibold text-sm">
                  {cartItem.qty}
                </div>

                <button
                  onClick={() => increaseQty(id)}
                  className="w-8 h-8 bg-[#0B1F3A] text-white rounded-lg"
                >
                  +
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* MODAL (ТОЛЬКО ПРОСМОТР) */}
      {openPreview && (
        <div
          className="fixed inset-0 bg-black/60 flex items-end justify-center z-[100]"
          onClick={() => setOpenPreview(false)}
        >
          <div
            className="w-full max-w-[420px] bg-white rounded-t-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <div className="flex justify-between items-center mb-3">
              <div className="font-semibold text-[#0B1F3A]">
                Товар
              </div>

              <button
                onClick={() => setOpenPreview(false)}
                className="w-8 h-8 rounded-full bg-[#F5F7FA]"
              >
                ✕
              </button>
            </div>

            {/* IMAGE */}
            {image && (
              <Image
                src={`/products/${image}`}
                alt={title}
                width={800}
                height={600}
                className="w-full h-60 object-cover rounded-2xl"
              />
            )}

            {/* INFO */}
            <div className="mt-3">
              <div className="text-lg font-semibold">{title}</div>
              <div className="text-sm text-gray-500">{brand}</div>

              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <div>{weight}</div>

                <div className="flex gap-1 items-center">
                  <span>{flag}</span>
                  <span>{countryLabel}</span>
                </div>
              </div>
            </div>

            {/* NO ADD BUTTON HERE */}
            <div className="mt-4 text-xs text-gray-400 text-center">
              Добавление в заявку доступно только из карточки
            </div>

          </div>
        </div>
      )}
    </>
  )
}