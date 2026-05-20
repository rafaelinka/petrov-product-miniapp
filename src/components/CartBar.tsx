"use client"

import { useMemo, useState } from "react"

import { useCartStore } from "@/store/cartStore"

export default function CartBar() {
  const {
    items,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useCartStore()

  const [open, setOpen] = useState(false)

  const [comment, setComment] = useState("")

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.qty
    }, 0)
  }, [items])

  if (items.length === 0) return null

  async function handleSubmit() {
    const payload = {
      createdAt: new Date().toISOString(),

      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        qty: item.qty,
      })),

      totalItems: total,

      comment,
    }

    console.log("ORDER PAYLOAD")
    console.log(payload)

    alert("Заявка подготовлена")

    /*
      СЛЕДУЮЩИЙ ЭТАП:
      fetch("/api/order")
      → MAX webhook
    */
  }

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
              Заявка
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
            Открыть
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
              max-h-[90vh]
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
                  "
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div className="text-sm font-medium text-[#1A1A1A]">
                        {item.title}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        Количество: {item.qty}
                      </div>

                    </div>

                    {/* QTY */}
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="
                          w-8
                          h-8
                          rounded-lg
                          bg-[#F5F7FA]
                          text-[#0B1F3A]
                          text-lg
                        "
                      >
                        −
                      </button>

                      <div className="text-sm font-semibold min-w-[16px] text-center">
                        {item.qty}
                      </div>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        className="
                          w-8
                          h-8
                          rounded-lg
                          bg-[#0B1F3A]
                          text-white
                          text-lg
                        "
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* COMMENT */}
            <div className="mt-5">

              <div className="text-sm font-medium text-[#0B1F3A] mb-2">
                Комментарий
              </div>

              <textarea
                placeholder="Например: нужна доставка в четверг"
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                className="
                  w-full
                  min-h-[100px]
                  rounded-2xl
                  border
                  border-[#E2E8F0]
                  p-3
                  text-sm
                  outline-none
                  resize-none
                  focus:border-[#0B1F3A]
                "
              />

            </div>

            {/* SUMMARY */}
            <div
              className="
                mt-5
                bg-[#F5F7FA]
                rounded-2xl
                p-4
              "
            >

              <div className="flex justify-between text-sm">

                <div className="text-gray-500">
                  Всего товаров
                </div>

                <div className="font-semibold text-[#0B1F3A]">
                  {total}
                </div>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="mt-5 space-y-2">

              <button
                onClick={handleSubmit}
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