"use client"

import { useMemo, useState } from "react"
import { useCartStore } from "@/store/cartStore"

export default function CartBar() {
  const { items, clear } = useCartStore()

  const [open, setOpen] = useState(false)

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.qty, 0)
  }, [items])

  if (items.length === 0) return null

  return (
    <>
      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-3 z-50">

        <div className="w-full max-w-[430px]">

          <div className="bg-[#0B1F3A] text-white rounded-2xl px-4 py-3 shadow-lg flex items-center justify-between">

            <div>
              <div className="text-sm font-medium">
                Товаров в заявке: {total}
              </div>

              <div className="text-[11px] text-gray-300">
                Нажмите для оформления
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-white text-[#0B1F3A] text-xs px-4 py-2 rounded-xl font-medium"
            >
              Оформить
            </button>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-end justify-center">

          <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-4 max-h-[80vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">

              <div>
                <div className="text-lg font-semibold text-[#0B1F3A]">
                  Заявка
                </div>

                <div className="text-xs text-gray-500">
                  Проверьте список товаров
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 text-sm"
              >
                Закрыть
              </button>

            </div>

            {/* ITEMS */}
            <div className="space-y-3">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#E2E8F0] rounded-xl p-3"
                >
                  <div className="text-sm font-medium text-[#1A1A1A]">
                    {item.title}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Количество: {item.qty}
                  </div>
                </div>
              ))}

            </div>

            {/* ACTIONS */}
            <div className="mt-5 space-y-2">

              <button
                onClick={() => {
                  console.log("SEND TO MAX", items)

                  alert("Заявка подготовлена. Интеграцию с MAX подключим следующим шагом.")
                }}
                className="w-full bg-[#D64545] text-white py-3 rounded-xl text-sm font-medium"
              >
                Отправить заявку
              </button>

              <button
                onClick={() => clear()}
                className="w-full border border-[#E2E8F0] py-3 rounded-xl text-sm"
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