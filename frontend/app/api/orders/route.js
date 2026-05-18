import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      username,
      role,
    } = body;

    let rows;

    // admin 看全部
    if (role === "admin") {

      const [allOrders] = await pool.query(
        `
        SELECT *
        FROM orders
        ORDER BY id DESC
        `
      );

      rows = allOrders;

    }

    // player 只看自己的
    else {

      const [myOrders] = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE username = ?
        ORDER BY id DESC
        `,
        [username]
      );

      rows = myOrders;

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