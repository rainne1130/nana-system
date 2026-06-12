import { useEffect, useState } from "react";

export default function AdminPage() {

  const [markMode, setMarkMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteOrders, setDeleteOrders] = useState([]);
  const [localOrders, setLocalOrders] = useState([]);
  const [searchAccount, setSearchAccount] = useState("");

  // 讀取全部工單
  useEffect(() => {

    const fetchAdminOrders = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const res = await fetch("/api/admin-orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: user.role,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setLocalOrders(data.orders);
        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchAdminOrders();

  }, []);

  return (
    <div className="bg-white rounded-xl shadow-xl p-10">

      <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold text-sky-500">
        管理員後台
      </h2>

      <div className="flex gap-3">

        {/* 帳號查詢 */}
        <input
          type="text"
          value={searchAccount}
          onChange={(e) =>
            setSearchAccount(e.target.value)
          }
          placeholder="輸入帳號查詢"
          className="px-4 py-2 border rounded-xl w-52 text-black"
        />

        {/* 標記模式 */}
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

        {/* 刪除模式 */}
          {!deleteMode ? (

            <button
              onClick={() => setDeleteMode(true)}
              className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-xl font-bold"
            >
              刪除模式
            </button>

          ) : (

            <button

              onClick={async () => {

                // 沒選工單
                if (deleteOrders.length === 0) {

                  alert("請先選擇工單！");
                  return;

                }

                // 二次確認
                const confirmDelete = confirm(
                  "確定要刪除選中的工單嗎？"
                );

                if (!confirmDelete) return;

                try {

                  const res = await fetch("/api/delete-orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      orderIds: deleteOrders,
                    }),
                  });

                  const data = await res.json();

                  if (!data.success) {

                    alert(data.message);
                    return;

                  }

                  // 前端同步刪除
                  setLocalOrders((prev) =>
                    prev.filter(
                      (item) => !deleteOrders.includes(item.id)
                    )
                  );

                  // 清空選擇
                  setDeleteOrders([]);

                  // 關閉刪除模式
                  setDeleteMode(false);

                  alert("刪除成功！");

                } catch (error) {

                  console.error(error);

                  alert("刪除失敗");

                }

              }}

              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-bold"
            >
              刪除完成
            </button>

          )}

      </div>

    </div>

      <div className="flex flex-col gap-4">

        {localOrders.length === 0 && (
          <div className="text-gray-500">
            目前尚無工單資料
          </div>
        )}

        {localOrders
          .filter((order) => {

            if (!searchAccount.trim()) {
              return true;
            }

            return order.username
              ?.toLowerCase()
              .includes(
                searchAccount.toLowerCase()
              );

          })
          .map((order) => (

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
              <div className="mb-4 flex items-center gap-3">

                {/* 標記 checkbox */}
                {markMode && (

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

                )}

                {/* 刪除 checkbox */}
                {deleteMode && (

                  <input
                    type="checkbox"

                    checked={deleteOrders.includes(order.id)}

                    onChange={() => {

                      if (deleteOrders.includes(order.id)) {

                        setDeleteOrders((prev) =>
                          prev.filter((id) => id !== order.id)
                        );

                      } else {

                        setDeleteOrders((prev) => [
                          ...prev,
                          order.id,
                        ]);

                      }

                    }}

                    className="w-5 h-5 accent-red-500"
                  />

                )}

                {/* 建立者 */}
                <div className="text-green-600 font-bold">
                  建立者帳號：
                  {order.username}

                  {order.userNickname
                    ? `（${order.userNickname}）`
                    : ""
                  }
                </div>

              </div>

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
                  <span className="font-bold">老闆暱稱：</span>
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