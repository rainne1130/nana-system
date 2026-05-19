export default function Sidebar({
  setPage,
  role,
  handleLogout
}) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="w-[260px] bg-white shadow-xl p-6 rounded-r-xl flex flex-col h-screen sticky top-0">

      {/* 上方 */}
      <div>

        <h1 className="text-2xl font-bold text-sky-500 mb-3">
          奈奈電競工作室
        </h1>

        {/* 目前登入帳號 */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 text-sm text-black mb-8">

          <div className="font-bold text-sky-500 mb-1">
            目前登入帳號
          </div>

          <div>
            {user?.username}
          </div>

        </div>

        <div className="flex flex-col gap-4">

          {/* 開設表單 */}
          <button
            onClick={() => setPage("form")}
            className="bg-sky-100 hover:bg-sky-200 duration-300 p-4 rounded-2xl text-left text-black"
          >
            📝 建立陪玩表單
          </button>

          {/* 工單明細 */}
          <button
            onClick={() => setPage("orders")}
            className="bg-sky-100 hover:bg-sky-200 duration-300 p-4 rounded-2xl text-left text-black"
          >
            📄 工單歷史紀錄
          </button>

          {/* 管理員後台 */}
          {role === "admin" && (

            <>
            
              <button
                onClick={() => setPage("admin")}
                className="bg-sky-100 hover:bg-sky-200 duration-300 p-4 rounded-2xl text-left text-black"
              >
                ⚙ 管理後台系統
              </button>

              <button
                onClick={() => setPage("accounts")}
                className="bg-sky-100 hover:bg-sky-200 duration-300 p-4 rounded-2xl text-left text-black"
              >
                👤 帳號管理系統
              </button>

            </>

          )}

        </div>

      </div>

      {/* 最下方登出 */}
      <div className="mt-auto pt-6">

        <button
          onClick={handleLogout}
          className="w-full bg-red-100 hover:bg-red-200 duration-300 p-4 rounded-2xl text-left text-red-500"
        >
          🚪 登出帳號
        </button>

      </div>

    </div>
  );
}