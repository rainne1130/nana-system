export default function LoginPage({
  loginAccount,
  setLoginAccount,
  loginPassword,
  setLoginPassword,
  handleLogin,
  handleRegister
}) {

  return (
    <div className="min-h-screen bg-[#eaf6ff] flex items-center justify-center">

      <div className="bg-white w-[420px] p-10 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-sky-500 mb-8">
          奈奈電競工作室
        </h1>

        {/* 帳號 */}
        <div className="mb-5">

          <label className="block mb-2 text-gray-700">
            帳號
          </label>

          <input
            type="text"
            value={loginAccount}
            onChange={(e) => setLoginAccount(e.target.value)}
            className="w-full p-3 rounded-2xl border border-sky-200 outline-none text-black"
          />

        </div>

        {/* 密碼 */}
        <div className="mb-8">

          <label className="block mb-2 text-gray-700">
            密碼
          </label>

          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full p-3 rounded-2xl border border-sky-200 outline-none text-black"
          />

        </div>

        {/* 登入 */}
        <button
          onClick={handleLogin}
          className="w-full bg-sky-400 hover:bg-sky-500 duration-300 text-white py-3 rounded-2xl font-bold"
        >
          登入
        </button>

        {/* 建立帳號 */}
        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-green-400 hover:bg-green-500 duration-300 text-white py-3 rounded-2xl font-bold"
        >
          建立帳號
        </button>
      </div>
    </div>
  );
}