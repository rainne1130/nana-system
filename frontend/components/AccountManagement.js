"use client";

import { useEffect, useState } from "react";

export default function AccountManagement() {

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteUsers, setDeleteUsers] = useState([]);

  // 載入帳號
  useEffect(() => {

    fetchUsers();

  }, []);

  // 讀取 users
  const fetchUsers = async () => {

    try {

      const res = await fetch("/api/accounts");

      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      }

    } catch (error) {

      console.error(error);

    }

  };

  // 更新帳號
  const handleUpdate = async (userId) => {

    try {

      // 從最新 state 取得資料
      const targetUser = users.find(
        (u) => u.id === userId
      );

      console.log(targetUser);

      const res = await fetch("/api/accounts/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        id: targetUser.id,
        password: targetUser.password,
        role: targetUser.role,
        nickname: targetUser.nickname,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (!data.success) {
        alert("更新失敗");
        return;
      }

      alert("更新成功");
      setEditingId(null);
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
        {!deleteMode ? (

          <button

            onClick={() => setDeleteMode(true)}

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

        ) : (

          <button

            onClick={async () => {

              // 沒選帳號
              if (deleteUsers.length === 0) {

                alert("請先選擇帳號！");
                return;

              }

              // 二次確認
              const confirmDelete = confirm(
                "確定要刪除選中的帳號嗎？"
              );

              if (!confirmDelete) return;

              try {

                const res = await fetch("/api/accounts/delete", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userIds: deleteUsers,
                  }),
                });

                const data = await res.json();

                if (!data.success) {

                  alert(data.message);
                  return;

                }

                // 前端同步刪除
                setUsers((prev) =>
                  prev.filter(
                    (user) => !deleteUsers.includes(user.id)
                  )
                );

                // 清空選擇
                setDeleteUsers([]);

                // 關閉刪除模式
                setDeleteMode(false);

                alert("刪除成功！");

              } catch (error) {

                console.error(error);

                alert("刪除失敗");

              }

            }}

            className="
              bg-red-500
              hover:bg-red-600
              duration-300
              px-5
              py-3
              rounded-2xl
              text-white
              font-bold
            "
          >
            刪除完成
          </button>

        )}

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
            <div className="flex items-center gap-3 text-black">

              {/* 刪除 checkbox */}
              {deleteMode && (

                <input
                  type="checkbox"

                  checked={deleteUsers.includes(user.id)}

                  onChange={() => {

                    if (deleteUsers.includes(user.id)) {

                      setDeleteUsers((prev) =>
                        prev.filter((id) => id !== user.id)
                      );

                    } else {

                      setDeleteUsers((prev) => [
                        ...prev,
                        user.id,
                      ]);

                    }

                  }}

                  className="w-5 h-5 accent-red-500"
                />

              )}

              <div>
                {user.username}
              </div>

            </div>

            {/* password */}
            <div>

              <input
                disabled={editingId !== user.id}
                value={user.password ?? ""}
                onChange={(e) => {

                  setUsers((prev) =>
                    prev.map((u) =>
                      u.id === user.id
                        ? {
                            ...u,
                            password: e.target.value,
                          }
                        : u
                    )
                  );

                }}
                className="
                  w-[150px]
                  bg-sky-50
                  rounded-xl
                  p-2
                  text-black
                  outline-none
                "
              />

            </div>

            {/* role */}
            <div>

              <select
                disabled={editingId !== user.id}
                value={user.role ?? "player"}
                onChange={(e) => {

                  setUsers((prev) =>
                    prev.map((u) =>
                      u.id === user.id
                        ? {
                            ...u,
                            role: e.target.value,
                          }
                        : u
                    )
                  );

                }}
                className="
                  w-[140px]
                  bg-sky-50
                  rounded-xl
                  p-2
                  text-black
                  outline-none
                "
              >

                <option value="admin">
                  管理員
                </option>

                <option value="player">
                  陪玩師
                </option>

              </select>

            </div>

            {/* nickname */}
            <div>

              <input
                disabled={editingId !== user.id}
                value={user.nickname ?? ""}
                onChange={(e) => {

                  setUsers((prev) =>
                    prev.map((u) =>
                      u.id === user.id
                        ? {
                            ...u,
                            nickname: e.target.value,
                          }
                        : u
                    )
                  );

                }}
                className="
                  w-[150px]
                  bg-sky-50
                  rounded-xl
                  p-2
                  text-black
                  outline-none
                "
              />

            </div>

            {/* button */}
            <div>

              <button

                onClick={() => {

                  if (editingId === user.id) {

                    handleUpdate(user.id);

                  } else {

                    setEditingId(user.id);

                  }

                }}

                className={`
                duration-300
                px-3
                py-1.5
                rounded-xl
                text-sm
                font-bold

                ${
                  editingId === user.id
                    ? `
                      bg-red-400
                      hover:bg-red-500
                      text-white
                    `
                    : `
                      bg-sky-100
                      hover:bg-sky-200
                      text-black
                    `
                }
              `}
              >

                {editingId === user.id
                  ? "編輯完成"
                  : "編輯模式"
                }

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}