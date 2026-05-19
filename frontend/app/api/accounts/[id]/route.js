import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(req, { params }) {

  try {

    const { id } = params;

    const body = await req.json();

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

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "更新失敗",
    });

  }

}