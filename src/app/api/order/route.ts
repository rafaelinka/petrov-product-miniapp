import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const chatId = process.env.MAX_CHAT_ID!

    const message =
      `📦 НОВАЯ ЗАЯВКА\n\n` +
      body.items
        .map((i: any, idx: number) => `${idx + 1}. ${i.title} × ${i.qty}`)
        .join("\n") +
      `\n\n📊 Всего: ${body.totalItems}\n\n💬 Комментарий:\n${body.comment || "—"}`

    console.log("[ORDER MESSAGE]", message)

    await sendToOperator(chatId, message)

    return Response.json({ success: true })
  } catch (e: any) {
    console.error("[ORDER ERROR]", e)

    return Response.json(
      { success: false, error: e.message },
      { status: 500 }
    )
  }
}