"use client"

export default function ContactsPage() {
  const departments = [
    {
      title: "Продажи",
      description: "Оформление заказов и новые клиенты",
      people: [
        {
          name: "Анна",
          phone: "+49 151 12345678",
        },
        {
          name: "Игорь",
          phone: "+49 160 98765432",
        },
      ],
    },
    {
      title: "Логистика",
      description: "Доставка и сроки",
      people: [
        {
          name: "Сергей",
          phone: "+49 151 55555555",
        },
      ],
    },
    {
      title: "Поддержка",
      description: "Помощь по заказам",
      people: [
        {
          name: "Мария",
          phone: "+49 170 22222222",
        },
      ],
    },
    {
      title: "Бухгалтерия",
      description: "Документы и счета",
      people: [
        {
          name: "Елена",
          phone: "+49 160 33333333",
        },
      ],
    },
  ]

  return (
    <div className="p-4 max-w-[420px] mx-auto">
      <h1 className="text-xl font-bold text-[#0B1F3A]">
        Контакты
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Нажмите на номер, чтобы позвонить
      </p>

      <div className="mt-4 space-y-4">
        {departments.map((dep, idx) => (
          <div
            key={idx}
            className="border border-[#E2E8F0] rounded-2xl p-4"
          >
            <div className="font-semibold text-[#0B1F3A]">
              {dep.title}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {dep.description}
            </div>

            <div className="mt-3 space-y-2">
              {dep.people.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-[#F5F7FA] rounded-xl px-3 py-2"
                >
                  <div>
                    <div className="text-sm font-medium">
                      {p.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      {p.phone}
                    </div>
                  </div>

                  <a
                    href={`tel:${p.phone}`}
                    className="bg-[#0B1F3A] text-white text-xs px-3 py-2 rounded-lg"
                  >
                    Позвонить
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}