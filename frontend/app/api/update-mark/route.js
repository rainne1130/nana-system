import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      orderId,
      isMarked,
    } = body;

    await pool.query(
      `
      UPDATE orders
      SET isMarked = ?
      WHERE id = ?
      `,
      [isMarked, orderId]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "伺服器錯誤",
    });

  }

}