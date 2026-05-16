export default function AdminPage({ orders }) {

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">

      <h2 className="text-3xl font-bold text-sky-500 mb-8">
        管理員後台
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

            <div className="grid grid-cols-2 gap-4">

              <div>
                <span className="font-bold">日期：</span>
                {order.date}
              </div>

              <div>
                <span className="font-bold">陪陪：</span>
                {order.nickname}
              </div>

              <div>
                <span className="font-bold">老闆ID+UID：</span>
                {order.bossId}
              </div>

              <div>
                <span className="font-bold">遊戲：</span>
                {order.game}
              </div>

              <div>
                <span className="font-bold">單別：</span>
                {order.orderType}
              </div>

              <div>
                <span className="font-bold">單價：</span>
                {order.price}
              </div>

              <div>
                <span className="font-bold">數量：</span>
                {order.quantity}
              </div>

              <div>
                <span className="font-bold">總金額：</span>
                {order.totalPrice}
              </div>

              <div>
                <span className="font-bold">總時長：</span>
                {order.totalTime}
              </div>

              <div>
                <span className="font-bold">狀態：</span>
                {order.status}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}