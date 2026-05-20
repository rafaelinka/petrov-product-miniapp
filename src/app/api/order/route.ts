import { NextResponse } from "next/server"

const MAX_CHAT_ID = "-74840680817271"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (
      !body.items ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "EMPTY_ORDER",
        },
        {
          status: 400,
        }
      )
    }

    // FORMAT ITEMS
    const itemsText = body.items
      .map(
        (
          item: {
            title: string
            qty: number
          },
          index: number
        ) =>
          `${index + 1}. ${item.title} × ${item.qty}`
      )
      .join("\n")

    // FINAL MESSAGE
    const message = `
📦 НОВАЯ ЗАЯВКА

${itemsText}

📊 Всего товаров: ${body.totalItems}

💬 Комментарий:
${body.comment || "—"}
    `

    console.log(message)

    // SEND TO MAX
    const maxResponse = await fetch(
      `https://platform-api.max.ru/messages?chat_id=${MAX_CHAT_ID}`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.MAX_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: message,
        }),
      }
    )

    const maxData = await maxResponse.json()

    console.log("MAX RESPONSE")
    console.log(maxData)

    if (!maxResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "MAX_SEND_FAILED",
          details: maxData,
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
      },
      {
        status: 500,
      }
    )
  }
}