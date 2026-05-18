export default function OrderForm({

  date,
  setDate,

  nickname,
  setNickname,

  bossId,
  setBossId,

  game,
  setGame,

  orderType,
  setOrderType,

  price,
  setPrice,

  quantity,
  setQuantity,

  formatTime,

  handleStart,
  handlePause,
  handleEnd,

  isPaused,
  isRunning

}) {

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">

      <h2 className="text-3xl font-bold text-sky-500 mb-8 text-center">
        奈奈電競工作室表單
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* 日期 */}
        <input
          disabled={isRunning}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="日期"
          className={`w-full p-3 rounded-2xl border border-sky-200 text-black ${
            isRunning ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* 陪陪暱稱 */}
        <input
          disabled={isRunning}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="陪陪暱稱"
          className={`w-full p-3 rounded-2xl border border-sky-200 text-black ${
            isRunning ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* 老闆暱稱 */}
        <input
          disabled={isRunning}
          value={bossId}
          onChange={(e) => setBossId(e.target.value)}
          placeholder="老闆暱稱"
          className={`w-full p-3 rounded-2xl border border-sky-200 text-black ${
            isRunning ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* 接單遊戲 */}
        <input
          disabled={isRunning}
          value={game}
          onChange={(e) => setGame(e.target.value)}
          placeholder="接單遊戲"
          className={`w-full p-3 rounded-2xl border border-sky-200 text-black ${
            isRunning ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* 遊戲單別 */}
        <input
          disabled={isRunning}
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          placeholder="遊戲單別"
          className={`w-full p-3 rounded-2xl border border-sky-200 text-black ${
            isRunning ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* 單價 */}
        <input
          disabled={isRunning}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="遊戲單價"
          type="number"
          className={`w-full p-3 rounded-2xl border border-sky-200 text-black ${
            isRunning ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* 數量 */}
        <input
          disabled={isRunning}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="接單數量"
          type="number"
          className={`w-full p-3 rounded-2xl border border-sky-200 text-black ${
            isRunning ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {/* 時間 */}
        <div className="w-full p-3 rounded-2xl border border-sky-200 bg-sky-50 text-black text-xl font-bold flex items-center justify-center">
          {formatTime()}
        </div>

      </div>

      {/* 狀態提示 */}
      <div className="mt-6">

        {isRunning && (
          <div className="bg-red-50 border border-red-200 text-red-500 px-4 py-3 rounded-2xl font-bold text-center">
            工單進行中，表單已鎖定
          </div>
        )}

        {isPaused && (
          <div className="bg-yellow-50 border border-yellow-200 text-black px-4 py-3 rounded-2xl font-bold text-center">
            工單已暫停，可修改表單內容後再結束
          </div>
        )}

      </div>

      {/* 按鈕 */}
      <div className="flex gap-5 mt-10 justify-center">

        {/* 開始 */}
        <button
          onClick={handleStart}
          className="bg-green-400 hover:bg-green-500 text-white px-8 py-3 rounded-2xl font-bold"
        >
          {isPaused ? "繼續計時" : "開始計時"}
        </button>

        {/* 暫停 */}
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className={`px-8 py-3 rounded-2xl font-bold text-white ${
            !isRunning
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          暫停計時
        </button>

        {/* 結束 */}
        <button
          onClick={handleEnd}
          className="bg-red-400 hover:bg-red-500 text-white px-8 py-3 rounded-2xl font-bold"
        >
          結束計時並上傳
        </button>

      </div>

    </div>
  );
}