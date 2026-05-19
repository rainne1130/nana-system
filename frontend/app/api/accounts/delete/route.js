import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {

  try {

    const body = await request.json();

    const {
      userIds
    } = body;

    // 防呆
    if (!userIds || userIds.length === 0) {

      return NextResponse.json({
        success: false,
        message: "沒有選擇帳號",
      });

    }

    // 刪除 users
    await db.query(`
      DELETE FROM users
      WHERE id IN (?)
    `, [
      userIds
    ]);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "刪除帳號失敗",
    });

  }

}