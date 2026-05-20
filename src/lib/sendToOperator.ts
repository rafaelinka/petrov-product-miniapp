export async function sendToOperator(chatId: string, text: string) {
  const token = process.env.MAX_TOKEN

  if (!token) {
    throw new Error("MAX_TOKEN is not defined in env")
  }

  const url = `https://platform-api.max.ru/messages?chat_id=${chatId}`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      // ⚠️ MAX требует именно raw token (без Bearer)
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })

  const rawText = await res.text()

  let data: any
  try {
    data = JSON.parse(rawText)
  } catch {
    data = rawText
  }

  console.log("[MAX RESPONSE]", data)

  // ❗ MAX часто возвращает 200 даже при ошибке внутри body
  if (data?.code) {
    console.log("[MAX API ERROR]", data)
    throw new Error(`MAX API error: ${JSON.stringify(data)}`)
  }

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}: ${rawText}`)
  }

  return data
}