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

    // 查詢帳號
    const [rows] = await pool.query(
      `
      SELECT * FROM users
      WHERE username = ? AND password = ?
      `,
      [username, password]
    );

    // 帳密錯誤
    if (rows.length === 0) {

      return NextResponse.json({
        success: false,
        message: "帳號或密碼錯誤",
      });

    }

    return NextResponse.json({
      success: true,
      user: rows[0],
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "伺服器錯誤",
    });

  }

}