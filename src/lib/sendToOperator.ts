export async function sendToOperator(text: string) {
  const token = process.env.MAX_BOT_TOKEN
  const chatId = process.env.MAX_OPERATOR_CHAT_ID

  const url = `https://platform-api.max.ru/messages?chat_id=${chatId}`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: token, // ❗ без Bearer
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  })

  const raw = await res.text()

  console.log("[MAX STATUS]", res.status)
  console.log("[MAX RESPONSE]", raw)

  // ❗ MAX может вернуть 200 даже с полезной ошибкой внутри
  let data: any = null

  try {
    data = JSON.parse(raw)
  } catch {
    data = null
  }

  // ❗ считаем ошибкой только реальный HTTP fail
  if (res.status >= 400) {
    throw new Error(`MAX error ${res.status}: ${raw}`)
  }

  return {
    ok: true,
    data,
  }
}