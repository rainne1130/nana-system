import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      username,
      password,
    } = body;

    // 防呆
    if (!username || !password) {

      return NextResponse.json({
        success: false,
        message: "請輸入帳號密碼",
      });

    }

    // 檢查帳號是否存在
    const [exists] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (exists.length > 0) {

      return NextResponse.json({
        success: false,
        message: "帳號已存在",
      });

    }

    // 建立帳號
    await pool.query(
      `
      INSERT INTO users (username, password, role)
      VALUES (?, ?, ?)
      `,
      [username, password, "player"]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "建立帳號失敗",
    });

  }

}