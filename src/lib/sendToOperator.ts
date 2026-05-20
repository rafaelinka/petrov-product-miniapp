let lastRequestTime = 0

export async function sendToOperator(text: string) {
  const token = process.env.MAX_TOKEN
  const chatId = process.env.MAX_CHAT_ID

  if (!token) throw new Error("MAX_TOKEN is not defined in env")
  if (!chatId) throw new Error("MAX_CHAT_ID is not defined in env")

  // 🧠 анти-спам (минимум 2 секунды между запросами)
  const now = Date.now()
  if (now - lastRequestTime < 2000) {
    console.log("[MAX] request blocked (rate limit client-side)")
    return { ok: false, reason: "client-rate-limit" }
  }
  lastRequestTime = now

  const url = `https://platform-api.max.ru/messages?chat_id=${chatId}`

  // 🔁 retry логика
  let attempts = 0
  let lastError: any = null

  while (attempts < 3) {
    attempts++

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      const raw = await res.text()

      let data: any
      try {
        data = JSON.parse(raw)
      } catch {
        data = raw
      }

      console.log(`[MAX attempt ${attempts}] status:`, res.status)
      console.log(`[MAX response]`, data)

      // ❗ если успешный ответ
      if (res.status >= 200 && res.status < 300) {
        return { ok: true, data }
      }

      // ❗ если rate limit — ждём и повторяем
      if (res.status === 429) {
        console.log("[MAX] rate limited, retrying...")
        await new Promise((r) => setTimeout(r, 1000))
        continue
      }

      lastError = data
    } catch (err) {
      lastError = err
    }
  }

  return {
    ok: false,
    error: lastError,
  }
}