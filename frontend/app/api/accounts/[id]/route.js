import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, context) {

  try {

    const id = context.params.id;

    const body = await request.json();

    const {
      password,
      role,
      nickname,
    } = body;

    await db.execute(`
      UPDATE users
      SET
        password = ?,
        role = ?,
        nickname = ?
      WHERE id = ?
    `, [
      password,
      role,
      nickname,
      id,
    ]);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error("更新帳號錯誤:", error);

    return NextResponse.json({
      success: false,
      message: "更新失敗，請聯繫管理員處理",
      error: error.message,
    });

  }

}