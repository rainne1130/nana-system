"use client";

export default function AccountManagement() {

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

      </div>

    </div>

  );

}