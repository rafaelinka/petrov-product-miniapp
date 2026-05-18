export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex justify-center">
      
      {/* MAX / MOBILE CONTAINER */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F7FA]">
        {children}
      </div>

    </div>
  )
}