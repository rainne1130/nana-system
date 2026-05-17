import { useState } from "react";

export default function AdminPage({ orders }) {

  const [markMode, setMarkMode] = useState(false);

  const [localOrders, setLocalOrders] = useState(orders);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">

      <div className="flex justify-between items-center mb-8">

  <h2 className="text-3xl font-bold text-sky-500">
      管理員後台
    </h2>

    {!markMode ? (

      <button
        onClick={() => setMarkMode(true)}
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-xl font-bold"
      >
        標記模式
      </button>

    ) : (

      <button
        onClick={() => setMarkMode(false)}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-bold"
      >
        標記完成
      </button>

    )}

  </div>

      <div className="flex flex-col gap-4">

        {orders.length === 0 && (
          <div className="text-gray-500">
            目前尚無工單資料
          </div>
        )}

        {localOrders.map((order) => (

          <div
            key={order.id}
            className={`
              p-5 rounded-2xl border text-black relative
              ${
                order.isMarked
                  ? "bg-green-100 border-green-300"
                  : "bg-sky-50 border-sky-100"
              }
            `}
          >

            {markMode && (

              <div className="absolute top-4 left-4">

                <input
                  type="checkbox"
                  checked={order.isMarked}

                  onChange={async () => {

                    const newMarked = !order.isMarked;

                    setLocalOrders((prev) =>
                      prev.map((item) =>
                        item.id === order.id
                          ? {
                              ...item,
                              isMarked: newMarked,
                            }
                          : item
                      )
                    );

                    try {

                      await fetch("/api/update-mark", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          orderId: order.id,
                          isMarked: newMarked ? 1 : 0,
                        }),
                      });

                    } catch (error) {

                      console.error(error);

                    }

                  }}

                  className="w-5 h-5 accent-green-500"
                />

              </div>

            )}

            <div className="grid grid-cols-2 gap-4 pl-8">

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