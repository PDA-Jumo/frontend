import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import Character from "../../assets/stock/character.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import "../../styles/stock.css";
import { getLikePortfolio } from "../../lib/apis/portfolio";
import { useSelector } from "react-redux";

export default function MyLikeStock() {
  const [likestock, setLikeStock] = useState([]);
  const user = useSelector((state) => state.user.user) || {};

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
          <div style={{ fontSize: "18px", color: "#F9C93E" }}>주대주주</div>
          <div class="mediumText">김광태가뭐야</div>
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

        <div style={{ height: "35%", overflow: "auto" }}>
          {likestock.map((stock, id) => {
            return (
              <div key={id} className="likestock">
                <div>
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
          })}
        </div>
      </div>
    </div>
  );
}
