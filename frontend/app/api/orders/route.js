import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {

  try {

    const [rows] = await pool.query(
      `
      SELECT *
      FROM orders
      ORDER BY id DESC
      `
    );

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