import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      role
    } = body;

    // 只有 admin 可查看
    if (role !== "admin") {

      return NextResponse.json({
        success: false,
        message: "無權限",
      });

    }

    const [rows] = await pool.query(`
      SELECT
        orders.*,
        users.nickname AS userNickname
      FROM orders
      LEFT JOIN users
      ON orders.username = users.username
      ORDER BY orders.id DESC
    `);

    return NextResponse.json({
      success: true,
      orders: rows,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "取得管理工單失敗",
    });

  }

}