"use client"

import { useEffect, useState } from "react"

export default function PromoBanner() {
  const endDate = new Date("2026-05-31T23:59:59")

  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()

      const distance =
        endDate.getTime() - now

      if (distance <= 0) {
        setTimeLeft("Акция завершена")
        return
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      )

      const hours = Math.floor(
        (distance %
          (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      )

      const minutes = Math.floor(
        (distance %
          (1000 * 60 * 60)) /
          (1000 * 60)
      )

      setTimeLeft(
        `${days}д ${hours}ч ${minutes}м`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="px-3 pt-3">

      <div
        className="
          rounded-3xl
          overflow-hidden
          bg-gradient-to-br
          from-[#0B1F3A]
          to-[#163B6D]
          text-white
          p-5
          relative
          shadow-lg
        "
      >

        {/* BACKGROUND GLOW */}
        <div
          className="
            absolute
            -right-10
            -top-10
            w-40
            h-40
            bg-white/10
            rounded-full
            blur-3xl
          "
        />

        {/* BADGE */}
        <div
          className="
            relative
            inline-flex
            items-center
            rounded-full
            bg-white/20
            px-3
            py-1
            text-xs
            font-medium
            backdrop-blur
          "
        >
          🔥 Промо месяца
        </div>

        {/* TITLE */}
        <div className="relative mt-4">

          <h2 className="text-2xl font-bold leading-tight">
            Спецусловия
            <br />
            на сыры и колбасы
          </h2>

          <p className="mt-2 text-sm text-white/80 leading-relaxed">
            Ограниченное предложение
            для партнеров компании
          </p>

        </div>

        {/* TIMER */}
        <div
          className="
            relative
            mt-5
            inline-flex
            items-center
            rounded-2xl
            bg-black/20
            px-4
            py-3
            backdrop-blur
          "
        >

          <div>

            <div className="text-xs text-white/70">
              До конца акции
            </div>

            <div className="text-lg font-bold tracking-wide mt-1">
              {timeLeft}
            </div>

          </div>

        </div>

        {/* BUTTON */}
        <button
          className="
            relative
            mt-5
            w-full
            bg-white
            text-[#0B1F3A]
            py-3
            rounded-2xl
            text-sm
            font-semibold
            transition-all
            active:scale-[0.98]
          "
        >
          Смотреть товары
        </button>

      </div>

    </div>
  )
}