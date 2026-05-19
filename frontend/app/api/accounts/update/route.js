import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {

  try {

    // 取得前端資料
    const body = await request.json();

    const id = parseInt(body.id);

    const password = body.password ?? "";
    const role = body.role ?? "player";
    const nickname = body.nickname ?? null;

    console.log("更新帳號資料:", {
      id,
      password,
      role,
      nickname,
    });

    // 更新資料庫
    const [result] = await db.execute(`
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

    console.log("SQL 更新結果:", result);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error("更新帳號錯誤:", error);

    return NextResponse.json({
      success: false,
      message: "更新失敗",
      error: error.message,
    });

  }

}