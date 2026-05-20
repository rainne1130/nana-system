"use client";

import { useState, useEffect } from "react";

import LoginPage from "../components/LoginPage";
import Sidebar from "../components/Sidebar";
import OrderForm from "../components/OrderForm";
import OrdersPage from "../components/OrdersPage";
import AdminPage from "../components/AdminPage";
import AccountManagement from "../components/AccountManagement";

export default function Home() {

  // 頁面切換
  const [page, setPage] = useState("form");

  // 是否登入
  const [isLogin, setIsLogin] = useState(false);

  // 使用者角色
  const [role, setRole] = useState("user");

  // 登入帳號
  const [loginAccount, setLoginAccount] = useState("");

  // 登入密碼
  const [loginPassword, setLoginPassword] = useState("");

  // 工單列表
  const [orders, setOrders] = useState([]);

  // 表單資料
  const [date, setDate] = useState("");
  const [nickname, setNickname] = useState("");
  const [bossId, setBossId] = useState("");
  const [game, setGame] = useState("");
  const [orderType, setOrderType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // 計時
  const [seconds, setSeconds] = useState(0);
  const [pausedSeconds, setPausedSeconds] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // 載入資料
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            role: user.role,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchOrders();

    const savedLogin = localStorage.getItem("isLogin");
    const savedRole = localStorage.getItem("role");

    if (savedLogin === "true") {
      setIsLogin(true);
    }

    if (savedRole) {
      setRole(savedRole);
    }

    // 恢復工單計時
    const savedStartTime =
      localStorage.getItem(
        "activeOrderStartTime"
      );

    if (savedStartTime) {

      setStartTimestamp(
        Number(savedStartTime)
      );

      setIsRunning(true);

    }

  }, []);

  // 計時
  useEffect(() => {

    let timer;

    if (isRunning && startTimestamp) {

      timer = setInterval(() => {

        const now = Date.now();

        const diff = Math.floor(
          (now - startTimestamp) / 1000
        );

        setSeconds(diff);

      }, 1000);

    }

    return () => clearInterval(timer);

  }, [isRunning, startTimestamp]);

  // 保存登入
  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  // 保存權限
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  // 時間格式化
  const formatTime = () => {

    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;

  };

  // 登入
  const handleLogin = async () => {

    try {

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginAccount,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!data.success) {

        alert(data.message);
        return;

      }

      // 保存登入資訊
      setRole(data.user.role);
      setIsLogin(true);

      localStorage.setItem("isLogin", "true");

      localStorage.setItem(
        "role",
        data.user.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // 重新讀取目前帳號工單
      const refreshRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.user.username,
          role: data.user.role,
        }),
      });

      const refreshData = await refreshRes.json();

      if (refreshData.success) {

        setOrders(refreshData.orders);

      }

    } catch (error) {

      console.error(error);

      alert("登入失敗");

    }

  };

  // 建立帳號
  const handleRegister = async () => {

    if (!loginAccount || !loginPassword) {
      alert("請輸入帳號密碼");
      return;
    }

    try {

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginAccount,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setLoginAccount("");
      setLoginPassword("");

      alert("建立帳號成功！");

    } catch (error) {

      console.error(error);

      alert("建立帳號失敗");

    }

  };

  // 登出
  const handleLogout = () => {

    setIsLogin(false);

    // 清除計時
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);

    localStorage.removeItem("isLogin");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

  };

  // 開始
  const handleStart = () => {

    // 防止重複開始
    if (isRunning) return;

    // 檢查欄位
    if (
      !date ||
      !nickname ||
      !bossId ||
      !game ||
      !orderType ||
      !price ||
      !quantity
    ) {

      alert("請先完整填寫表單！");
      return;

    }

    const now = Date.now();

    // 如果是 Resume
    const newStartTime =
      now - (pausedSeconds * 1000);

    setStartTimestamp(newStartTime);

    // 保存到 localStorage
    localStorage.setItem(
      "activeOrderStartTime",
      newStartTime
    );

    setIsRunning(true);
    setIsPaused(false);

  };

  // 暫停
  const handlePause = () => {

    // 沒開始不可暫停
    if (!isRunning) return;

    // 保存目前秒數
    setPausedSeconds(seconds);

    setIsRunning(false);
    setIsPaused(true);

  };

  // 結束
  const handleEnd = async () => {

    if (!isPaused) {
      alert("請先暫停工單後再結束！");
      return;
    }

    // 防止空工單
    if (seconds === 0) {
      alert("尚未開始工單！");
      return;
    }

    setIsRunning(false);
    setIsPaused(false);

    // 建立工單
    const user = JSON.parse(localStorage.getItem("user"));

    const newOrder = {
      username: user.username,

      date,
      nickname,
      bossId,
      game,
      orderType,
      price,
      quantity,
      totalPrice: Number(price) * Number(quantity),
      totalTime: formatTime(),
      status: "已完成",
    };

    try {

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      // 重新讀取工單
      const refreshRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          role: user.role,
        }),
      });

      const refreshData = await refreshRes.json();

      if (refreshData.success) {
        setOrders(refreshData.orders);
      }

      // 清空表單
      setDate("");
      setNickname("");
      setBossId("");
      setGame("");
      setOrderType("");
      setPrice("");
      setQuantity("");

      // 重置時間
      setSeconds(0);
      setStartTimestamp(null);
      setPausedSeconds(0);

      // 清除工單 session
      localStorage.removeItem(
        "activeOrderStartTime"
      );

      // 跳轉工單頁
      setPage("orders");

      alert("工單已完成！");

    } catch (error) {

      console.error(error);

      alert("新增工單失敗");

    }

  };

  return (
    <>

      {/* 未登入 */}
      {!isLogin ? (

        <LoginPage
          loginAccount={loginAccount}
          setLoginAccount={setLoginAccount}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />

      ) : (

        // 已登入
        <div className="flex h-screen bg-[#eaf6ff] overflow-hidden">

          {/* 左側選單 */}
          <Sidebar
            setPage={setPage}
            role={role}
            handleLogout={handleLogout}
          />

          {/* 右側內容 */}
          <div className="flex-1 p-10 overflow-y-auto">

            {/* 開設工單 */}
            {page === "form" && (
              <OrderForm

                date={date}
                setDate={setDate}

                nickname={nickname}
                setNickname={setNickname}

                bossId={bossId}
                setBossId={setBossId}

                game={game}
                setGame={setGame}

                orderType={orderType}
                setOrderType={setOrderType}

                price={price}
                setPrice={setPrice}

                quantity={quantity}
                setQuantity={setQuantity}

                formatTime={formatTime}

                handleStart={handleStart}
                handlePause={handlePause}
                handleEnd={handleEnd}

                isPaused={isPaused}
                isRunning={isRunning}
              />
            )}

            {/* 工單明細 */}
            {page === "orders" && (
              <OrdersPage orders={orders} />
            )}

            {/* 管理員後台 */}
            {page === "admin" && role === "admin" && (
              <AdminPage />
            )}

            {/* 帳號管理 */}
            {page === "accounts" && role === "admin" && (
              <AccountManagement />
            )}

          </div>

        </div>

      )}

    </>
  );

}