"use client"

import { useEffect, useState } from "react"

export default function PromoDayCard() {
  const [timeLeft, setTimeLeft] =
    useState("")

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()

      const end = new Date()

      end.setHours(20)
      end.setMinutes(0)
      end.setSeconds(0)

      const diff =
        end.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Акция завершена")
        return
      }

      const hours = Math.floor(
        diff / (1000 * 60 * 60)
      )

      const minutes = Math.floor(
        (diff %
          (1000 * 60 * 60)) /
          (1000 * 60)
      )

      const seconds = Math.floor(
        (diff % (1000 * 60)) / 1000
      )

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`
      )
    }

    updateTimer()

    const interval = setInterval(
      updateTimer,
      1000
    )

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
        from-[#D64545]
        to-[#FF7A45]
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
        ⚡ Промо дня
      </div>

      {/* TITLE */}
      <div className="relative mt-4">

        <h2 className="text-2xl font-bold leading-tight">
          Сервелат
          <br />
          Московский
        </h2>

        <p className="mt-2 text-sm text-white/80">
          Только сегодня специальные
          условия
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
          До конца акции
        </div>

        <div
          className="
            mt-1
            text-2xl
            font-bold
            tracking-widest
          "
        >
          {timeLeft}
        </div>

      </div>

      {/* BUTTON */}
      <button
        className="
          mt-5
          w-full
          bg-white
          text-[#D64545]
          py-3
          rounded-2xl
          text-sm
          font-semibold
          active:scale-[0.98]
          transition-all
        "
      >
        Смотреть товар
      </button>

    </div>
  )
}