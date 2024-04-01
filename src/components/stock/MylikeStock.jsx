import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import Character from "../../assets/stock/character.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import "../../styles/stock.css";
import { getLikePortfolio } from "../../lib/apis/portfolio";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function MyLikeStock() {
  const [likestock, setLikeStock] = useState([]);
  const user = useSelector((state) => state.user.user) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const resp = await getLikePortfolio(user.user_id);
      setLikeStock(resp);
    };

    setData();
  }, []);
  return (
    <div
      style={{
        top: "190px",
        right: "100px",
        width: "86%",
        height: "77%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          padding: "2% 5%",
        }}
      >
        <div>
          <div style={{ fontSize: "18px", color: "#F9C93E" }}>
          LV.{user.level} {user.level_name}
          </div>
          <div class="mediumText">{user.nickname}님</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={Character}
            style={{ width: "250px", height: "300px", padding: "5% 0" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: "1000px",
          padding: "2% 0%",
        }}
      >
        <div>
          <div class="mediumText" style={{ display: "flex" }}>
            <img src={Chart} style={{ height: "40px", width: "40px" }} />내 관심
            종목
          </div>
        </div>

        <div style={{ height: "45%", overflow: "auto" }}>
          {likestock.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "36px",
              }}
            >
              {user.nickname} 님은 현재
              <br />
              등록한 관심 주식이 없습니다.
            </div>
          ) : (
            likestock.map((stock, id) => {
              return (
                <div key={id} className="likestock">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => {
                      navigate(`/stock/detail/${stock.stock_code}`);
                    }}
                  >
                    <img src={Folder} />
                    {stock.stock_name}
                  </div>
                  <img
                    src={Arrow}
                    style={{
                      width: "8%",
                      height: "4%",
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
