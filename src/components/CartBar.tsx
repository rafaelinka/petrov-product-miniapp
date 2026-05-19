"use client"

import { useState } from "react"
import { useCartStore } from "@/store/cartStore"

export default function CartBar() {
  const { items, clearCart } = useCartStore()

  const [open, setOpen] = useState(false)

  const total = items.reduce((acc, item) => {
    return acc + item.qty
  }, 0)

  if (items.length === 0) return null

  return (
    <>
      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-3 z-50">

        <div
          className="
            w-full
            max-w-[420px]
            bg-[#0B1F3A]
            text-white
            rounded-2xl
            px-4
            py-3
            shadow-xl
            flex
            items-center
            justify-between
          "
        >

          <div>
            <div className="text-sm font-medium">
              Товаров в заявке
            </div>

            <div className="text-xs text-gray-300">
              {total} шт.
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="
              bg-white
              text-[#0B1F3A]
              px-4
              py-2
              rounded-xl
              text-sm
              font-semibold
            "
          >
            Корзина
          </button>

        </div>

      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-end justify-center">

          <div
            className="
              w-full
              max-w-[420px]
              bg-white
              rounded-t-3xl
              p-4
              max-h-[85vh]
              overflow-y-auto
            "
          >

            {/* HEADER */}
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-[#0B1F3A]">
                  Заявка
                </h2>

                <p className="text-xs text-gray-500">
                  Проверьте список товаров
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#F5F7FA]
                  text-sm
                "
              >
                ✕
              </button>

            </div>

            {/* ITEMS */}
            <div className="mt-4 space-y-3">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="
                    border
                    border-[#E2E8F0]
                    rounded-2xl
                    p-3
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>
                    <div className="text-sm font-medium text-[#1A1A1A]">
                      {item.title}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      Количество: {item.qty}
                    </div>
                  </div>

                </div>
              ))}

            </div>

            {/* ACTIONS */}
            <div className="mt-5 space-y-2">

              <button
                className="
                  w-full
                  bg-[#D64545]
                  text-white
                  py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                "
              >
                Отправить заявку
              </button>

              <button
                onClick={() => clearCart()}
                className="
                  w-full
                  border
                  border-[#E2E8F0]
                  py-3
                  rounded-2xl
                  text-sm
                "
              >
                Очистить
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  )
}