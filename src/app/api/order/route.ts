import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("NEW ORDER")
    console.log(JSON.stringify(body, null, 2))

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

    return NextResponse.json({
      success: true,
      message: "ORDER_RECEIVED",
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