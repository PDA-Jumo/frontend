import React, { useContext, useEffect, useState } from "react";
import "../../styles/globalStyle.css";
import Character from "../../assets/stock/character.png";
import Coin from "../../assets/stock/coin.png";
import { MyStockPageContext } from "../../pages/Stock/Stock";
import "../../styles/myStock.css";
import { useSelector } from "react-redux";
import { getKoreaPortfolio } from "../../lib/apis/portfolio";

export default function MyStock() {
  const { setMyStockPage } = useContext(MyStockPageContext);
  const user = useSelector((state) => state.user.user) || {};
  const [assets, setAssets] = useState("0");
  useEffect(() => {
    const setData = async () => {
      const resp = await getKoreaPortfolio(user.user_id);
      setAssets(resp.assets);
    };

    setData();
  }, []);
  console.log(user);
  return (
    <div
      style={{
        width: "100%",
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "center",
          padding: "4% 5%",
        }}
      >
        <img
          src={user.profile_img}
          style={{
            borderRadius: "100px",
            border: "1px solid black",
            marginRight: "32px",
            height: "200px",
            width: "200px",
            boxSizing: "border-box",
            padding: "8px 8px",
            objectFit: "contain",
          }}
        />
        <div>
          <div class="smallText" style={{ color: "#F9C93E" }}>
            Lv{user.level}. {user.level_name}
          </div>
          <div class="xxxLargeText">{user.nickname}님</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div class="largeText" style={{ display: "flex" }}>
              <img src={Coin} style={{ height: "56px", width: "56px" }} />총
              보유자산
            </div>
            <div class="largeText">{assets + user.cash}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8%",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingTop: "2%",
        }}
      >
        <div class="tab" onClick={() => setMyStockPage("2")}>
          국내주식
        </div>
        <div class="tab" onClick={() => setMyStockPage("3")}>
          해외주식
        </div>
        <div class="tab" onClick={() => setMyStockPage("4")}>
          관심종목
        </div>
      </div>
    </div>
  );
}
