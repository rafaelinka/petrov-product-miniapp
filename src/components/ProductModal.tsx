"use client"

import Image from "next/image"
import { getCountryFlag } from "@/lib/countryFlag"

type Props = {
  open: boolean
  onClose: () => void

  id: string
  title: string
  brand: string
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
}

export default function ProductModal({
  open,
  onClose,

  title,
  brand,
  weight,
  country,
  image,

  description,
  composition,
  storage,
  shelfLife,
  packageType,
  manufacturer,
  websiteUrl,

  badge,

  relatedProducts,
}: Props) {
  if (!open) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        bg-black/40
        flex
        items-end
        justify-center
      "
    >

      <div
        className="
          w-full
          max-w-[420px]
          bg-white
          rounded-t-3xl
          overflow-hidden
          max-h-[92vh]
          overflow-y-auto
        "
      >

        {/* IMAGE */}
        <div className="relative">

          {/* BADGE */}
          {badge && (
            <div className="absolute top-4 left-4 z-10">

              <div
                className={`
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  font-semibold
                  text-white
                  shadow

                  ${
                    badge === "PROMO"
                      ? "bg-[#D64545]"
                      : badge === "HIT"
                      ? "bg-[#F59E0B]"
                      : "bg-[#2C5D7A]"
                  }
                `}
              >
                {badge === "PROMO" && "🔥 Акция"}
                {badge === "HIT" && "⭐ Хит продаж"}
                {badge === "NEW" && "🆕 Новинка"}
              </div>

            </div>
          )}

          {image ? (
            <Image
              src={`/products/${image}`}
              alt={title}
              width={800}
              height={600}
              className="
                w-full
                h-[280px]
                object-cover
              "
            />
          ) : (
            <div className="h-[280px] bg-[#F5F7FA]" />
          )}

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              absolute
              top-4
              right-4
              w-10
              h-10
              rounded-full
              bg-white/90
              backdrop-blur
              text-[#0B1F3A]
              text-lg
              shadow
            "
          >
            ✕
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-4">

          {/* TITLE */}
          <div>

            <h2 className="text-xl font-semibold text-[#0B1F3A]">
              {title}
            </h2>

            <div className="text-sm text-gray-500 mt-1">
              {brand}
            </div>

          </div>

          {/* INFO */}
          <div className="mt-4 flex flex-wrap gap-2">

            {country && (
              <div
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-[#F5F7FA]
                  text-xs
                  text-[#0B1F3A]
                "
              >
                {getCountryFlag(country)} {country}
              </div>
            )}

            {weight && (
              <div
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-[#F5F7FA]
                  text-xs
                  text-[#0B1F3A]
                "
              >
                {weight}
              </div>
            )}

            {shelfLife && (
              <div
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-[#F5F7FA]
                  text-xs
                  text-[#0B1F3A]
                "
              >
                Срок: {shelfLife}
              </div>
            )}

          </div>

          {/* DESCRIPTION */}
          {description && (
            <div className="mt-5">

              <div className="text-sm font-semibold text-[#0B1F3A]">
                Описание
              </div>

              <div className="text-sm text-gray-600 mt-2 leading-relaxed">
                {description}
              </div>

            </div>
          )}

          {/* COMPOSITION */}
          {composition && (
            <div className="mt-5">

              <div className="text-sm font-semibold text-[#0B1F3A]">
                Состав
              </div>

              <div className="text-sm text-gray-600 mt-2 leading-relaxed">
                {composition}
              </div>

            </div>
          )}

          {/* EXTRA INFO */}
          {(storage || packageType || manufacturer) && (
            <div className="mt-5 space-y-2">

              {storage && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-[#0B1F3A]">
                    Хранение:
                  </span>{" "}
                  {storage}
                </div>
              )}

              {packageType && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-[#0B1F3A]">
                    Упаковка:
                  </span>{" "}
                  {packageType}
                </div>
              )}

              {manufacturer && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-[#0B1F3A]">
                    Производитель:
                  </span>{" "}
                  {manufacturer}
                </div>
              )}

            </div>
          )}

          {/* WEBSITE */}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="
                mt-5
                h-12
                rounded-2xl
                border
                border-[#E2E8F0]
                flex
                items-center
                justify-center
                text-sm
                font-medium
                text-[#0B1F3A]
              "
            >
              Подробнее на сайте
            </a>
          )}

          {/* RELATED PRODUCTS READY */}
          {relatedProducts &&
            relatedProducts.length > 0 && (
              <div className="mt-6">
                <div className="text-sm font-semibold text-[#0B1F3A]">
                  Часто покупают вместе
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Найдено связанных товаров:{" "}
                  {relatedProducts.length}
                </div>
              </div>
            )}

        </div>

      </div>

    </div>
  )
}