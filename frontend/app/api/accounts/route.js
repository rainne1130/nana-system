import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nana123456",
  database: "accompany_system",
});

export async function GET() {

  try {

    const [users] = await db.execute(`
      SELECT
        id,
        username,
        password,
        role,
        nickname
      FROM users
      ORDER BY id ASC
    `);

    return NextResponse.json({
      success: true,
      users,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "讀取帳號失敗",
    });

  }

}