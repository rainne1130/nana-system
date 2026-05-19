import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      username
    } = body;

    // 所有人都只能看自己的工單
    const [rows] = await pool.query(`
      SELECT
        orders.*,
        users.nickname AS userNickname
      FROM orders
      LEFT JOIN users
      ON orders.username = users.username
      WHERE orders.username = ?
      ORDER BY orders.id DESC
    `, [
      username
    ]);

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