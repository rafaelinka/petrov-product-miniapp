"use client"

import Image from "next/image"

import { getCountryFlag } from "@/lib/countryFlag"
import { useCartStore } from "@/store/cartStore"

type RelatedProduct = {
  id: string
  title: string
  brand: string
  weight?: string
  country?: string
  image?: string
  badge?: string
}

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
  allProducts?: RelatedProduct[]
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
  allProducts,
}: Props) {
  const {
    items,
    addItem,
    increaseQty,
  } = useCartStore()

  if (!open) return null

  const relatedItems =
    relatedProducts && allProducts
      ? relatedProducts
          .map((relatedId) =>
            allProducts.find(
              (product) =>
                String(product.id) ===
                String(relatedId)
            )
          )
          .filter(
            (
              product
            ): product is RelatedProduct =>
              Boolean(product)
          )
      : []

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

          {/* RELATED PRODUCTS */}
          {relatedItems.length > 0 && (
            <div className="mt-6">

              <div className="text-sm font-semibold text-[#0B1F3A]">
                Часто покупают вместе
              </div>

              <div
                className="
                  mt-3
                  flex
                  gap-3
                  overflow-x-auto
                  pb-2
                "
              >

                {relatedItems.map((product) => {
                  const cartItem = items.find(
                    (item) =>
                      item.id === product.id
                  )

                  return (
                    <div
                      key={product.id}
                      className="
                        min-w-[140px]
                        max-w-[140px]
                        rounded-2xl
                        border
                        border-[#E2E8F0]
                        bg-white
                        overflow-hidden
                      "
                    >

                      <div className="relative bg-[#F5F7FA]">

                        {product.badge && (
                          <div
                            className="
                              absolute
                              top-2
                              left-2
                              z-10
                              bg-[#D64545]
                              text-white
                              text-[9px]
                              font-semibold
                              px-2
                              py-1
                              rounded-full
                            "
                          >
                            {product.badge === "PROMO"
                              ? "АКЦИЯ"
                              : product.badge === "NEW"
                              ? "NEW"
                              : "ХИТ"}
                          </div>
                        )}

                        {product.image ? (
                          <Image
                            src={`/products/${product.image}`}
                            alt={product.title}
                            width={300}
                            height={220}
                            className="
                              w-full
                              h-24
                              object-cover
                            "
                          />
                        ) : (
                          <div className="h-24 flex items-center justify-center text-[11px] text-gray-400">
                            Нет фото
                          </div>
                        )}

                      </div>

                      <div className="p-2">

                        <div className="text-xs font-semibold text-[#1A1A1A] line-clamp-2 min-h-[32px]">
                          {product.title}
                        </div>

                        <div className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                          {product.brand}
                        </div>

                        {product.weight && (
                          <div className="text-[11px] text-gray-500 mt-1">
                            {product.weight}
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (cartItem) {
                              increaseQty(product.id)
                            } else {
                              addItem({
                                id: product.id,
                                title: product.title,
                                qty: 1,
                              })
                            }
                          }}
                          className="
                            mt-2
                            w-full
                            h-8
                            rounded-xl
                            bg-[#0B1F3A]
                            text-white
                            text-xs
                            font-medium
                          "
                        >
                          {cartItem
                            ? `В заявке: ${cartItem.qty}`
                            : "+ В заявку"}
                        </button>

                      </div>

                    </div>
                  )
                })}

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}