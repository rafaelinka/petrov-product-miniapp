"use client"

import { useEffect, useState } from "react"

export default function PromoMonthCard() {
  const endDate = new Date(
    "2026-05-31T23:59:59"
  )

  const [timeLeft, setTimeLeft] =
    useState("")

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
        distance /
          (1000 * 60 * 60 * 24)
      )

      const hours = Math.floor(
        (distance %
          (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      )

      setTimeLeft(
        `${days}д ${hours}ч`
      )
    }, 1000)

    return () =>
      clearInterval(interval)
  }, [])

  return (
    <div
      className="
        rounded-3xl
        p-5
        text-white
        bg-gradient-to-br
        from-[#0B1F3A]
        to-[#163B6D]
        relative
        overflow-hidden
        shadow-lg
      "
    >

      {/* GLOW */}
      <div
        className="
          absolute
          -top-10
          -right-10
          w-40
          h-40
          rounded-full
          bg-white/10
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
          на сыры
        </h2>

        <p className="mt-2 text-sm text-white/80">
          Выгодные предложения
          для партнеров
        </p>

      </div>

      {/* TIMER */}
      <div
        className="
          mt-5
          rounded-2xl
          bg-black/20
          px-4
          py-3
          inline-block
          backdrop-blur
        "
      >

        <div className="text-xs text-white/70">
          До конца месяца
        </div>

        <div className="mt-1 text-xl font-bold">
          {timeLeft}
        </div>

      </div>

      {/* BUTTON */}
      <button
        className="
          mt-5
          w-full
          bg-white
          text-[#0B1F3A]
          py-3
          rounded-2xl
          text-sm
          font-semibold
          active:scale-[0.98]
          transition-all
        "
      >
        Смотреть акции
      </button>

    </div>
  )
}