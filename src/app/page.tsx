import AppShell from "@/components/AppShell"
import Link from "next/link"

export default function Page() {
  return (
    <AppShell>
      <div className="p-4">

        <h1 className="text-[#0B1F3A] text-2xl font-semibold">
          Петров Продукт
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          B2B закупочный интерфейс
        </p>

        <div className="mt-6 space-y-3">

          {/* КАТАЛОГ */}
          <Link href="/catalog">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 active:scale-[0.99] transition cursor-pointer">
              <div className="text-[#0B1F3A] font-medium text-sm">
                Каталог
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Сыры, молочка, колбасы
              </div>
            </div>
          </Link>

          {/* КОНТАКТЫ */}
          <Link href="/contacts">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 active:scale-[0.99] transition cursor-pointer">
              <div className="text-[#0B1F3A] font-medium text-sm">
                Контакты
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Логистика и менеджеры
              </div>
            </div>
          </Link>

        </div>

      </div>
    </AppShell>
  )
}