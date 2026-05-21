import AppShell from "@/components/AppShell"
import Link from "next/link"

import PromoDayCard from "@/components/PromoDayCard"
import PromoMonthCard from "@/components/PromoMonthCard"

export default function Page() {
  return (
    <AppShell>

      <div className="p-4">

        {/* HEADER */}
        <div>

          <h1 className="text-[#0B1F3A] text-2xl font-semibold">
            Петров Продукт
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            B2B закупочный интерфейс
          </p>

        </div>

        {/* PROMO BLOCKS */}
        <div className="mt-5 space-y-4">

          <PromoDayCard />

          <PromoMonthCard />

        </div>

        {/* MENU */}
        <div className="mt-6 space-y-3">

          {/* КАТАЛОГ */}
          <Link href="/catalog">

            <div
              className="
                bg-white
                border
                border-[#E2E8F0]
                rounded-2xl
                p-4
                active:scale-[0.99]
                transition
                cursor-pointer
                shadow-sm
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <div className="text-[#0B1F3A] font-medium text-sm">
                    Каталог
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Сыры, молочка, колбасы
                  </div>

                </div>

                <div className="text-xl">
                  📦
                </div>

              </div>

            </div>

          </Link>

          {/* КОНТАКТЫ */}
          <Link href="/contacts">

            <div
              className="
                bg-white
                border
                border-[#E2E8F0]
                rounded-2xl
                p-4
                active:scale-[0.99]
                transition
                cursor-pointer
                shadow-sm
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <div className="text-[#0B1F3A] font-medium text-sm">
                    Контакты
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Логистика и менеджеры
                  </div>

                </div>

                <div className="text-xl">
                  ☎️
                </div>

              </div>

            </div>

          </Link>

          {/* АКЦИИ */}
          <Link href="/promo">

            <div
              className="
                bg-white
                border
                border-[#E2E8F0]
                rounded-2xl
                p-4
                active:scale-[0.99]
                transition
                cursor-pointer
                shadow-sm
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <div className="text-[#0B1F3A] font-medium text-sm">
                    Акции
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Спецпредложения и промо
                  </div>

                </div>

                <div className="text-xl">
                  🔥
                </div>

              </div>

            </div>

          </Link>

        </div>

      </div>

    </AppShell>
  )
}