import Link from "next/link"

export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex justify-center">

      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F7FA]">

        {/* TOP BAR */}
        <div className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">

          {/* HOME */}
          <Link href="/">
            <div className="text-[#0B1F3A] text-sm font-semibold cursor-pointer">
              Петров Продукт
            </div>
          </Link>

          {/* BACK BUTTON (если нужно будет расширить позже) */}
          <Link href="/">
            <div className="text-xs text-gray-500 cursor-pointer">
              На главную
            </div>
          </Link>

        </div>

        {/* CONTENT */}
        <div>
          {children}
        </div>

      </div>
    </div>
  )
}