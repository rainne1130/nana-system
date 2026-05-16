export default function Sidebar({
  setPage,
  role,
  handleLogout
}) {

  return (
    <div className="w-[260px] bg-white shadow-xl p-6 rounded-r-3xl">

      <h1 className="text-2xl font-bold text-sky-500 mb-10">
        奈奈電競工作室
      </h1>

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

          <button
            onClick={() => setPage("admin")}
            className="bg-sky-100 hover:bg-sky-200 duration-300 p-4 rounded-2xl text-left text-black"
          >
            ⚙ 管理後台系統
          </button>

        )}

        {/* 登出 */}
        <button
          onClick={handleLogout}
          className="bg-red-100 hover:bg-red-200 duration-300 p-4 rounded-2xl text-left text-red-500"
        >
          🚪 登出帳號
        </button>

      </div>

    </div>
  );
}