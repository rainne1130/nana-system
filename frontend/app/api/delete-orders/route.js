import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      orderIds
    } = body;

    if (!orderIds || orderIds.length === 0) {

      return NextResponse.json({
        success: false,
        message: "沒有選擇工單",
      });

    }

    await pool.query(
      `
      DELETE FROM orders
      WHERE id IN (?)
      `,
      [orderIds]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "刪除失敗",
    });

  }

}