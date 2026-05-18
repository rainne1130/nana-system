import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      username,
      role
    } = body;

    let rows;

    // admin 看全部
    if (role === "admin") {

      [rows] = await pool.query(
        `
        SELECT *
        FROM orders
        ORDER BY id DESC
        `
      );

    } else {

      // player 只能看自己的
      [rows] = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE username = ?
        ORDER BY id DESC
        `,
        [username]
      );

    }

    return NextResponse.json({
      success: true,
      orders: rows,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "取得工單失敗",
    });

  }

}