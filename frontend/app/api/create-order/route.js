import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      date,
      nickname,
      bossId,
      game,
      orderType,
      price,
      quantity,
      totalPrice,
      totalTime,
      status,
    } = body;

    await pool.query(
      `
      INSERT INTO orders
      (
        date,
        nickname,
        bossId,
        game,
        orderType,
        price,
        quantity,
        totalPrice,
        totalTime,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        date,
        nickname,
        bossId,
        game,
        orderType,
        price,
        quantity,
        totalPrice,
        totalTime,
        status,
      ]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "新增工單失敗",
    });

  }

}