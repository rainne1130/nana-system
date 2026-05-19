import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {

  try {

    // 取得帳號 id
    const id = parseInt(params.id);

    // 取得前端資料
    const body = await request.json();

    // 防止 undefined
    const password = body.password ?? "";
    const role = body.role ?? "player";
    const nickname = body.nickname ?? null;

    // debug
    console.log("更新帳號 ID:", id);

    console.log({
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

    // debug
    console.log("SQL 更新結果:", result);

    return NextResponse.json({
      success: true,
      result,
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