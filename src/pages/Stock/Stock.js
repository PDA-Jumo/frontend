import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//assets
import Folder from "../../assets/stock/folder.png";
import Hat from "../../assets/backgrounds/hat.png";

//components
import SearchTab from "../../components/stock/SearchTab";

//css
import "../../styles/stock.css";

export const MyStockPageContext = React.createContext();

export default function StockPage() {
  const [mystockPage, setMyStockPage] = useState("1");
  const navigate = useNavigate();

  return (
    <MyStockPageContext.Provider value={{ mystockPage, setMyStockPage }}>
      <div
        style={{
          backgroundColor: "white",
          // background: linear-gradient(to bottom, #FFFFFF, #FFE27A);
          // background: "linear-gradient(to bottom, #FFFFFF 0%, #FFF2CC 100%)",
          border: "5px solid black",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // backgroundColor: "#1F409A",
            backgroundColor: "#71A3FF",
            height: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // borderBottom: "1px solid black",
            paddingInline: "32px",
            paddingBlock: "8px",
            boxSizing: "border-box",
            boxShadow: "0 3px 3px 0 rgba(0,0,0,0.3)",
          }}
        >
          <SearchTab />

          <img
            src={Hat}
            style={{ width: "180px", cursor: "pointer" }}
            onClick={() => (window.location.href = "/home")}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "420px",
              marginBlock: "8px",
              gap: "5%",
              left: 30,
            }}
          >
            <div class="korea" onClick={() => navigate("")}>
              <img src={Folder} style={{ width: "24px", marginRight: "4px" }} />
              국내 주식
            </div>
            <div class="korea" onClick={() => navigate("worldstock")}>
              <img src={Folder} style={{ width: "24px", marginRight: "4px" }} />
              해외 주식
            </div>
            <div
              class="korea"
              onClick={() => {
                setMyStockPage("1");
                navigate("myportfolio");
              }}
            >
              <img src={Folder} style={{ width: "24px", marginRight: "4px" }} />
              내 주식
            </div>
          </div>
        </div>

        <div
          style={{
            // border: "4px solid black",
            width: "100%",
            height: "92%",
            marginBlock: "8px",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </div>
        {/* <div
          style={{
            height: "40px",
            // backgroundColor: "#FFE8D2",
            width: "100%",
            // border: "4px solid black",
            boxShadow: "0 -3px 10px 0 rgba(0,0,0,0.3)",
          }}
        /> */}
      </div>
    </MyStockPageContext.Provider>
  );
}
