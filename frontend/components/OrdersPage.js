export default function OrdersPage({ orders }) {

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">

      <h2 className="text-3xl font-bold text-sky-500 mb-8">
        工單明細
      </h2>

      <div className="flex flex-col gap-4">

        {orders.length === 0 && (
          <div className="text-gray-500">
            目前尚無工單資料
          </div>
        )}

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-sky-50 p-5 rounded-2xl border border-sky-100 text-black"
          >

            <div className="text-green-600 font-bold mb-2">
              建立者帳號：{order.username}
            </div>

            <div>日期：{order.date}</div>

            <div>陪陪：{order.nickname}</div>

            <div>老闆暱稱：{order.bossId}</div>

            <div>遊戲：{order.game}</div>

            <div>單別：{order.orderType}</div>

            <div>單價：{order.price}</div>

            <div>數量：{order.quantity}</div>

            <div>總金額：{order.totalPrice}</div>

            <div>總時長：{order.totalTime}</div>

          </div>

        ))}

      </div>

    </div>
  );
}