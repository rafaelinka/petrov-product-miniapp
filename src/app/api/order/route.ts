import { sendToOperator } from "@/lib/sendToOperator"
import { CartItem } from "@/types/cart"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { items, comment } = body

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ ok: false, error: "Cart empty" }, { status: 400 })
    }

    const message = items
      .map(
        (item: CartItem, i: number) =>
          `${i + 1}. ${item.title} × ${item.qty}`
      )
      .join("\n")

    const fullMessage = `📦 НОВАЯ ЗАЯВКА\n\n${message}\n\n💬 Комментарий:\n${comment || "—"}`

    console.log("[ORDER MESSAGE]", fullMessage)

    await sendToOperator(fullMessage)

    // ❗ ВАЖНО: фронт ждёт ok=true
    return Response.json({
      ok: true,
    })
  } catch (error: any) {
    console.error("[ORDER ERROR]", error)

    return Response.json(
      {
        ok: false,
        error: error.message || "Internal error",
      },
      { status: 500 }
    )
  }
}