"use client"

import Image from "next/image"

type Props = {
  open: boolean
  onClose: () => void

  product: {
    id: string
    title: string
    brand: string
    weight?: string
    country?: string
    image?: string
    description?: string
  } | null
}

const countryFlag = (country?: string) => {
  switch (country) {
    case "Россия":
      return "🇷🇺"
    case "Беларусь":
      return "🇧🇾"
    case "Аргентина":
      return "🇦🇷"
    default:
      return "🌍"
  }
}

export default function ProductModal({ open, onClose, product }: Props) {
  if (!open || !product) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center">
      <div className="w-full max-w-[420px] bg-white rounded-t-3xl p-4 max-h-[90vh] overflow-y-auto">

        {/* CLOSE */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-semibold text-[#0B1F3A]">
            Детали товара
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F7FA]"
          >
            ✕
          </button>
        </div>

        {/* IMAGE */}
        <div className="bg-[#F5F7FA] rounded-2xl overflow-hidden">
          {product.image ? (
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={500}
              height={400}
              className="w-full h-52 object-cover"
            />
          ) : (
            <div className="h-52 flex items-center justify-center text-gray-400">
              Нет фото
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="mt-4 space-y-2">
          <div className="text-lg font-semibold text-[#1A1A1A]">
            {product.title}
          </div>

          <div className="text-sm text-gray-500">
            {product.brand}
          </div>

          <div className="flex gap-4 text-sm text-gray-600 mt-2">
            <div>{product.weight}</div>

            <div className="flex items-center gap-1">
              <span>{countryFlag(product.country)}</span>
              <span>{product.country}</span>
            </div>
          </div>

          {/* DESCRIPTION (заранее заложили для будущего) */}
          <div className="mt-3 text-sm text-gray-700">
            {product.description || "Описание появится позже"}
          </div>
        </div>

        {/* ACTION */}
        <button
          onClick={onClose}
          className="w-full mt-5 bg-[#0B1F3A] text-white py-3 rounded-2xl"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}