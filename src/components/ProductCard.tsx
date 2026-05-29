"use client"

import { useState } from "react"
import Image from "next/image"

import { useCartStore } from "@/store/cartStore"
import { getCountryFlag } from "@/lib/countryFlag"

import ProductModal from "@/components/ProductModal"

import { useFavoritesStore } from "@/store/favoritesStore"

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

export default function ProductCard({
  id,
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
    decreaseQty,
  } = useCartStore()

  const {
    toggleFavorite,
    isFavorite,
  } = useFavoritesStore()

  const favorite = isFavorite(id)

  const [open, setOpen] = useState(false)

  const cartItem = items.find((i) => i.id === id)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="
          bg-white
          rounded-2xl
          overflow-hidden
          border
          border-[#E2E8F0]
          shadow-sm
          cursor-pointer
        "
      >

        {/* IMAGE */}
        <div className="bg-[#F5F7FA] relative">

          {/* FAVORITE */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(id)
            }}
            className="
              absolute
              top-2
              right-2
              z-10
              w-9
              h-9
              rounded-full
              bg-white/90
              backdrop-blur
              shadow-sm
              flex
              items-center
              justify-center
              text-lg
            "
          >
            {favorite ? "♥" : "♡"}
          </button>

          {/* BADGES */}
          {badge === "PROMO" && (
            <div
              className="
                absolute
                top-2
                left-2
                z-10
                bg-[#D64545]
                text-white
                text-[10px]
                font-semibold
                px-2
                py-1
                rounded-full
              "
            >
              АКЦИЯ
            </div>
          )}

          {badge === "NEW" && (
            <div
              className="
                absolute
                top-2
                left-2
                z-10
                bg-[#2C5D7A]
                text-white
                text-[10px]
                font-semibold
                px-2
                py-1
                rounded-full
              "
            >
              NEW
            </div>
          )}

          {image ? (
            <Image
              src={`/products/${image}`}
              alt={title}
              width={500}
              height={400}
              className="
                w-full
                h-40
                object-cover
              "
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

            <div>
              {weight}
            </div>

            <div className="flex items-center gap-1">

              {country && (
                <>
                  <span>
                    {getCountryFlag(country)}
                  </span>

                  <span>
                    {country}
                  </span>
                </>
              )}

            </div>

          </div>

          {/* ACTION */}
          <div
            className="mt-3"
            onClick={(e) => e.stopPropagation()}
          >

            {!cartItem ? (
              <button
                onClick={() =>
                  addItem({
                    id,
                    title,
                    qty: 1,
                  })
                }
                className="
                  w-full
                  bg-[#0B1F3A]
                  text-white
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                "
              >
                В заявку
              </button>
            ) : (
              <div
                className="
                  h-[42px]
                  rounded-xl
                  border
                  border-[#E2E8F0]
                  flex
                  items-center
                  justify-between
                  px-2
                "
              >

                <button
                  onClick={() => decreaseQty(id)}
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-[#F5F7FA]
                    text-[#0B1F3A]
                    text-lg
                    font-medium
                  "
                >
                  −
                </button>

                <div className="text-sm font-semibold text-[#0B1F3A]">
                  {cartItem.qty}
                </div>

                <button
                  onClick={() => increaseQty(id)}
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-[#0B1F3A]
                    text-white
                    text-lg
                    font-medium
                  "
                >
                  +
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}

        id={id}
        title={title}
        brand={brand}
        weight={weight}
        country={country}
        image={image}

        description={description}
        composition={composition}
        storage={storage}
        shelfLife={shelfLife}
        packageType={packageType}
        manufacturer={manufacturer}
        websiteUrl={websiteUrl}

        badge={badge}

        relatedProducts={relatedProducts}
        allProducts={allProducts}
      />
    </>
  )
}