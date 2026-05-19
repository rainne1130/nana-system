"use client";

import { useEffect, useState } from "react";

export default function AccountManagement() {

  const [users, setUsers] = useState([]);

  // 載入帳號
  useEffect(() => {

    fetchUsers();

  }, []);

  // 讀取 users
  const fetchUsers = async () => {

    try {

      const res = await fetch("/api/accounts");

      const data = await res.json();

      console.log(data);

      if (data.success) {
        setUsers(data.users);
      }

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div>

      {/* 標題 */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold text-sky-500">
          帳號管理系統
        </h1>

        {/* 刪除模式 */}
        <button
          className="
            bg-red-100
            hover:bg-red-200
            duration-300
            px-5
            py-3
            rounded-2xl
            text-red-500
            font-bold
          "
        >
          刪除模式
        </button>

      </div>

      {/* 表格 */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* 標題列 */}
        <div className="grid grid-cols-5 bg-sky-100 p-4 font-bold text-black">

          <div>Username</div>
          <div>Password</div>
          <div>權限</div>
          <div>自訂義暱稱</div>
          <div>編輯模式</div>

        </div>

        {/* users */}
        {users.map((user) => (

          <div
            key={user.id}
            className="
              grid
              grid-cols-5
              items-center
              p-4
              border-t
              border-sky-100
            "
          >

            {/* username */}
            <div className="text-black">
              {user.username}
            </div>

            {/* password */}
            <div className="text-black">
              {user.password}
            </div>

            {/* role */}
            <div className="text-black">

              {user.role === "admin"
                ? "管理員"
                : "陪玩師"
              }

            </div>

            {/* nickname */}
            <div className="text-black">
              {user.nickname || "-"}
            </div>

            {/* button */}
            <div>

              <button
                className="
                  bg-sky-100
                  hover:bg-sky-200
                  duration-300
                  px-4
                  py-2
                  rounded-xl
                  text-black
                "
              >
                編輯模式
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}