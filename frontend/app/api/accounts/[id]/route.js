import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {

  try {

    const id = Number(params.id);

    const body = await request.json();

    const password = body.password ?? "";
    const role = body.role ?? "player";
    const nickname = body.nickname ?? null;

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
      message: "更新失敗",
      error: error.message,
    });

  }

}