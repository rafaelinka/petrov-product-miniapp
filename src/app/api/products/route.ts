import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import * as XLSX from "xlsx"

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "storage",
      "products.xlsx"
    )

    const fileBuffer = fs.readFileSync(filePath)

    const workbook = XLSX.read(fileBuffer, {
      type: "buffer",
    })

    const sheetName = workbook.SheetNames[0]

    const sheet = workbook.Sheets[sheetName]

    const data = XLSX.utils.sheet_to_json(sheet)

    return NextResponse.json(data)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to load products",
        details: String(error),
      },
      { status: 500 }
    )
  }
}