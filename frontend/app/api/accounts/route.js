import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {

  try {

    const [users] = await db.execute(`
      SELECT
        id,
        username,
        password,
        role,
        nickname
      FROM users
      ORDER BY id ASC
    `);

    return NextResponse.json({
      success: true,
      users,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "讀取帳號失敗",
    });

  }

}